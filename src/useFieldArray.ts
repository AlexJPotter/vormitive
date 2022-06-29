import type { Ref } from '@vue/reactivity';
import { clone, getIn, setIn } from './helpers/helpers';
import { TouchedOf } from './types/TouchedOf';
import { useField } from './useField';
import { useFormContext } from './useFormContext';

export const useFieldArray = <TEachValue>(fieldName: Ref<string>) => {
  const { setFieldValue, touched, setTouched } = useFormContext<unknown>();
  const { value: elements } = useField<Array<TEachValue>>(fieldName);

  const push = (newElement: TEachValue) => {
    const newValues = clone(elements.value);
    newValues.push(newElement);
    setFieldValue(fieldName.value, newValues);
  };

  const remove = (index: number) => {
    let newValues = clone(elements.value);
    newValues = newValues.filter((_, elementIndex) => elementIndex !== index);
    setFieldValue(fieldName.value, newValues);

    const fieldArrayTouchedState = getIn(touched.value, fieldName.value) as
      | Record<string, TouchedOf<TEachValue>>
      | null
      | undefined;

    const newFieldArrayTouchedState = clone(fieldArrayTouchedState);

    if (newFieldArrayTouchedState != null) {
      // Remove the touched state for the element we're removing
      delete newFieldArrayTouchedState[index.toString()];

      // Shunt down the indices of the elements that have moved down one due to the element being removed
      for (const indexToMoveDown of Object.keys(newFieldArrayTouchedState)
        .map((k) => Number(k))
        .filter((i) => i > index)) {
        newFieldArrayTouchedState[indexToMoveDown - 1] = newFieldArrayTouchedState[indexToMoveDown];
        delete newFieldArrayTouchedState[indexToMoveDown];
      }

      const newTouched = setIn(touched.value, fieldName.value, newFieldArrayTouchedState);
      setTouched(newTouched);
    }
  };

  const swap = (indexA: number, indexB: number) => {
    const elementsCopy = clone(elements.value);

    const elementA = elementsCopy[indexA];
    const elementB = elementsCopy[indexB];

    const newValues = elementsCopy.map((element, index) =>
      index === indexA ? elementB : index === indexB ? elementA : element
    );

    setFieldValue(fieldName.value, newValues);

    // We have to swap the touched state for each element otherwise they'll
    // inherit the touched state of the position they're moving to.
    const newFieldArrayTouched = getIn(touched.value, fieldName.value) as
      | Record<string, TouchedOf<TEachValue>>
      | null
      | undefined;

    if (newFieldArrayTouched != null) {
      const touchedA = newFieldArrayTouched[indexA.toString()];
      const touchedB = newFieldArrayTouched[indexB.toString()];

      const newTouchedA = touchedB == null ? null : clone(touchedB);

      if (newTouchedA == null) {
        delete newFieldArrayTouched[indexA.toString()];
      } else {
        newFieldArrayTouched[indexA.toString()] = newTouchedA;
      }

      const newTouchedB = touchedA == null ? null : clone(touchedA);

      if (newTouchedB == null) {
        delete newFieldArrayTouched[indexB.toString()];
      } else {
        newFieldArrayTouched[indexB.toString()] = newTouchedB;
      }

      const newTouched = setIn(touched.value, fieldName.value, newFieldArrayTouched);
      setTouched(newTouched);
    }
  };

  const moveRight = (index: number) => {
    if (index !== elements.value.length - 1) {
      swap(index, index + 1);
    } else {
      console.error(`Attempted to move element at index ${index} to the right, but it is the last element in the array`);
    }
  };

  const moveLeft = (index: number) => {
    if (index > 0) {
      swap(index, index - 1);
    } else {
      console.error(`Attempted to move element at index ${index} to the left, but it is the first element in the array`);
    }
  };

  return {
    values: elements,
    push,
    remove,
    swap,
    moveRight,
    moveLeft,
  };
};

import { computed, Ref } from 'vue';
import { useFormContext } from './useFormContext';
import { getIn } from './helpers/helpers';

export const useField = <TFieldValue>(fieldName: Ref<string>) => {
  const { values, errors, touched, setFieldValue, setFieldTouched } = useFormContext<unknown>();

  const value = computed(() => getIn(values.value, fieldName.value) as TFieldValue);

  const error = computed(() => getIn(errors.value, fieldName.value) as string | null | undefined);
  const isTouched = computed(() => getIn(touched.value, fieldName.value) as boolean);

  return {
    value,
    error,
    isTouched,
    setFieldValue,
    setFieldTouched,
  };
};

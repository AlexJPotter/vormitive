import { ref, provide, readonly, watch } from 'vue';
import type { Ref } from 'vue';
import { getEverythingTouchedOf } from './helpers/getEverythingTouchedOf';
import { setFieldTouchedIn } from './helpers/setFieldTouchedIn';
import { setFieldValueIn } from './helpers/setFieldValueIn';
import { getInjectionKeys } from './injectionKeys';
import type { SetFieldTouched } from './types/SetFieldTouched';
import type { SetFieldValue } from './types/SetFieldValue';
import type { SetValues } from './types/SetValues';
import type { TouchedOf } from './types/TouchedOf';
import type { ValidationResult } from './types/ValidationResult';

type Options<TFormModel> = {
  initialValues: TFormModel;
  validate: (formModel: TFormModel) => ValidationResult<TFormModel>;
};

export const useForm = <TFormModel>(options: Options<TFormModel>) => {
  const { initialValues, validate } = options;
  const injectionKeys = getInjectionKeys<TFormModel>();

  const values = ref(initialValues) as Ref<TFormModel>;
  provide(injectionKeys.values, readonly(values));

  const touched = ref({}) as Ref<TouchedOf<TFormModel>>;
  provide(injectionKeys.touched, readonly(touched));

  const errors = ref({}) as Ref<ValidationResult<TFormModel>>;
  provide(injectionKeys.errors, readonly(errors));

  const validateForm = () => {
    validate(values.value);
  };
  provide(injectionKeys.validate, validateForm);

  const isSubmitting = ref(false);
  provide(injectionKeys.isSubmitting, isSubmitting);

  const setSubmitting = (newIsSubmitting: boolean) => {
    isSubmitting.value = newIsSubmitting;
  };
  provide(injectionKeys.setSubmitting, setSubmitting);

  const hasSubmitted = ref(false);
  provide(injectionKeys.hasSubmitted, hasSubmitted);

  const setHasSubmitted = (newHasSubmitted: boolean) => {
    hasSubmitted.value = newHasSubmitted;
  };
  provide(injectionKeys.setHasSubmitted, setHasSubmitted);

  const setValues: SetValues<TFormModel> = (newValues: TFormModel) => {
    values.value = newValues;
  };
  provide(injectionKeys.setValues, setValues);

  const setFieldValue: SetFieldValue = (fieldName: string, value: unknown) => {
    values.value = setFieldValueIn(values.value, fieldName, value);
  };
  provide(injectionKeys.setFieldValue, setFieldValue);

  const setFieldTouched: SetFieldTouched = (
    fieldName: string,
    value: boolean
  ) => {
    touched.value = setFieldTouchedIn(touched.value, fieldName, value);
  };
  provide(injectionKeys.setFieldTouched, setFieldTouched);

  watch(
    [values, touched],
    ([newValues]) => {
      const newErrors = validate(newValues);
      errors.value = newErrors;
    },
    { immediate: true }
  );

  const handleSubmit = (handler: (values: TFormModel) => Promise<void>) => {
    setHasSubmitted(true);
    touched.value = getEverythingTouchedOf(values.value); // Mark all fields as touched

    const isValid =
      errors.value == null || Object.keys(errors.value).length === 0;

    if (isValid) {
      setSubmitting(true);
      handler(values.value).finally(() => setSubmitting(false));
    }
  };
  provide(injectionKeys.handleSubmit, handleSubmit);

  return {
    values,
    setValues,
    setFieldValue,
    touched,
    setFieldTouched,
    errors,
    isSubmitting,
    setSubmitting,
    hasSubmitted,
    setHasSubmitted,
    validate,
    handleSubmit,
  };
};

import type { InjectionKey } from 'vue';
import type { HandleSubmit } from './types/HandleSubmit';
import type { ReadonlyRef } from './types/ReadonlyRef';
import type { SetFieldTouched } from './types/SetFieldTouched';
import type { SetFieldValue } from './types/SetFieldValue';
import type { SetHasSubmitted } from './types/SetHasSubmitted';
import type { SetSubmitting } from './types/SetSubmitting';
import { SetTouched } from './types/SetTouched';
import type { SetValues } from './types/SetValues';
import type { TouchedOf } from './types/TouchedOf';
import type { ValidationResult } from './types/ValidationResult';

const injectionKeys = {
  values: Symbol('values'),
  setValues: Symbol('setValues'),
  setFieldValue: Symbol('setFieldValue'),
  touched: Symbol('touched'),
  setTouched: Symbol('setTouched'),
  setFieldTouched: Symbol('setFieldTouched'),
  errors: Symbol('errors'),
  isSubmitting: Symbol('isSubmitting'),
  setSubmitting: Symbol('setSubmitting'),
  hasSubmitted: Symbol('hasSubmitted'),
  setHasSubmitted: Symbol('setHasSubmitted'),
  validate: Symbol('validate'),
  handleSubmit: Symbol('handleSubmit'),
};

export const getInjectionKeys = <TFormModel>() => ({
  values: injectionKeys.values as InjectionKey<ReadonlyRef<TFormModel>>,
  setValues: injectionKeys.setValues as InjectionKey<SetValues<TFormModel>>,
  setFieldValue: injectionKeys.setFieldValue as InjectionKey<SetFieldValue>,
  touched: injectionKeys.touched as InjectionKey<
    ReadonlyRef<TouchedOf<TFormModel>>
  >,
  setTouched: injectionKeys.setTouched as InjectionKey<SetTouched<TFormModel>>,
  setFieldTouched: injectionKeys.setFieldTouched as InjectionKey<
    SetFieldTouched
  >,
  errors: injectionKeys.errors as InjectionKey<
    ReadonlyRef<ValidationResult<TFormModel>>
  >,
  isSubmitting: injectionKeys.isSubmitting as InjectionKey<
    ReadonlyRef<boolean>
  >,
  setSubmitting: injectionKeys.setSubmitting as InjectionKey<SetSubmitting>,
  hasSubmitted: injectionKeys.hasSubmitted as InjectionKey<
    ReadonlyRef<boolean>
  >,
  setHasSubmitted: injectionKeys.setHasSubmitted as InjectionKey<
    SetHasSubmitted
  >,
  validate: injectionKeys.validate as InjectionKey<() => void>,
  handleSubmit: injectionKeys.handleSubmit as InjectionKey<
    HandleSubmit<TFormModel>
  >,
});

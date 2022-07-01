import { InjectionKey } from 'vue';
import { HandleSubmit } from './types/HandleSubmit';
import { ReadonlyRef } from './types/ReadonlyRef';
import { SetFieldTouched } from './types/SetFieldTouched';
import { SetFieldValue } from './types/SetFieldValue';
import { SetHasSubmitted } from './types/SetHasSubmitted';
import { SetSubmitting } from './types/SetSubmitting';
import { SetTouched } from './types/SetTouched';
import { SetValues } from './types/SetValues';
import { TouchedOf } from './types/TouchedOf';
import { ValidationResult } from './types/ValidationResult';

export const injectionKeys = {
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

export type InjectionKeys<TFormModel> = {
  values: InjectionKey<ReadonlyRef<TFormModel>>;
  setValues: InjectionKey<SetValues<TFormModel>>;
  setFieldValue: InjectionKey<SetFieldValue>;
  touched: InjectionKey<ReadonlyRef<TouchedOf<TFormModel>>>;
  setTouched: InjectionKey<SetTouched<TFormModel>>;
  setFieldTouched: InjectionKey<SetFieldTouched>;
  errors: InjectionKey<ReadonlyRef<ValidationResult<TFormModel>>>;
  isSubmitting: InjectionKey<ReadonlyRef<boolean>>;
  setSubmitting: InjectionKey<SetSubmitting>;
  hasSubmitted: InjectionKey<ReadonlyRef<boolean>>;
  setHasSubmitted: InjectionKey<SetHasSubmitted>;
  validate: InjectionKey<() => void>;
  handleSubmit: InjectionKey<HandleSubmit<TFormModel>>;
};

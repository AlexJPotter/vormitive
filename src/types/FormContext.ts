import type { ValidationResult } from '../types/ValidationResult';
import type { HandleSubmit } from './HandleSubmit';
import type { ReadonlyRef } from './ReadonlyRef';
import type { SetFieldTouched } from './SetFieldTouched';
import type { SetFieldValue } from './SetFieldValue';
import type { SetHasSubmitted } from './SetHasSubmitted';
import type { SetSubmitting } from './SetSubmitting';
import { SetTouched } from './SetTouched';
import type { SetValues } from './SetValues';
import type { TouchedOf } from './TouchedOf';

export type FormContext<TFormModel> = {
  values: ReadonlyRef<TFormModel>;
  setValues: SetValues<TFormModel>;
  setFieldValue: SetFieldValue;
  touched: ReadonlyRef<TouchedOf<TFormModel>>;
  setTouched: SetTouched<TFormModel>,
  setFieldTouched: SetFieldTouched;
  errors: ReadonlyRef<ValidationResult<TFormModel>>;
  isSubmitting: ReadonlyRef<boolean>;
  setSubmitting: SetSubmitting;
  hasSubmitted: ReadonlyRef<boolean>;
  setHasSubmitted: SetHasSubmitted;
  validate: () => void;
  handleSubmit: HandleSubmit<TFormModel>;
};

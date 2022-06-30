import { ValidationResult } from '../types/ValidationResult';
import { HandleSubmit } from './HandleSubmit';
import { ReadonlyRef } from './ReadonlyRef';
import { SetFieldTouched } from './SetFieldTouched';
import { SetFieldValue } from './SetFieldValue';
import { SetHasSubmitted } from './SetHasSubmitted';
import { SetSubmitting } from './SetSubmitting';
import { SetTouched } from './SetTouched';
import { SetValues } from './SetValues';
import { TouchedOf } from './TouchedOf';

export type FormContext<TFormModel> = {
  values: ReadonlyRef<TFormModel>;
  setValues: SetValues<TFormModel>;
  setFieldValue: SetFieldValue;
  touched: ReadonlyRef<TouchedOf<TFormModel>>;
  setTouched: SetTouched<TFormModel>;
  setFieldTouched: SetFieldTouched;
  errors: ReadonlyRef<ValidationResult<TFormModel>>;
  isSubmitting: ReadonlyRef<boolean>;
  setSubmitting: SetSubmitting;
  hasSubmitted: ReadonlyRef<boolean>;
  setHasSubmitted: SetHasSubmitted;
  validate: () => void;
  handleSubmit: HandleSubmit<TFormModel>;
};

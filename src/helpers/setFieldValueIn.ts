import { setIn } from './helpers';

export const setFieldValueIn = <TFormModel>(
  values: TFormModel,
  fieldName: string,
  value: unknown
) => setIn(values, fieldName, value);

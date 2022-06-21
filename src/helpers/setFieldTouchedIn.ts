import { TouchedOf } from '../types/TouchedOf';
import { setIn } from './helpers';

export const setFieldTouchedIn = <TFormModel>(
  touched: TouchedOf<TFormModel>,
  fieldName: string,
  value: boolean
): TouchedOf<TFormModel> =>
  setIn(touched, fieldName, value, 'CreateEmptyObject');

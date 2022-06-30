import { TouchedOf } from './TouchedOf';

export type SetTouched<TFormModel> = (newTouched: TouchedOf<TFormModel>) => void;

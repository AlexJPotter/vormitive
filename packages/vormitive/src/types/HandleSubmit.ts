export type HandleSubmit<TFormModel> = (handler: (values: TFormModel) => Promise<void>) => Promise<void>;

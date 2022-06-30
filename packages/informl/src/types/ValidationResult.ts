// A `ValidationError` is either a `string` with the value of the error,
// otherwise `null | undefined` to signal that there is no error.
type ValidationError = string | null | undefined;

export type ValidationResult<TValue> = TValue extends Array<infer TEachValue>
  ? Record<string | number, ValidationResult<TEachValue>> | ValidationError
  : TValue extends object
  ? { [TKey in keyof TValue]?: ValidationResult<TValue[TKey]> } | ValidationError
  : ValidationError;

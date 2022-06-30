export type TouchedOf<TValue> = TValue extends Array<infer TEachValue>
  ? Record<string | number, TouchedOf<TEachValue>>
  : TValue extends object
  ? {
      [TKey in keyof TValue]?: TouchedOf<TValue[TKey]>;
    }
  : boolean | null | undefined;

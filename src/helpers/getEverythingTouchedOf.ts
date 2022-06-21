import type { TouchedOf } from '../types/TouchedOf';

// Returns a `TouchedOf<T>` instance where every field present in `values` is considered to have been touched.
export const getEverythingTouchedOf = <T>(values: T): TouchedOf<T> => {
  if (Array.isArray(values)) {
    const touchedOf = {} as Record<string, TouchedOf<unknown>>;

    for (let index = 0; index < values.length; index++) {
      touchedOf[index.toString()] = getEverythingTouchedOf(values[index]) as TouchedOf<unknown>;
    }

    return touchedOf as TouchedOf<T>;
  } else if (typeof values === 'object') {
    const touchedOf = {} as Record<string, TouchedOf<unknown>>;

    for (const key of Object.keys(values)) {
      touchedOf[key] = getEverythingTouchedOf(values[key as keyof T]) as TouchedOf<unknown>;
    }

    return touchedOf as TouchedOf<T>;
  } else {
    // This must be a "simple" value (not an array or object), so just return `true`
    return true as TouchedOf<T>;
  }
};

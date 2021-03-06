import { klona } from 'klona/full';
import { ValidationResult } from '../types/ValidationResult';
import { getFieldNamePathParts } from './getFieldNamePathParts';

export const clone = <TValue>(value: TValue): TValue => klona(value);

export const hasErrors = <TFormModel>(validationResult: ValidationResult<TFormModel>): boolean => {
  if (validationResult == null) {
    return false;
  }

  if (Array.isArray(validationResult)) {
    return validationResult.filter((element) => hasErrors(element)).length > 0;
  }

  if (typeof validationResult === 'object') {
    return (
      Object.keys(validationResult).filter(
        (key) => hasErrors((validationResult as any)[key]) // eslint-disable-line @typescript-eslint/no-explicit-any
      ).length > 0
    );
  }

  return true;
};

// Returns a clone of the object at the given `path` inside `parent`
export const getIn = <T>(parent: T, path: string): unknown => {
  const pathParts = getFieldNamePathParts(path);

  let currentScope = parent as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  for (let index = 0; index < pathParts.length; index++) {
    const part = pathParts[index];

    if (index === pathParts.length - 1) {
      return clone(currentScope[part]);
    } else if (currentScope[part] == null) {
      return null;
    } else {
      currentScope = currentScope[part];
    }
  }

  return undefined;
};

// Returns a clone of `parent` with the field at the given `path` set to the given `value`
export const setIn = <T>(
  parent: T,
  path: string,
  value: unknown,
  deadEndHandlingBehaviour?: 'ThrowError' | 'SilentlyFail' | 'CreateEmptyObject'
): T => {
  const parentClone = clone(parent);

  const pathParts = getFieldNamePathParts(path);

  let currentPath = '';
  let currentScope = parentClone as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  for (let index = 0; index < pathParts.length; index++) {
    const part = pathParts[index];
    currentPath = currentPath + '.' + part;

    if (index === pathParts.length - 1) {
      (currentScope[part] as any) = value; // eslint-disable-line @typescript-eslint/no-explicit-any
    } else if (currentScope[part] == null) {
      switch (deadEndHandlingBehaviour) {
        case 'SilentlyFail':
          return parentClone;
        case 'CreateEmptyObject':
          currentScope[part] = {};
          currentScope = currentScope[part];
          break;
        case 'ThrowError':
        default:
          throw new Error(`Encountered unexpected dead end at path ${currentPath}`);
      }
    } else {
      currentScope = currentScope[part];
    }
  }

  return parentClone;
};

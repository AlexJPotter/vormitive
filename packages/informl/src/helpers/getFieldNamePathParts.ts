// e.g. `myField.subFields[2].deeplyNestedField` --> `['myField', 'subFields', '2', 'deeplyNestedField']
export const getFieldNamePathParts = (fieldName: string): Array<string> =>
  fieldName.split('.').map(replaceSquareBracketArrayIndexingWithDotAccess).join('.').split('.');

// e.g. `myArrayProperty[2]` --> matches
//      `myNonArrayProperty` --> no match
const arrayIndexedFieldNameRegex = new RegExp('^\\w+\\[\\d+\\]$');

// e.g. `myArrayProperty[2]` --> `myArrayProperty.2`
const replaceSquareBracketArrayIndexingWithDotAccess = (pathPart: string): string => {
  if (!arrayIndexedFieldNameRegex.test(pathPart)) {
    return pathPart;
  }

  const arrayPropertyName = pathPart.split('[')[0];
  const elementIndex = Number(pathPart.split('[')[1].split(']')[0]);
  return `${arrayPropertyName}.${elementIndex}`;
};

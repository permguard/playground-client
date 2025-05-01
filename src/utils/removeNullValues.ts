/* eslint-disable @typescript-eslint/no-explicit-any */
type NonNullableObject<T> = {
  [K in keyof T]: T[K] extends object
    ? NonNullableObject<T[K]>
    : Exclude<T[K], null>;
};

export function removeNullValues<T>(obj: T): NonNullableObject<T> {
  // Handle non-object types
  if (obj === null) {
    return undefined as any; // Type assertion needed due to recursive type complexity
  }
  if (typeof obj !== "object") {
    return obj as any; // Type assertion needed for non-object types
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj
      .map((item) => removeNullValues(item))
      .filter((item) => item !== undefined) as any; // Type assertion for filtered array
  }

  // Handle objects
  const result: { [key: string]: any } = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = removeNullValues(obj[key]);
      if (value !== undefined) {
        result[key] = value;
      }
    }
  }
  return result as NonNullableObject<T>;
}

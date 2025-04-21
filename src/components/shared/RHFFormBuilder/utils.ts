import { FieldErrors, FieldValues } from "react-hook-form";

export type NullablePartial<T> = {
  [K in keyof T]?: T[K] | null | undefined;
};

export type RequiredNonNullable<T> = {
  [K in keyof T]-?: NonNullable<T[K]>;
};

// Validation patterns
export const phoneRegExp =
  /^(\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})?$/;

export const fiscalCodeRegExp =
  /^[A-Z]{6}[A-Z0-9]{2}[A-Z][A-Z0-9]{2}[A-Z][A-Z0-9]{3}[A-Z]$/;

export const atecoCodeRegExp = /^\d\d?(?:\.\d\d?)?(?:\.\d\d?)?$/;

export const vatNumberRegExp = /^[0-9]{11}$/;

const errorMessageForMandatory = function (field: string) {
  return `${field} is mandatory`;
};

const errorMessageGreaterThan = function (value: number) {
  return `The value should be greater than ${value}`;
};

const errorMessageGreaterOrEqualThan = function (value: number) {
  return `The value should be greater or equal than ${value}`;
};

const errorMessageLowerThan = function (value: number) {
  return `The value should be lower than ${value}`;
};

const errorMessageLowerOrEqualThan = function (value: number) {
  return `The value should be lower or equal than ${value}`;
};

const errorMessageForValueLen = function (field: string, min: number) {
  return `${field} must be long at least  ${min}`;
};

export {
  errorMessageForMandatory,
  errorMessageForValueLen,
  errorMessageGreaterThan,
  errorMessageGreaterOrEqualThan,
  errorMessageLowerThan,
  errorMessageLowerOrEqualThan,
};

export type IFieldError = { message?: string } | undefined;

export function getFormErrorByPath(
  object: FieldErrors<FieldValues> = {},
  path: string
) {
  const pathParts = path.split(".");
  let value: IFieldError | FieldErrors<FieldValues> = object;

  for (const part of pathParts) {
    if (value && typeof value === "object") {
      if (part.includes("[")) {
        const index = parseInt(part.match(/\[(\d+)\]/)![1]);

        const keyName = part.substring(0, part.indexOf("["));

        if (value[keyName]) {
          value = (value[keyName] as FieldErrors<FieldValues>)[
            index
          ] as FieldErrors<FieldValues>;
        } else {
          value = undefined;
        }
      } else {
        value = value[part] as FieldErrors<FieldValues>;
      }
    } else {
      return undefined;
    }
  }

  return value as IFieldError;
}

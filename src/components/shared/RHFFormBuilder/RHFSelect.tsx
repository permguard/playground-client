import React from "react";
import { Control, FieldErrors, FieldValues, Controller } from "react-hook-form";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/utils/classNames";
import { getFormErrorByPath } from "./utils";
import { RHFFormHelperError } from "./RHFFormHelperError";

type SelectOptions = {
  label: string;
  value: string;
}[];

interface IRHFSelectProps<T extends FieldValues> {
  id: string;
  name: string;
  label: React.ReactNode;
  labelPlaceholder?: string;
  errors: FieldErrors<FieldValues>;
  control: Control<T>;
  options: SelectOptions;
  labelId: string;
  translateOptions?: boolean;
  requiredFieldSymbol?: boolean | string;
  checkboxNullable?: boolean;
  disabled?: boolean;
  onCustomChange?: (data: {
    fieldName: string;
    value: string | string[];
  }) => void;
}

export const RHFSelect = <T extends FieldValues>({
  name,
  label,
  errors,
  control,
  options,
  labelId,
  labelPlaceholder,
  onCustomChange,
  requiredFieldSymbol,
  disabled,
  checkboxNullable,
}: IRHFSelectProps<T>) => {
  const error = getFormErrorByPath(errors, name);

  let labelSymbol: string;
  if (requiredFieldSymbol) {
    if (typeof requiredFieldSymbol === "string") {
      labelSymbol = ` ${requiredFieldSymbol}`;
    } else if (typeof requiredFieldSymbol === "boolean") {
      labelSymbol = " *";
    }
  }

  return (
    <div className="flex gap-2 sm:gap-8 justify-between items-center">
      <Controller
        name={name}
        control={control as Control<FieldValues>}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => {
          return (
            <>
              <Listbox
                disabled={
                  disabled ||
                  (checkboxNullable && (value === null || value === undefined))
                }
                value={value ?? null}
                onChange={
                  onCustomChange
                    ? (value: string) =>
                        onCustomChange({ fieldName: name, value })
                    : (value: string) => onChange(value)
                }
              >
                {({ open }) => (
                  <>
                    <Listbox.Label
                      className="block text-sm font-medium leading-6 text-white min-w-[20%] lg:min-w-[15%]"
                      id={labelId}
                    >
                      {label}
                      {labelSymbol}
                    </Listbox.Label>
                    {checkboxNullable ? (
                      <input
                        id={`checkbox-${name}`}
                        name={`checkbox-${name}`}
                        checked={!(value === null || value === undefined)}
                        onChange={(e) => {
                          onChange(e.target.checked ? "" : null);
                        }}
                        type="checkbox"
                        className="h- my-auto sm:-mr-4 w-4 rounded text-fuchsia-500 focus:ring-fuchsia-500 bg-zinc-800 border-gray-900"
                      />
                    ) : null}
                    <div className="relative flex-1">
                      <Listbox.Button
                        className={`min-h-9 relative w-full rounded-md py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-fuchsia-500 sm:text-sm sm:leading-6 bg-[#424242]/50 placeholder-gray-400 text-white ${
                          error !== undefined ? "ring-red-500" : "ring-zinc-700"
                        } ${disabled ? "!cursor-default" : "!cursor-pointer"}`}
                      >
                        <span
                          className={`block truncate ${
                            value ? "" : "text-gray-400"
                          }`}
                        >
                          {value
                            ? options.find((el) => el.value === value)?.label
                            : labelPlaceholder}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        show={open}
                        as={React.Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none sm:text-sm bg-[#424242] ring-zinc-700 placeholder-gray-400">
                          {options.map((option) => (
                            <Listbox.Option
                              key={option.value}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "text-white bg-fuchsia-500"
                                    : "text-white",
                                  "relative cursor-default select-none py-2 pl-3 pr-9"
                                )
                              }
                              value={option.value}
                            >
                              {({ active }) => {
                                const selected = value === option.value;

                                return (
                                  <>
                                    <span
                                      className={classNames(
                                        selected
                                          ? "font-semibold"
                                          : "font-normal",
                                        "block truncate",
                                        active ? "text-white" : ""
                                      )}
                                    >
                                      {option.label}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? "text-white"
                                            : "text-fuchsia-500",
                                          "absolute inset-y-0 right-0 flex items-center pr-4"
                                        )}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                );
                              }}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </>
          );
        }}
      />
      <RHFFormHelperError name={name} error={error}></RHFFormHelperError>
    </div>
  );
};

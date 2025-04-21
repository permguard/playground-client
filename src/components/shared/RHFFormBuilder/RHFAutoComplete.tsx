import {
  Control,
  FieldErrors,
  FieldValues,
  RegisterOptions,
  Controller,
} from "react-hook-form";
import { getFormErrorByPath } from "./utils";
import { RHFFormHelperError } from "./RHFFormHelperError";
import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { classNames } from "@/utils/classNames";
import { ILabelValue } from "@/utils/types";

export interface AutocompleteOption {
  label: string;
  value: string;
}

interface IRHFAutocompleteProps<T extends FieldValues> {
  name: string;
  id: string;
  options: AutocompleteOption[];
  fullWidth?: boolean;
  control: Control<T>;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  label: React.ReactNode;
  labelPlaceholder: string;
  errors: FieldErrors<FieldValues>;
  requiredFieldSymbol?: boolean | string;
  reflection?: boolean;
  readonly?: boolean;
  inputVariant?: "standart" | "expanded";
}

export const RHFAutocomplete = <T extends FieldValues>({
  name,
  id,
  options,
  fullWidth = true,
  control,
  rules,
  label,
  errors,
  labelPlaceholder,
  requiredFieldSymbol,
  readonly,
  inputVariant = "standart",
}: IRHFAutocompleteProps<T>) => {
  const error = getFormErrorByPath(errors, name);
  const [query, setQuery] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  let labelSymbol: string;
  if (requiredFieldSymbol) {
    if (typeof requiredFieldSymbol === "string") {
      labelSymbol = ` ${requiredFieldSymbol}`;
    } else if (typeof requiredFieldSymbol === "boolean") {
      labelSymbol = " *";
    }
  }

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return option.label.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div>
      <Controller
        name={name}
        control={control as Control<FieldValues>}
        rules={rules}
        render={({ field: { value, onChange } }) => {
          return (
            <div className={`${fullWidth ? "w-full" : null}`}>
              <Combobox
                as={"div"}
                value={value || ""}
                onChange={onChange}
                disabled={readonly ? readonly : undefined}
                id={id}
              >
                <Combobox.Label
                  className={classNames(
                    "block font-medium",
                    inputVariant === "expanded"
                      ? "text-black text-[14px] sm:text-base"
                      : "text-white text-sm leading-6"
                  )}
                >
                  {label}
                  {labelSymbol}
                </Combobox.Label>
                <div className={"relative mt-2"}>
                  <Combobox.Input
                    className={classNames(
                      inputVariant === "expanded"
                        ? `pr-10 text-[14px] sm:text-lg placeholder:text-gray-400 pl-6 flex h-[49px] sm:h-[54px] text-black items-center relative w-full ring-1 bg-[#8e8e9314] rounded-[12px] overflow-hidden border-none focus-within:ring-2 focus-within:ring-fuchsia-500 mt-2 placeholder:text-black/25 ${
                            error !== undefined
                              ? "ring-red-500"
                              : "ring-transparent"
                          }`
                        : null,
                      inputVariant === "standart"
                        ? `w-full rounded-md border-0 py-1.5 pl-3 pr-10 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-fuchsia-500 sm:text-sm sm:leading-6 bg-[#424242]/50 placeholder-gray-400 text-white  focus:border-blue-500 ${
                            error !== undefined
                              ? "ring-red-500"
                              : "ring-zinc-700"
                          }`
                        : null
                    )}
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(option: string) =>
                      options.find((el) => el.value === option)?.label as string
                    }
                    placeholder={labelPlaceholder}
                    onFocus={() => {
                      setInputFocused(true);
                    }}
                    onBlurCapture={() => setInputFocused(false)}
                  />

                  <Combobox.Button
                    className={`absolute inset-y-0 right-0 ring-y-[1px] ring-r-[1px] ${
                      inputFocused ? "!ring-0" : ""
                    } flex items-center rounded-r-md px-2 bg-transparent ${
                      error !== undefined ? "ring-red-500" : "ring-zinc-700"
                    }`}
                  >
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>

                  {filteredOptions.length > 0 && (
                    <Combobox.Options
                      className={classNames(
                        "absolute max-h-[200px] z-10 mt-1 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
                        inputVariant === "expanded"
                          ? "bg-white"
                          : "bg-[#424242]"
                      )}
                    >
                      {filteredOptions.map((option) => (
                        <Combobox.Option
                          key={option.value}
                          value={option.value}
                          className={({ active }) =>
                            classNames(
                              "relative cursor-default select-none py-2 pl-3 pr-9",
                              active
                                ? "bg-fuchsia-500 text-white"
                                : "text-gray-900"
                            )
                          }
                        >
                          {({ active, selected }) => (
                            <>
                              <span
                                className={classNames(
                                  "block truncate",
                                  selected ? "font-semibold" : "",
                                  active ? "text-white" : "",
                                  inputVariant === "expanded"
                                    ? "text-gray-900"
                                    : "text-white"
                                )}
                              >
                                {option.label}
                              </span>
                              {selected && (
                                <span
                                  className={classNames(
                                    "absolute inset-y-0 right-0 flex items-center pr-4",
                                    active ? "text-white" : "text-fuchsia-500"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              )}
                            </>
                          )}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  )}
                </div>
              </Combobox>
            </div>
          );
        }}
      />
      {inputVariant === "expanded" ? (
        <div className="h-6 leading-6 m-0 p-0 flex">
          <RHFFormHelperError error={error} name={name} />
        </div>
      ) : (
        <RHFFormHelperError error={error} name={name} />
      )}
    </div>
  );
};

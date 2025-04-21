import { Combobox } from "@headlessui/react";
import { useState } from "react";
import { classNames } from "@/utils/classNames";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ILabelValue } from "@/utils/types";

interface IRHFAutocompleteProps {
  options: ILabelValue[];
  onChange: (value: string) => void;
  value?: string | null;
  placeholder?: string;
  disabled?: boolean;
}

export const Autocomplete = ({
  options,
  placeholder,
  disabled,
  value,
  onChange,
}: IRHFAutocompleteProps) => {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return option.value.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className={"sm:w-[300px] xl:w-[290px] min-w-[175px]"}>
      <Combobox
        as={"div"}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
      >
        <div className="relative">
          <Combobox.Input
            className={`w-full outline-0 py-3 sm:py-3 rounded-[12px] border-0 pl-2 sm:pl-3 pr-10 sm:pr-4 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-fuchsia-500 text-[14px] sm:leading-6 bg-[rgba(142,_142,_147,_0.08)] placeholder-white/45 text-white  focus:border-blue-500 ring-zinc-700`}
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(option: string) =>
              options.find((el) => el.value === option)?.label as string
            }
            placeholder={placeholder}
          />

          <Combobox.Button
            className={`absolute inset-y-0 right-0 flex items-center rounded-r-[12px] pl-2 pr-4 sm:pr-5 border-zinc-700`}
          >
            <img
              src="/images/sort.svg"
              alt="sort"
              className="w-auto h-[18px] sm:h-[24px]"
            />
          </Combobox.Button>

          {filteredOptions.length > 0 && (
            <Combobox.Options className="ring-white/5 z-40 absolute mt-1 max-h-60 w-full overflow-auto rounded-[12px] py-1 text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none text-[14px] bg-zinc-800">
              {filteredOptions.map((option) => (
                <Combobox.Option
                  key={option.value}
                  value={option.value}
                  className={({ active }) =>
                    classNames(
                      "relative cursor-default select-none py-2 pl-3 pr-9",
                      active ? "bg-fuchsia-500 text-white" : "text-gray-900"
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <span
                        className={classNames(
                          "block truncate text-white",
                          selected ? "font-semibold" : "",
                          active ? "text-white" : ""
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
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
};

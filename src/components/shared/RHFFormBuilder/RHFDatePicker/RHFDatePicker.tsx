import { Control, FieldErrors, FieldValues, Controller } from "react-hook-form";
import { Datepicker } from "flowbite-react";
import { getFormErrorByPath } from "../utils";
import { RHFFormHelperError } from "../RHFFormHelperError";
import { getDatePickerTheme } from "./theme";

interface IRHFDatePickerProps<T extends FieldValues> {
  name: string;
  icon?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  mask?: string;
  ariaDescribedBy?: string;
  label: React.ReactNode;
  control: Control<T>;
  errors: FieldErrors<FieldValues>;
  requiredFieldSymbol?: boolean | string;
}

export const RHFDatePicker = <T extends FieldValues>({
  name,
  fullWidth = true,
  ariaDescribedBy,
  label,
  control,
  errors,
  requiredFieldSymbol,
  disabled,
}: IRHFDatePickerProps<T>) => {
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
    <div>
      <Controller
        name={name}
        control={control as Control<FieldValues>}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => {
          return (
            <div>
              <label className="block text-sm font-medium leading-6 text-white">
                {label}
                {labelSymbol}
              </label>
              <div className={`mt-2 ${fullWidth ? "w-full" : null}`}>
                <Datepicker
                  onChange={onChange}
                  value={value ? new Date(value) : undefined}
                  aria-describedby={ariaDescribedBy}
                  disabled={disabled}
                  autoHide={false}
                  theme={getDatePickerTheme(error)}
                  showClearButton={false}
                />
              </div>
            </div>
          );
        }}
      />
      <RHFFormHelperError error={error} name={name} />
    </div>
  );
};

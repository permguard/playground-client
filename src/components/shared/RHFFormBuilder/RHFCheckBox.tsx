import {
  Control,
  FieldValues,
  RegisterOptions,
  Controller,
} from "react-hook-form";

interface RHFCheckboxProps<T extends FieldValues> {
  name: string;
  id: string;
  label?: React.ReactNode;
  control: Control<T>;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  fullWidth?: boolean;
}

export const RHFCheckbox = <T extends FieldValues>({
  name,
  id,
  label,
  control,
  rules,
  fullWidth,
}: RHFCheckboxProps<T>) => {
  return (
    <Controller
      name={name}
      defaultValue={false}
      control={control as Control<FieldValues>}
      rules={rules}
      render={({ field: { value, onChange } }) => {
        return (
          <>
            <div
              className={`flex ${fullWidth ? "w-full" : null} h-6 items-center`}
            >
              <input
                id={id}
                name={name}
                checked={value}
                onChange={(checked) => onChange(checked)}
                type="checkbox"
                className="h-4 w-4 rounded text-fuchsia-500 focus:ring-fuchsia-500 bg-zinc-800 border-gray-900"
              />
              <div className="ml-3 text-sm leading-6">
                <label htmlFor={name} className="font-medium text-white">
                  {label}
                </label>
              </div>
            </div>
          </>
        );
      }}
    />
  );
};

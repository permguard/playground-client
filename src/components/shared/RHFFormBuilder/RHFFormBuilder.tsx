import { Control, FieldErrors, FieldValues } from "react-hook-form";
import { IFormControl } from "./types";
import { RHFInput } from "./RHFInput";
import { RHFSwitch } from "./RHFSwitch";
import { RHFCheckbox } from "./RHFCheckBox";
import { RHFSelect } from "./RHFSelect";
import { RHFAutocomplete } from "./RHFAutoComplete";
import { RHFDatePicker } from "./RHFDatePicker/RHFDatePicker";
import { RHFCode } from "./RHFCode";
import { RHFOptions } from "./RHFOptions";

type UploadButtonProps = {
  handleUpload?: () => void;
  uploadButtonLabel?: string;
  showUploadButton?: boolean;
};

interface IRHFFormBuilderProps<
  T extends FieldValues,
  InputNames extends string
> {
  formControls: IFormControl<InputNames>[];
  control: Control<T>;
  errors: FieldErrors<T>;
  handleSubmit: () => void;
  submitButtonLabel?: string;
  hasRequiredFieldsLegend?: boolean;
  isLoading?: boolean;
  submitButton?: React.ReactNode;
  children?: React.ReactNode;
  formSpacing?: number;
}

type Props<
  T extends FieldValues,
  InputNames extends string
> = IRHFFormBuilderProps<T, InputNames> & UploadButtonProps;

export const RHFFormBuilder = <
  T extends FieldValues,
  InputNames extends string
>({
  formControls,
  control,
  errors,
  submitButton,
  handleSubmit,
  handleUpload,
  hasRequiredFieldsLegend,
  submitButtonLabel = "common_submit",
  uploadButtonLabel = "common_upload",
  showUploadButton = false,
  children,
  isLoading,
  formSpacing = 4,
}: Props<T, InputNames>) => {
  return control ? (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className={`grid grid-cols-12 gap-${formSpacing}`}>
        {formControls.map((item) => {
          const label =
            typeof item.label === "string" ? item.label : item.label;
          const labelPlaceholder = item.labelPlaceholder as string;

          return (
            <div
              key={item.id}
              className={item.className ?? "col-span-12 sm:col-span-6"}
            >
              {item.visible ? (
                <>
                  {item.type == "textfield" ? (
                    <div>
                      <RHFInput
                        inputVariant={item.inputVariant}
                        suffixText={item.suffixText}
                        type={item.inputType ?? "text"}
                        fullWidth={item.fullWidth}
                        name={item.name}
                        rules={item.rules}
                        control={control}
                        label={label}
                        labelPlaceholder={labelPlaceholder}
                        ariaDescribedBy={item.ariaDescribedBy}
                        errors={errors}
                        icon={item.icon}
                        multiline={item.multiline}
                        rows={item.rows}
                        disabled={item.disabled}
                        requiredFieldSymbol={item.requiredFieldSymbol}
                        inputProps={item.inputProps}
                        copy={item.copy}
                      />
                    </div>
                  ) : null}
                  {item.type == "options" ? (
                    <div>
                      <RHFOptions
                        control={control}
                        errors={errors}
                        id={item.id}
                        label={label}
                        options={item.options!}
                        labelId={item.labelId as string}
                        name={item.name}
                      />
                    </div>
                  ) : null}
                  {item.type === "switch" ? (
                    <div>
                      <RHFSwitch
                        name={item.name}
                        control={control}
                        label={label}
                        fullWidth={item.fullWidth}
                        rules={item.rules}
                      />
                    </div>
                  ) : null}
                  {item.type === "checkbox" ? (
                    <div>
                      <RHFCheckbox
                        control={control}
                        name={item.name}
                        id={item.id}
                        label={item.label}
                        rules={item.rules}
                        fullWidth={item.fullWidth}
                      />
                    </div>
                  ) : null}
                  {item.type === "select" ? (
                    <div>
                      <RHFSelect
                        control={control}
                        errors={errors}
                        id={item.id}
                        label={item.label}
                        options={item.options!}
                        labelId={item.labelId as string}
                        name={item.name}
                        labelPlaceholder={item.labelPlaceholder}
                      />
                    </div>
                  ) : null}
                  {item.type === "code" ? (
                    <RHFCode
                      fullWidth={item.fullWidth}
                      name={item.name}
                      rules={item.rules}
                      height={item.height}
                      control={control}
                      errors={errors}
                      disabled={item.disabled}
                      language={item.language!}
                    />
                  ) : null}
                  {item.type === "autocomplete" ? (
                    <div>
                      <RHFAutocomplete
                        inputVariant={item.inputVariant}
                        options={item.autocompleteOptions!}
                        fullWidth={item.fullWidth}
                        id={item.id}
                        name={item.name}
                        control={control}
                        labelPlaceholder={labelPlaceholder}
                        label={label}
                        errors={errors}
                        requiredFieldSymbol={item.requiredFieldSymbol}
                        readonly={item.readonly}
                      />
                    </div>
                  ) : null}
                  {item.type === "date" ? (
                    <div>
                      <RHFDatePicker
                        fullWidth={item.fullWidth}
                        name={item.name}
                        icon={item.icon}
                        disabled={item.disabled}
                        control={control}
                        label={label}
                        ariaDescribedBy={item.ariaDescribedBy}
                        errors={errors}
                        mask={item.mask}
                        requiredFieldSymbol={item.requiredFieldSymbol}
                      />
                    </div>
                  ) : null}
                </>
              ) : null}

              {children ? (
                <div className="grid grid-cols-12">{children}</div>
              ) : null}
            </div>
          );
        })}
        {hasRequiredFieldsLegend ? (
          <div className="grid col-span-12 text-center -mb-4 mt-2 text-gray-200">
            <small>
              {"(*) The fields marked with an asterisk are mandatory"}
            </small>
          </div>
        ) : null}
        {submitButton || (
          <div className="flex mt-3 col-span-12 justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center rounded-md bg-fuchsia-500 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-500"
            >
              {submitButtonLabel}
            </button>
          </div>
        )}
        {showUploadButton && handleUpload ? (
          <div className="flex mt-4">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-fuchsia-500 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-500"
              onClick={handleUpload}
            >
              {uploadButtonLabel}
            </button>
          </div>
        ) : null}
      </div>
    </form>
  ) : null;
};

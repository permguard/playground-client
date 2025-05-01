import { Control, FieldErrors, FieldValues } from "react-hook-form";
import { RHFInput } from "./RHFInput";
import { RHFSwitch } from "./RHFSwitch";
import { RHFCheckbox } from "./RHFCheckBox";
import { RHFSelect } from "./RHFSelect";
import { RHFAutocomplete } from "./RHFAutoComplete";
import { RHFDatePicker } from "./RHFDatePicker/RHFDatePicker";
import { RHFCode } from "./RHFCode";
import { RHFOptions } from "./RHFOptions";
import { IFormControl } from "./types";

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
}: Props<T, InputNames>) => {
  // Function to render individual inputs
  const renderInput = (item: IFormControl<InputNames>) => {
    const label = typeof item.label === "string" ? item.label : item.label;
    const labelPlaceholder = item.labelPlaceholder as string;

    return (
      <div
        key={item.id}
        className={item.className ?? "col-span-12 md:col-span-6"}
      >
        {item.visible ? (
          <>
            {item.type === "textfield" ? (
              <RHFInput
                checkboxNullable={item.checkboxNullable}
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
                numericProps={item.numericProps}
              />
            ) : null}
            {item.type === "options" ? (
              <RHFOptions
                control={control}
                errors={errors}
                id={item.id}
                label={label}
                options={item.options!}
                labelId={item.labelId as string}
                name={item.name}
              />
            ) : null}
            {item.type === "switch" ? (
              <RHFSwitch
                name={item.name}
                control={control}
                label={label}
                fullWidth={item.fullWidth}
                rules={item.rules}
              />
            ) : null}
            {item.type === "checkbox" ? (
              <RHFCheckbox
                control={control}
                name={item.name}
                id={item.id}
                label={item.label}
                rules={item.rules}
                fullWidth={item.fullWidth}
              />
            ) : null}
            {item.type === "select" ? (
              <RHFSelect
                control={control}
                checkboxNullable={item.checkboxNullable}
                errors={errors}
                id={item.id}
                label={item.label}
                options={item.options!}
                labelId={item.labelId as string}
                name={item.name}
                requiredFieldSymbol={item.requiredFieldSymbol}
                labelPlaceholder={item.labelPlaceholder}
              />
            ) : null}
            {item.type === "code" ? (
              <RHFCode
                fullWidth={item.fullWidth}
                checkboxNullable={item.checkboxNullable}
                name={item.name}
                rules={item.rules}
                height={item.height}
                control={control}
                errors={errors}
                disabled={item.disabled}
                language={item.language!}
                label={item.label}
                requiredFieldSymbol={item.requiredFieldSymbol}
              />
            ) : null}
            {item.type === "autocomplete" ? (
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
            ) : null}
            {item.type === "date" ? (
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
            ) : null}
            {item.type === "typography" ? (
              <span className={`${item.inputProps?.className}`}>
                {item.label}
              </span>
            ) : null}
            {item.additionalContent}
          </>
        ) : null}
      </div>
    );
  };

  // Process form controls sequentially to maintain order with parentGroup and group
  const renderControls = () => {
    const elements: React.ReactNode[] = [];
    let currentParentGroup: string | undefined = undefined;
    let parentGroupElements: React.ReactNode[] = [];
    let currentParentGroupClassName: string | undefined = undefined;
    let currentGroup: string | undefined = undefined;
    let groupElements: React.ReactNode[] = [];
    let currentGroupClassName: string | undefined = undefined;

    formControls.forEach((item, index) => {
      const isLastItem = index === formControls.length - 1;

      // Handle parentGroup transition
      if (item.parentGroup !== currentParentGroup) {
        // Close the previous parentGroup (and any open group inside it)
        if (
          currentParentGroup !== undefined &&
          parentGroupElements.length > 0
        ) {
          // Close any open group within the parentGroup
          if (currentGroup !== undefined && groupElements.length > 0) {
            parentGroupElements.push(
              <div
                key={`group-${currentGroup}`}
                className={currentGroupClassName ?? "col-span-12"}
              >
                {groupElements}
              </div>
            );
            groupElements = [];
            currentGroup = undefined;
            currentGroupClassName = undefined;
          }
          elements.push(
            <div
              key={`parentGroup-${currentParentGroup}`}
              className={currentParentGroupClassName ?? "col-span-12"}
            >
              {parentGroupElements}
            </div>
          );
          parentGroupElements = [];
        }
        // Start a new parentGroup
        currentParentGroup = item.parentGroup;
        currentParentGroupClassName = item.parentGroupClassName;
      }

      // Handle group transition within the current parentGroup
      if (item.group !== currentGroup) {
        // Close the previous group if it exists
        if (currentGroup !== undefined && groupElements.length > 0) {
          const groupWrapper = (
            <div
              key={`group-${currentGroup}`}
              className={currentGroupClassName ?? "col-span-12"}
            >
              {groupElements}
            </div>
          );
          if (currentParentGroup) {
            parentGroupElements.push(groupWrapper);
          } else {
            elements.push(groupWrapper);
          }
          groupElements = [];
        }
        // Start a new group
        currentGroup = item.group;
        currentGroupClassName = item.groupClassName;
      }

      // Render the input
      const inputElement = renderInput(item);

      if (currentGroup) {
        // Add to the current group's elements
        groupElements.push(inputElement);
      } else if (currentParentGroup) {
        // Add to the parentGroup directly if no group
        parentGroupElements.push(inputElement);
      } else {
        // Render ungrouped input directly
        elements.push(inputElement);
      }

      // Close open groups and parentGroups at the end
      if (isLastItem) {
        // Close any open group
        if (groupElements.length > 0) {
          const groupWrapper = (
            <div
              key={`group-${currentGroup}`}
              className={currentGroupClassName ?? "col-span-12"}
            >
              {groupElements}
            </div>
          );
          if (currentParentGroup) {
            parentGroupElements.push(groupWrapper);
          } else {
            elements.push(groupWrapper);
          }
        }
        // Close any open parentGroup
        if (parentGroupElements.length > 0) {
          elements.push(
            <div
              key={`parentGroup-${currentParentGroup}`}
              className={currentParentGroupClassName ?? "col-span-12"}
            >
              {parentGroupElements}
            </div>
          );
        }
      }
    });

    return elements;
  };

  return control ? (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className={`grid grid-cols-12 gap-x-2 gap-y-8 sm:gap-8`}>
        {renderControls()}
        {children && <div className="grid grid-cols-12">{children}</div>}
        {hasRequiredFieldsLegend && (
          <div className="grid col-span-12 text-center -mb-4 mt-2 text-gray-200">
            <small>
              {"(*) The fields marked with an asterisk are mandatory"}
            </small>
          </div>
        )}
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
        {showUploadButton && handleUpload && (
          <div className="flex mt-4">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-fuchsia-500 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-500"
              onClick={handleUpload}
            >
              {uploadButtonLabel}
            </button>
          </div>
        )}
      </div>
    </form>
  ) : null;
};

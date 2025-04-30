import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RHFFormBuilder } from "@/components/shared/RHFFormBuilder/RHFFormBuilder";
import { getChecksJSONEditorFormDefinition } from "./checksJSONEditorFormDefinition";
import { ChecksJSONEditorFormPayload } from "./ChecksJSONEditorFormPayload";
import { RootState, useAppDispatch } from "@/store";
import { updateChecksState } from "@/store/checks/middleware/updateChecksState";

export const ChecksJSONEditorForm = () => {
  const dispatch = useAppDispatch();

  const selectedChecksCode = useSelector(
    (state: RootState) => state.checks.jsonCode
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
  } = useForm<ChecksJSONEditorFormPayload>({});

  const checksCodeValue = watch("code");

  useEffect(() => {
    if (!isDirty && selectedChecksCode) {
      setValue("code", selectedChecksCode, { shouldDirty: true });
    }
  }, [isDirty, selectedChecksCode, setValue]);

  useEffect(() => {
    if (selectedChecksCode) {
      setValue("code", selectedChecksCode, { shouldDirty: true });
    }
  }, [selectedChecksCode, setValue]);

  const handleConfirm = useCallback(async () => {}, []);

  useEffect(() => {
    if (checksCodeValue !== undefined)
      dispatch(updateChecksState(checksCodeValue));
  }, [dispatch, checksCodeValue]);

  return (
    <div>
      <RHFFormBuilder
        handleSubmit={handleSubmit(handleConfirm)}
        formControls={getChecksJSONEditorFormDefinition()}
        control={control}
        errors={errors}
        submitButton={<></>}
      />
    </div>
  );
};

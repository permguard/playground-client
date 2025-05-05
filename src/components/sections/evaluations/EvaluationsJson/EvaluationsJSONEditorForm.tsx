import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RHFFormBuilder } from "@/components/shared/RHFFormBuilder/RHFFormBuilder";
import { getEvaluationsJSONEditorFormDefinition } from "./evaluationsJSONEditorFormDefinition";
import { EvaluationsJSONEditorFormPayload } from "./EvaluationsJSONEditorFormPayload";
import { RootState, useAppDispatch } from "@/store";
import { updateEvaluationsState } from "@/store/evaluations/middleware/updateEvaluationsState";

export const EvaluationsJSONEditorForm = () => {
  const dispatch = useAppDispatch();

  const selectedChecksCode = useSelector(
    (state: RootState) => state.evaluations.jsonCode
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
  } = useForm<EvaluationsJSONEditorFormPayload>({});

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
      dispatch(updateEvaluationsState(checksCodeValue));
  }, [dispatch, checksCodeValue]);

  return (
    <div>
      <RHFFormBuilder
        handleSubmit={handleSubmit(handleConfirm)}
        formControls={getEvaluationsJSONEditorFormDefinition()}
        control={control}
        errors={errors}
        submitButton={<></>}
      />
    </div>
  );
};

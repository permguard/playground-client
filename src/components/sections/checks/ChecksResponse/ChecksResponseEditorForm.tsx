import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RHFFormBuilder } from "@/components/shared/RHFFormBuilder/RHFFormBuilder";
import { getChecksResponseEditorFormDefinition } from "./checksResponseEditorFormDefinition";
import { ChecksResponseEditorFormPayload } from "./ChecksResponseEditorFormPayload";
import { RootState } from "@/store";

export const ChecksResponseEditorForm = () => {
  const responseCode = useSelector((state: RootState) => state.checks.response);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ChecksResponseEditorFormPayload>({});

  useEffect(() => {
    if (responseCode) {
      const responseJSON = JSON.stringify(responseCode, null, 2);
      setValue("response", responseJSON);
    }
  }, [responseCode, setValue]);

  const handleConfirm = useCallback(async () => {}, []);

  return (
    <div>
      <RHFFormBuilder
        handleSubmit={handleSubmit(handleConfirm)}
        formControls={getChecksResponseEditorFormDefinition()}
        control={control}
        errors={errors}
        submitButton={<></>}
      />
    </div>
  );
};

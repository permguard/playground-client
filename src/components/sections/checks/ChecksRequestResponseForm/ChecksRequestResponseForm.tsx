import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RHFFormBuilder } from "@/components/shared/RHFFormBuilder/RHFFormBuilder";
import { getChecksRequestResponseFormDefinition } from "./checksRequestResponseFormDefinition";
import { ChecksRequestResponseFormPayload } from "./ChecksRequestResponseFormPayload";
import { RootState } from "@/store";

export const ChecksRequestResponseForm = () => {
  const responseCode = useSelector(
    (state: RootState) => state.evaluations.response
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ChecksRequestResponseFormPayload>({});

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
        formControls={getChecksRequestResponseFormDefinition()}
        control={control}
        errors={errors}
        submitButton={<></>}
      />
    </div>
  );
};

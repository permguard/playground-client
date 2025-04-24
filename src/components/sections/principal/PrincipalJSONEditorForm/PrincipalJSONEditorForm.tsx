import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RHFFormBuilder } from "@/components/shared/RHFFormBuilder/RHFFormBuilder";
import { getPrincipalJSONEditorFormDefinition } from "./principalJSONEditorFormDefinition";
import { PrincipalJSONEditorFormPayload } from "./PrincipalJSONEditorFormPayload";
import { useAppDispatch, RootState } from "@/store";
import { updatePrincipalState } from "@/store/principal/middleware/updatePrincipalState";

export const PrincipalJSONEditorForm = () => {
  const dispatch = useAppDispatch();

  const selectedPrincipalCode = useSelector(
    (state: RootState) => state.principal.jsonCode
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
  } = useForm<PrincipalJSONEditorFormPayload>({});

  const principalCodeValue = watch("code");

  useEffect(() => {
    if (!isDirty && selectedPrincipalCode) {
      setValue("code", selectedPrincipalCode, { shouldDirty: true });
    }
  }, [isDirty, selectedPrincipalCode, setValue]);

  useEffect(() => {
    if (selectedPrincipalCode) {
      setValue("code", selectedPrincipalCode, { shouldDirty: true });
    }
  }, [selectedPrincipalCode, setValue]);

  const handleConfirm = useCallback(async () => {}, []);

  useEffect(() => {
    if (principalCodeValue !== undefined)
      dispatch(updatePrincipalState(principalCodeValue));
  }, [dispatch, principalCodeValue]);

  return (
    <div>
      <RHFFormBuilder
        handleSubmit={handleSubmit(handleConfirm)}
        formControls={getPrincipalJSONEditorFormDefinition()}
        control={control}
        errors={errors}
        submitButton={<></>}
      />
    </div>
  );
};

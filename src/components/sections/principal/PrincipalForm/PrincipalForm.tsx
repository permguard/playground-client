import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { PrincipalFormPayload } from "./PrincipalFormPayload";
import { getPrincipalFormDefinition } from "./principalFormDefinition";
import { RHFFormBuilder } from "@/components/shared/RHFFormBuilder/RHFFormBuilder";
import { RootState, useAppDispatch } from "@/store";
import { updatePrincipalState } from "@/store/principal/middleware/updatePrincipalState";

export const PrincipalForm = () => {
  const dispatch = useAppDispatch();

  const [jsonProcessedState, setJsonProcessedState] = useState({
    processed: false,
    valid: true,
  });

  const jsonCode = useSelector((state: RootState) => state.principal.jsonCode);

  const handleConfirm = useCallback(async () => {}, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<PrincipalFormPayload>({
    defaultValues: {
      type: "",
      id: "",
      source: "",
    },
  });

  useEffect(() => {
    try {
      const parsedJSON = JSON.parse(jsonCode!);

      const defaultValues: PrincipalFormPayload = {
        id: parsedJSON.id,
        type: parsedJSON.type,
        source: parsedJSON.source,
      };

      reset(defaultValues);
      setJsonProcessedState({ processed: true, valid: true });
    } catch {
      if (jsonCode !== null) {
        setJsonProcessedState({ processed: true, valid: false });
      }
    }
  }, [jsonCode, reset]);

  const formValues = watch();

  useEffect(() => {
    if (jsonProcessedState.processed && jsonProcessedState.valid) {
      const jsonPayload = {
        source: formValues.source,
        type: formValues.type,
        id: formValues.id,
      };
      const updatedJsonCode = JSON.stringify(jsonPayload, null, 2);

      dispatch(updatePrincipalState(updatedJsonCode));
    }
  }, [
    dispatch,
    formValues.type,
    formValues.id,
    formValues.source,
    jsonProcessedState.processed,
    jsonProcessedState.valid,
    setValue,
  ]);

  return (
    <>
      {jsonProcessedState.processed && !jsonProcessedState.valid ? (
        <p className="text-red-500 text-sm mb-4">
          Invalid JSON detected. Please fix the errors to proceed.
        </p>
      ) : null}
      <RHFFormBuilder
        handleSubmit={handleSubmit(handleConfirm)}
        formControls={getPrincipalFormDefinition({
          disabled: !jsonProcessedState.processed || !jsonProcessedState.valid,
        })}
        control={control}
        errors={errors}
        submitButton={<></>}
      />
    </>
  );
};

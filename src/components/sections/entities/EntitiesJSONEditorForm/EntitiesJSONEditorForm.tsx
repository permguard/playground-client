import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RHFFormBuilder } from "@/components/shared/RHFFormBuilder/RHFFormBuilder";
import { getEntitiesJSONEditorFormDefinition } from "./entitiesJSONEditorFormDefinition";
import { EntitiesJSONEditorFormPayload } from "./EntitiesJSONEditorFormPayload";
import { useAppDispatch, RootState } from "@/store";
import { updateEntitiesState } from "@/store/entities/middleware/updateEntitiesState";

export const EntitiesJSONEditorForm = () => {
  const dispatch = useAppDispatch();

  const jsonCode = useSelector((state: RootState) => state.entities.jsonCode);

  const [jsonProcessedState, setJsonProcessedState] = useState({
    processed: false,
    valid: true,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
  } = useForm<EntitiesJSONEditorFormPayload>({});

  const entitiesCodeValue = watch("code");

  useEffect(() => {
    if (!isDirty && jsonCode) {
      setValue("code", jsonCode, { shouldDirty: true });
    }
  }, [isDirty, jsonCode, setValue]);

  useEffect(() => {
    if (jsonCode) {
      setValue("code", jsonCode, { shouldDirty: true });
    }
  }, [jsonCode, setValue]);

  const handleConfirm = useCallback(async () => {}, []);

  useEffect(() => {
    if (entitiesCodeValue !== undefined)
      dispatch(updateEntitiesState(entitiesCodeValue));
  }, [dispatch, entitiesCodeValue]);

  useEffect(() => {
    try {
      JSON.parse(jsonCode!);

      setJsonProcessedState({ processed: true, valid: true });
    } catch {
      if (jsonCode !== undefined) {
        setJsonProcessedState({ processed: true, valid: false });
      }
    }
  }, [jsonCode]);

  return (
    <>
      <div className="h-5 mb-2">
        {jsonProcessedState.processed && !jsonProcessedState.valid ? (
          <p className="text-red-500 text-sm">
            Invalid JSON detected, please check the syntax.
          </p>
        ) : null}
      </div>
      <div className="mt-5 relative">
        <RHFFormBuilder
          handleSubmit={handleSubmit(handleConfirm)}
          formControls={getEntitiesJSONEditorFormDefinition()}
          control={control}
          errors={errors}
          submitButton={<></>}
        />
      </div>
    </>
  );
};

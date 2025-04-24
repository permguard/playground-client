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
      policy_store_kind: "",
      policy_store_id: "",
    },
  });

  useEffect(() => {
    try {
      const parsedJSON = JSON.parse(jsonCode!);

      const defaultValues: PrincipalFormPayload = {
        zone_id: parsedJSON.zone_id,
        policy_store_kind: parsedJSON.policy_store?.kind,
        policy_store_id: parsedJSON.policy_store?.id,
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
      let zoneId = formValues.zone_id;

      if (zoneId > 99999999999999) {
        zoneId = Number(BigInt(zoneId) / 10n);
        setValue("zone_id", zoneId);
      }

      const jsonPayload = {
        zone_id: zoneId,
        policy_store: {
          kind: formValues.policy_store_kind,
          id: formValues.policy_store_id,
        },
      };
      const updatedJsonCode = JSON.stringify(jsonPayload, null, 2);

      dispatch(updatePrincipalState(updatedJsonCode));
    }
  }, [
    dispatch,
    formValues.zone_id,
    formValues.policy_store_kind,
    formValues.policy_store_id,
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

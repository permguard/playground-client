import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { LedgerFormPayload } from "./LedgerFormPayload";
import { getLedgerFormDefinition } from "./ledgerFormDefinition";
import { RHFFormBuilder } from "@/components/shared/RHFFormBuilder/RHFFormBuilder";
import { RootState, useAppDispatch } from "@/store";
import { updateLedgerState } from "@/store/ledger/middleware/updateLedgerState";

export const LedgerForm = () => {
  const dispatch = useAppDispatch();

  const [jsonIsBroken, setJsonIsBroken] = useState(false);

  const jsonCode = useSelector((state: RootState) => state.ledger.jsonCode);

  const handleConfirm = useCallback(async () => {}, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<LedgerFormPayload>({
    defaultValues: {
      policy_store_kind: "",
      policy_store_id: "",
    },
  });

  useEffect(() => {
    try {
      const parsedJSON = JSON.parse(jsonCode!);

      const defaultValues: LedgerFormPayload = {
        zone_id: parsedJSON.zone_id,
        policy_store_kind: parsedJSON.policy_store.kind,
        policy_store_id: parsedJSON.policy_store.id,
      };

      reset(defaultValues);
    } catch {
      setJsonIsBroken(true);
    }
  }, [jsonCode, reset]);

  const formValues = getValues();

  useEffect(() => {
    const jsonPayload = {
      zone_id: formValues.zone_id,
      policy_store: {
        kind: formValues.policy_store_kind,
        id: formValues.policy_store_id,
      },
    };
    const updatedJsonCode = JSON.stringify(jsonPayload, null, 2);

    dispatch(updateLedgerState(updatedJsonCode));
  }, [dispatch, formValues]);

  return (
    <>
      {jsonIsBroken ? (
        <p className="text-red-500 text-sm mb-4">
          Invalid JSON detected. Please fix the errors to proceed.
        </p>
      ) : null}
      <RHFFormBuilder
        handleSubmit={handleSubmit(handleConfirm)}
        formControls={getLedgerFormDefinition()}
        control={control}
        errors={errors}
        submitButton={<></>}
      />
    </>
  );
};

import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RHFFormBuilder } from "@/components/shared/RHFFormBuilder/RHFFormBuilder";
import { getLedgerJSONEditorFormDefinition } from "./ledgerJSONEditorFormDefinition";
import { LedgerJSONEditorFormPayload } from "./LedgerJSONEditorFormPayload";
import { useAppDispatch, RootState } from "@/store";
import { updateLedgerState } from "@/store/ledger/middleware/updateLedgerState";
import { initLedgerState } from "@/store/ledger/middleware/initLedgerState";

export const LedgerJSONEditorForm = () => {
  const dispatch = useAppDispatch();

  const selectedLedgerCode = useSelector(
    (state: RootState) => state.ledger.jsonCode
  );

  useEffect(() => {
    dispatch(initLedgerState());
  }, [dispatch]);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
  } = useForm<LedgerJSONEditorFormPayload>({});

  const ledgerCodeValue = watch("code");

  useEffect(() => {
    if (!isDirty && selectedLedgerCode) {
      setValue("code", selectedLedgerCode, { shouldDirty: true });
    }
  }, [isDirty, selectedLedgerCode, setValue]);

  useEffect(() => {
    if (selectedLedgerCode) {
      setValue("code", selectedLedgerCode, { shouldDirty: true });
    }
  }, [selectedLedgerCode, setValue]);

  const handleConfirm = useCallback(async () => {}, []);

  useEffect(() => {
    if (ledgerCodeValue !== undefined)
      dispatch(updateLedgerState(ledgerCodeValue));
  }, [dispatch, ledgerCodeValue]);

  return (
    <div>
      <RHFFormBuilder
        handleSubmit={handleSubmit(handleConfirm)}
        formControls={getLedgerJSONEditorFormDefinition()}
        control={control}
        errors={errors}
        submitButton={<></>}
      />
    </div>
  );
};

import React, { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RHFFormBuilder } from "@/components/shared/RHFFormBuilder/RHFFormBuilder";
import { getLedgerFormDefinition } from "./ledgerFormDefinition";
import { LedgerFormPayload } from "./validation/LedgerFormPayload";
import { useAppDispatch, RootState } from "@/store";
import { updateLedgerState } from "@/store/ledger/middleware/updateLedgerState";
import { initLedgerState } from "@/store/ledger/middleware/initLedgerState";

export const LedgerForm = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initLedgerState());
  }, [dispatch]);

  const selectedLedgerCode = useSelector(
    (state: RootState) => state.ledger.cedarCode
  );

  const defaultValues: { code?: string } = useMemo(
    () =>
      selectedLedgerCode
        ? ({
            code: selectedLedgerCode,
          } as LedgerFormPayload)
        : {},
    [selectedLedgerCode]
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<LedgerFormPayload>({
    defaultValues,
  });

  const ledgerCodeValue = watch("code");

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const handleConfirm = useCallback(async () => {}, []);

  useEffect(() => {
    dispatch(updateLedgerState(ledgerCodeValue));
  }, [dispatch, ledgerCodeValue]);

  return (
    <div>
      <RHFFormBuilder
        handleSubmit={handleSubmit(handleConfirm)}
        formControls={getLedgerFormDefinition()}
        control={control}
        errors={errors}
        submitButton={<></>}
      />
    </div>
  );
};

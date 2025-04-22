import React, { useCallback, useEffect } from "react";
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

  const selectedTab = useSelector(
    (state: RootState) => state.ledger.selectedTab
  );

  const selectedLedgerCode = useSelector((state: RootState) =>
    state.ledger.selectedTab === "cedar"
      ? state.ledger.cedarCode
      : state.ledger.jsonCode
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
  } = useForm<LedgerFormPayload>({});

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
  }, [selectedTab, setValue]);

  const handleConfirm = useCallback(async () => {}, []);

  useEffect(() => {
    if (ledgerCodeValue !== undefined)
      dispatch(updateLedgerState(ledgerCodeValue));
  }, [dispatch, ledgerCodeValue]);

  return (
    <div>
      <RHFFormBuilder
        handleSubmit={handleSubmit(handleConfirm)}
        formControls={getLedgerFormDefinition({
          language: selectedTab === "cedar" ? "cedar-schema" : "json",
        })}
        control={control}
        errors={errors}
        submitButton={<></>}
      />
    </div>
  );
};

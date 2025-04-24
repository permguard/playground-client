import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ChecksFormPayload } from "./ChecksFormPayload";
import { getChecksFormDefinition } from "./checksFormDefinition";
import { RHFFormBuilder } from "@/components/shared/RHFFormBuilder/RHFFormBuilder";
import { RootState, useAppDispatch } from "@/store";
import { updateChecksState } from "@/store/checks/middleware/updateChecksState";
import { Icon } from "@iconify/react/dist/iconify.js";

export const ChecksForm = () => {
  const dispatch = useAppDispatch();

  const [jsonProcessedState, setJsonProcessedState] = useState({
    processed: false,
    valid: true,
  });

  const jsonCode = useSelector((state: RootState) => state.checks.jsonCode);

  const handleConfirm = useCallback(async () => {}, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ChecksFormPayload>({
    defaultValues: {},
  });

  useEffect(() => {
    try {
      const parsedJSON = JSON.parse(jsonCode!);
      console.log("parsedJSON", parsedJSON);

      const defaultValues = parsedJSON as ChecksFormPayload;

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
        url: formValues.url,
        port: formValues.port,
      };
      const updatedJsonCode = JSON.stringify(formValues, null, 2);

      dispatch(updateChecksState(updatedJsonCode));
    }
  }, [
    dispatch,
    formValues.url,
    formValues.port,
    jsonProcessedState.processed,
    jsonProcessedState.valid,
    setValue,
  ]);

  const handleAddEvaluation = useCallback(() => {}, []);

  const addEvaluationBtn = (
    <button
      className="flex gap-1 items-center text-sm borser border-white/10 rounded-md px-2 py-1 bg-white/10 hover:bg-white/20 transition-all duration-200"
      onClick={handleAddEvaluation}
    >
      <Icon icon={"material-symbols:add-rounded"} />
      <span>Add evaluation</span>
    </button>
  );

  return (
    <>
      {jsonProcessedState.processed && !jsonProcessedState.valid ? (
        <p className="text-red-500 text-sm mb-4">
          Invalid JSON detected. Please fix the errors to proceed.
        </p>
      ) : null}
      <RHFFormBuilder
        handleSubmit={handleSubmit(handleConfirm)}
        formControls={getChecksFormDefinition({ addEvaluationBtn })}
        control={control}
        errors={errors}
        submitButton={<></>}
      />
    </>
  );
};

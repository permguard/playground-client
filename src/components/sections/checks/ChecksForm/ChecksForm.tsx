import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ChecksFormPayload } from "./ChecksFormPayload";
import { getChecksFormDefinition } from "./checksFormDefinition";
import { RHFFormBuilder } from "@/components/shared/RHFFormBuilder/RHFFormBuilder";
import { RootState, useAppDispatch } from "@/store";
import { updateChecksState } from "@/store/checks/middleware/updateChecksState";
import { Icon } from "@iconify/react/dist/iconify.js";
import * as _ from "lodash";

export const ChecksForm = () => {
  const dispatch = useAppDispatch();

  const [jsonProcessedState, setJsonProcessedState] = useState({
    processed: false,
    valid: true,
  });
  const [errorInput, setErrorInput] = useState(false);

  const jsonCode = useSelector((state: RootState) => state.checks.jsonCode);

  const handleConfirm = useCallback(async () => {}, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    watch,
  } = useForm<ChecksFormPayload>({
    defaultValues: {},
    mode: "onChange",
    resolver: (data) => {
      setTimeout(() => {
        handleFormChange(data);
      }, 0);

      return { values: data, errors: {} };
    },
  });

  useEffect(() => {
    try {
      const parsedJSON = JSON.parse(jsonCode!);

      const checks = parsedJSON as ChecksFormPayload;

      checks.subject.properties = JSON.stringify(
        checks.subject.properties,
        null,
        2
      );

      checks.evaluations.forEach((evaluation) => {
        evaluation.resource.properties = JSON.stringify(
          evaluation.resource.properties,
          null,
          2
        );
        evaluation.action.properties = JSON.stringify(
          evaluation.action.properties,
          null,
          2
        );
      });

      reset(checks);
      setJsonProcessedState({ processed: true, valid: true });
    } catch {
      if (jsonCode !== undefined) {
        setJsonProcessedState({ processed: true, valid: false });
      }
    }
  }, [jsonCode, reset]);

  const evaluations = watch("evaluations");

  const handleFormChange = (formValues: ChecksFormPayload) => {
    if (jsonProcessedState.processed && jsonProcessedState.valid) {
      try {
        const checks = _.cloneDeep(formValues);

        checks.subject.properties = JSON.parse(
          checks.subject.properties as string
        );

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        checks.evaluations.forEach((evaluation) => {
          evaluation.resource.properties = JSON.parse(
            evaluation.resource.properties as string
          );
          evaluation.action.properties = JSON.parse(
            evaluation.action.properties as string
          );
        });

        const formValuesJSON = JSON.stringify(checks, null, 2);

        dispatch(updateChecksState(formValuesJSON));
        setErrorInput(false);
      } catch {
        setErrorInput(true);
      }
    }
  };

  const handleAddEvaluation = useCallback(() => {
    const values = getValues();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setValue(`evaluations[${values.evaluations.length}]`, {
      request_id: "",
      resource: {
        type: "",
        id: "",
        properties: "{}",
      },
      action: {
        name: "",
        properties: "{}",
      },
    });
  }, [getValues, setValue]);

  const handleRemoveEvaluation = useCallback(
    (index: number) => {
      const values = getValues();

      values.evaluations.splice(index, 1);

      setValue(`evaluations`, values.evaluations);
    },
    [getValues, setValue]
  );

  const addEvaluationBtn = (
    <button
      className="flex gap-1 items-center text-sm borser border-white/10 rounded-md px-2 py-1 bg-white/10 hover:bg-white/20 transition-all duration-200"
      onClick={handleAddEvaluation}
    >
      <Icon icon={"material-symbols:add-rounded"} />
      <span>Add evaluation</span>
    </button>
  );

  const removeEvaluationBtn = (index: number) => (
    <button
      className="text-red-500 top-4 right-4 absolute"
      onClick={() => handleRemoveEvaluation(index)}
    >
      <Icon icon={"tabler:trash"} fontSize={24} className="h-5 sm:h-6" />
    </button>
  );

  return (
    <>
      <div className="h-5 mb-2">
        {(jsonProcessedState.processed && !jsonProcessedState.valid) ||
        errorInput ? (
          <p className="text-red-500 text-sm mb-4 ">
            {errorInput
              ? "Invalid JSON input detected. Changes won't be saved and applied. Please fix the errors to proceed."
              : "Invalid JSON detected. Please fix the errors to proceed."}
          </p>
        ) : null}
      </div>
      <RHFFormBuilder
        handleSubmit={handleSubmit(handleConfirm)}
        formControls={getChecksFormDefinition({
          addEvaluationBtn,
          removeEvaluationBtn,
          evaluationsCount: evaluations?.length ?? 1,
        })}
        control={control}
        errors={errors}
        submitButton={<></>}
      />
    </>
  );
};

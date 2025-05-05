import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { EvaluationsFormPayload } from "./EvaluationsFormPayload";
import { getEvaluationsFormDefinition } from "./evaluationsFormDefinition";
import { RHFFormBuilder } from "@/components/shared/RHFFormBuilder/RHFFormBuilder";
import { RootState, useAppDispatch } from "@/store";
import { updateEvaluationsState } from "@/store/evaluations/middleware/updateEvaluationsState";
import { Icon } from "@iconify/react/dist/iconify.js";
import * as _ from "lodash";
import { classNames } from "@/utils/classNames";
import { removeNullValues } from "@/utils/removeNullValues";

const OPTIONAL_FIELDS = [
  "subject",
  "resource",
  "action",
  "context",
] as (keyof EvaluationsFormPayload)[];

export const EvaluationsForm = () => {
  const dispatch = useAppDispatch();

  const [jsonProcessedState, setJsonProcessedState] = useState({
    processed: false,
    valid: true,
  });
  const [errorInput, setErrorInput] = useState(false);
  const [expandedSectionIndex, setExpandedSectionIndex] = useState<
    number | null
  >(null);

  const jsonCode = useSelector(
    (state: RootState) => state.evaluations.jsonCode
  );
  const isInitial = useSelector(
    (state: RootState) => state.evaluations.isInitial
  );

  const handleConfirm = useCallback(async () => {}, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    watch,
  } = useForm<EvaluationsFormPayload>({
    defaultValues: {},
    mode: "onChange",
    resolver: (data) => {
      setTimeout(() => {
        handleFormChange(data);
      }, 0);

      return { values: data, errors: {} };
    },
  });

  const handlePrepareJSON = useCallback(() => {
    try {
      const parsedJSON = JSON.parse(jsonCode!);

      const checks = parsedJSON as EvaluationsFormPayload;

      if (checks.context) {
        checks.context = JSON.stringify(checks.context, null, 2);
      }

      if (checks.subject) {
        checks.subject.properties = JSON.stringify(
          checks.subject.properties,
          null,
          2
        );
      }

      if (checks.resource) {
        checks.resource.properties = JSON.stringify(
          checks.resource.properties,
          null,
          2
        );
      }

      if (checks.action) {
        checks.action.properties = JSON.stringify(
          checks.action.properties,
          null,
          2
        );
      }

      checks.evaluations.forEach((evaluation) => {
        if (evaluation.resource) {
          evaluation.resource.properties = JSON.stringify(
            evaluation.resource.properties,
            null,
            2
          );
        }

        if (evaluation.action) {
          evaluation.action.properties = JSON.stringify(
            evaluation.action.properties,
            null,
            2
          );
        }

        if (evaluation.subject) {
          evaluation.subject.properties = JSON.stringify(
            evaluation.subject.properties,
            null,
            2
          );
        }

        if (evaluation.context) {
          evaluation.context = JSON.stringify(evaluation.context, null, 2);
        }
      });

      reset(checks);
      setJsonProcessedState({ processed: true, valid: true });
    } catch {
      if (jsonCode !== undefined) {
        setJsonProcessedState({ processed: true, valid: false });
      }
    }
  }, [jsonCode, reset]);

  useEffect(() => {
    if (!jsonProcessedState.processed && jsonCode) {
      handlePrepareJSON();
    }
  }, [jsonProcessedState.processed, handlePrepareJSON, jsonCode]);

  useEffect(() => {
    if (jsonCode && isInitial) {
      handlePrepareJSON();
    }
  }, [jsonCode, handlePrepareJSON, isInitial]);

  const evaluations = watch("evaluations");

  const handleFormChange = (formValues: EvaluationsFormPayload) => {
    if (jsonProcessedState.processed && jsonProcessedState.valid) {
      try {
        const checks = _.cloneDeep(formValues);

        if (checks.subject) {
          checks.subject.properties = JSON.parse(
            checks.subject.properties as string
          );
        }

        if (checks.resource) {
          checks.resource.properties = JSON.parse(
            checks.resource.properties as string
          );
        }

        if (checks.action) {
          checks.action.properties = JSON.parse(
            checks.action.properties as string
          );
        }

        if (checks.context) {
          checks.context = JSON.parse(checks.context as string);
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        checks.evaluations.forEach((evaluation) => {
          if (evaluation.resource) {
            evaluation.resource.properties = JSON.parse(
              evaluation.resource.properties as string
            );
          }

          if (evaluation.action) {
            evaluation.action.properties = JSON.parse(
              evaluation.action.properties as string
            );
          }

          if (evaluation.subject) {
            evaluation.subject.properties = JSON.parse(
              evaluation.subject.properties as string
            );
          }

          if (evaluation.context) {
            evaluation.context = JSON.parse(evaluation.context as string);
          }
        });

        const cleanedChecks = removeNullValues(checks);

        const formValuesJSON = JSON.stringify(cleanedChecks, null, 2);

        dispatch(updateEvaluationsState(formValuesJSON));
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
      subject: {
        type: "",
        id: "",
        source: "",
        properties: "{}",
      },
      context: "{}",
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

      if (index === expandedSectionIndex) {
        setExpandedSectionIndex(null);
      } else if (index < (expandedSectionIndex ?? 0)) {
        setExpandedSectionIndex((prevIndex) => prevIndex! - 1);
      }
    },
    [expandedSectionIndex, getValues, setValue]
  );

  const handleExpandSection = useCallback(
    (index: number) => {
      setExpandedSectionIndex((prevIndex) =>
        prevIndex === index ? null : index
      );
    },
    [setExpandedSectionIndex]
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
    <div className="flex gap-2 sm:gap-4 md:gap-8 items-center top-6 right-4 sm:right-8 absolute">
      <button
        className="text-red-500"
        onClick={() => handleRemoveEvaluation(index)}
      >
        <Icon icon={"tabler:trash"} fontSize={24} className="h-5 sm:h-6" />
      </button>
      <button className="text-white" onClick={() => handleExpandSection(index)}>
        <Icon
          icon={"weui:arrow-outlined"}
          fontSize={24}
          className={classNames(
            "h-5 sm:h-6 transition-all duration-200",
            index === expandedSectionIndex ? "rotate-90" : ""
          )}
        />
      </button>
    </div>
  );

  const presence: { [key: string]: boolean } = {};

  OPTIONAL_FIELDS.forEach((key) => {
    const value = watch(key);

    presence[key] = !(value === null || value === undefined);

    evaluations?.forEach((evaluation, index) => {
      const value = evaluation[key as keyof typeof evaluation];

      presence[`evaluations[${index}].${key}`] = !(
        value === null || value === undefined
      );
    });
  });

  return (
    <>
      <div className="min-h-5 -mt-11 mb-6">
        {(jsonProcessedState.processed && !jsonProcessedState.valid) ||
        errorInput ? (
          <p className="text-red-500 text-sm max-w-[calc(100%-150px)]">
            {errorInput
              ? "Invalid JSON input detected. Changes won't be saved and applied. Please fix the errors to proceed."
              : "Invalid JSON detected. Please fix the errors to proceed."}
          </p>
        ) : null}
      </div>
      <RHFFormBuilder
        handleSubmit={handleSubmit(handleConfirm)}
        formControls={getEvaluationsFormDefinition({
          addEvaluationBtn,
          removeEvaluationBtn,
          evaluationsCount: evaluations?.length ?? 1,
          expandedSectionIndex,
          presence,
          setValue,
        })}
        control={control}
        errors={errors}
        submitButton={<></>}
      />
    </>
  );
};

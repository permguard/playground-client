import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RHFFormBuilder } from "@/components/shared/RHFFormBuilder/RHFFormBuilder";
import { getChecksJSONEditorFormDefinition } from "./checksJSONEditorFormDefinition";
import { ChecksJSONEditorFormPayload } from "./ChecksJSONEditorFormPayload";
import { RootState, useAppDispatch } from "@/store";
import { updateRequestJSONState } from "@/store/checks/middleware/updateRequestJSON";

export const ChecksJSONEditorForm = () => {
  const dispatch = useAppDispatch();

  // Response code is the state that is returned from the check API call
  const responseCode = useSelector((state: RootState) => state.checks.response);

  const [jsonProcessedState, setJsonProcessedState] = useState({
    processed: false,
    valid: true,
  });

  // Request JSON components
  const authorizationModelJSONCode = useSelector(
    (state: RootState) => state.ledger.jsonCode
  );
  const principalJSONCode = useSelector(
    (state: RootState) => state.principal.jsonCode
  );
  const entitiesJSONCode = useSelector(
    (state: RootState) => state.entities.jsonCode
  );
  const checksJSONCode = useSelector(
    (state: RootState) => state.checks.jsonCode
  );
  const serverJSONCode = useSelector(
    (state: RootState) => state.server.jsonCode
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ChecksJSONEditorFormPayload>({});

  const requestCode = watch("request");

  // Construct the request JSON object
  useEffect(() => {
    try {
      const authorizationModel = JSON.parse(authorizationModelJSONCode!);
      const principal = JSON.parse(principalJSONCode!);
      const entities = JSON.parse(entitiesJSONCode!);
      const checks = JSON.parse(checksJSONCode!);

      checks.subject.properties = JSON.parse(checks.subject.properties);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      checks.evaluations.forEach((evaluation) => {
        evaluation.resource.properties = JSON.parse(
          evaluation.resource.properties
        );
        evaluation.action.properties = JSON.parse(evaluation.action.properties);
      });

      const payload = {
        authorization_model: {
          ...authorizationModel,
          principal,
          entities,
        },
        ...checks,
      };

      const jsonRequest = JSON.stringify(payload, null, 2);
      setValue("request", jsonRequest);
      setJsonProcessedState({ valid: true, processed: true });
    } catch {
      setJsonProcessedState({ valid: false, processed: true });
    }
  }, [
    authorizationModelJSONCode,
    checksJSONCode,
    entitiesJSONCode,
    principalJSONCode,
    serverJSONCode,
    setValue,
  ]);

  useEffect(() => {
    if (responseCode) {
      const responseJSON = JSON.stringify(responseCode, null, 2);
      setValue("response", responseJSON);
    }
  }, [responseCode, setValue]);

  useEffect(() => {
    dispatch(updateRequestJSONState(requestCode));
  }, [requestCode, dispatch]);

  const handleConfirm = useCallback(async () => {}, []);

  return (
    <>
      <div className="h-5 mb-4">
        {jsonProcessedState.processed && !jsonProcessedState.valid ? (
          <p className="text-red-500 text-sm">
            Invalid JSON detected, please check the syntax.
          </p>
        ) : null}
      </div>
      <RHFFormBuilder
        handleSubmit={handleSubmit(handleConfirm)}
        formControls={getChecksJSONEditorFormDefinition()}
        control={control}
        errors={errors}
        submitButton={<></>}
      />
    </>
  );
};

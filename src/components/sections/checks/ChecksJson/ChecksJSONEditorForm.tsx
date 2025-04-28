import React, { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RHFFormBuilder } from "@/components/shared/RHFFormBuilder/RHFFormBuilder";
import { getChecksJSONEditorFormDefinition } from "./checksJSONEditorFormDefinition";
import { ChecksJSONEditorFormPayload } from "./ChecksJSONEditorFormPayload";
import { RootState } from "@/store";

export const ChecksJSONEditorForm = () => {
  // Response code is the state that is returned from the check API call
  const responseCode = useSelector((state: RootState) => state.checks.response);

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

  // Construct the request JSON object
  const jsonRequest = useMemo(() => {
    if (
      authorizationModelJSONCode &&
      principalJSONCode &&
      entitiesJSONCode &&
      checksJSONCode &&
      serverJSONCode
    ) {
      const authorizationModel = JSON.parse(authorizationModelJSONCode);
      const principal = JSON.parse(principalJSONCode);
      const entities = JSON.parse(entitiesJSONCode);
      const checks = JSON.parse(checksJSONCode);

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

      return JSON.stringify(payload, null, 2);
    } else {
      return undefined;
    }
  }, [
    authorizationModelJSONCode,
    checksJSONCode,
    entitiesJSONCode,
    principalJSONCode,
    serverJSONCode,
  ]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ChecksJSONEditorFormPayload>({});

  useEffect(() => {
    if (responseCode) {
      const responseJSON = JSON.stringify(responseCode, null, 2);
      setValue("response", responseJSON);
    }
  }, [responseCode, setValue]);

  useEffect(() => {
    if (jsonRequest) {
      setValue("request", jsonRequest);
    }
  }, [jsonRequest, setValue]);

  const handleConfirm = useCallback(async () => {}, []);

  return (
    <div>
      <RHFFormBuilder
        handleSubmit={handleSubmit(handleConfirm)}
        formControls={getChecksJSONEditorFormDefinition()}
        control={control}
        errors={errors}
        submitButton={<></>}
      />
    </div>
  );
};

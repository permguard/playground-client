import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RHFFormBuilder } from "@/components/shared/RHFFormBuilder/RHFFormBuilder";
import { getChecksRequestResponseFormDefinition } from "./checksRequestResponseFormDefinition";
import { ChecksRequestResponseFormPayload } from "./ChecksRequestResponseFormPayload";
import { RootState } from "@/store";

export const ChecksRequestResponseForm = () => {
  const [jsonProcessedState, setJsonProcessedState] = useState({
    processed: false,
    valid: true,
  });

  const responseCode = useSelector(
    (state: RootState) => state.evaluations.response
  );

  const authorizationModelJSON = useSelector(
    (state: RootState) => state.ledger.jsonCode
  );
  const principalJSON = useSelector(
    (state: RootState) => state.principal.jsonCode
  );
  const entitiesJSON = useSelector(
    (state: RootState) => state.entities.jsonCode
  );
  const evaluationsJSON = useSelector(
    (state: RootState) => state.evaluations.jsonCode
  );
  const serverJSON = useSelector((state: RootState) => state.server.jsonCode);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ChecksRequestResponseFormPayload>({});

  useEffect(() => {
    try {
      const authorizationModel = JSON.parse(authorizationModelJSON!);
      const principal = JSON.parse(principalJSON!);
      const entities = JSON.parse(entitiesJSON!);
      const evaluations = JSON.parse(evaluationsJSON!);
      const server = JSON.parse(serverJSON!);

      const payload = {
        authorization_model: {
          ...authorizationModel,
          principal,
          entities,
        },
        ...evaluations,
        ...server,
      };

      const requestCode = JSON.stringify(payload, null, 2);
      setValue("request", requestCode);

      setJsonProcessedState({ processed: true, valid: true });
    } catch {
      setJsonProcessedState({ processed: true, valid: false });
    }
  }, [
    authorizationModelJSON,
    entitiesJSON,
    evaluationsJSON,
    principalJSON,
    serverJSON,
    setValue,
  ]);

  useEffect(() => {
    if (responseCode) {
      const responseJSON = JSON.stringify(responseCode, null, 2);
      setValue("response", responseJSON);
    } else {
      setValue("response", "");
    }
  }, [responseCode, setValue]);

  const handleConfirm = useCallback(async () => {}, []);

  return (
    <div>
      <div className="h-5 mb-2">
        {jsonProcessedState.processed && !jsonProcessedState.valid ? (
          <p className="text-red-500 text-sm mb-4 ">
            {
              "Invalid JSON detected. Please verify the syntax and completion of previous tabs."
            }
          </p>
        ) : null}
      </div>
      <RHFFormBuilder
        handleSubmit={handleSubmit(handleConfirm)}
        formControls={getChecksRequestResponseFormDefinition()}
        control={control}
        errors={errors}
        submitButton={<></>}
      />
    </div>
  );
};

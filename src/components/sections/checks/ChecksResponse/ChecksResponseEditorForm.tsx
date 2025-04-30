import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RHFFormBuilder } from "@/components/shared/RHFFormBuilder/RHFFormBuilder";
import { getChecksResponseEditorFormDefinition } from "./checksResponseEditorFormDefinition";
import { ChecksResponseEditorFormPayload } from "./ChecksResponseEditorFormPayload";
import { RootState, useAppDispatch } from "@/store";
import { check } from "@/store/checks/middleware/check";
import { Icon } from "@iconify/react/dist/iconify.js";

export const ChecksResponseEditorForm = () => {
  const responseCode = useSelector((state: RootState) => state.checks.response);

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ChecksResponseEditorFormPayload>({});

  useEffect(() => {
    if (responseCode) {
      const responseJSON = JSON.stringify(responseCode, null, 2);
      setValue("response", responseJSON);
    }
  }, [responseCode, setValue]);

  const handleCheck = useCallback(async () => {
    dispatch(check());
  }, [dispatch]);

  const handleConfirm = useCallback(async () => {}, []);

  return (
    <div>
      <div className="flex justify-end sm:-mt-12">
        <button
          onClick={handleCheck}
          className="text-sm/6 flex items-center sm:w-auto xl:ml-0 whitespace-nowrap rounded-[22px] px-4 py-2.5 bg-fuchsia-500 leading-none font-medium text-white shadow-sm hover:bg-fuchsia-400 disabled:bg-fuchsia-500/25 disabled:text-white/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-500"
        >
          <Icon
            className="h-5 -my-2 w-auto mr-2"
            icon="ix:code-document-check"
          />
          <span>Check</span>
        </button>
      </div>
      <RHFFormBuilder
        handleSubmit={handleSubmit(handleConfirm)}
        formControls={getChecksResponseEditorFormDefinition()}
        control={control}
        errors={errors}
        submitButton={<></>}
      />
    </div>
  );
};

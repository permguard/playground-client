import "@/utils/hooks/monaco";
import Head from "next/head";
import { FormBackdrop } from "@/components/shared/RHFFormBuilder/FormBackdrop";
import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { ChecksRequestResponseForm } from "./ChecksRequestResponseForm/ChecksRequestResponseForm";
import CheckDialog from "./CheckDialog/CheckDialog";
import { check } from "@/store/evaluations/middleware/check";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCallback } from "react";

export const CheckPage = () => {
  const dispatch = useAppDispatch();

  const isLoading = useSelector(
    (state: RootState) => state.evaluations.isLoading
  );

  const handleCheck = useCallback(async () => {
    dispatch(check());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Permguard Playground | Check</title>
      </Head>

      <FormBackdrop isLoading={isLoading} />

      <div className="flex justify-end">
        <button
          onClick={handleCheck}
          className="text-sm/6 my-1.5 flex items-center sm:w-auto xl:ml-0 whitespace-nowrap rounded-[22px] px-4 py-2.5 bg-fuchsia-500 leading-none font-medium text-white shadow-sm hover:bg-fuchsia-400 disabled:bg-fuchsia-500/25 disabled:text-white/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-500"
        >
          <Icon
            className="h-5 -my-2 w-auto mr-2"
            icon="ix:code-document-check"
          />
          <span>Check</span>
        </button>
      </div>

      <div className="mt-3">
        <CheckDialog />
        <ChecksRequestResponseForm />
      </div>
    </>
  );
};

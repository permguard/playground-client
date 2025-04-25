import "@/utils/hooks/monaco";
import Head from "next/head";
import { ChecksForm } from "@/components/sections/checks/ChecksForm/ChecksForm";
import { Icon } from "@iconify/react/dist/iconify.js";
import { RootState, useAppDispatch } from "@/store";
import { useCallback } from "react";
import { check } from "@/store/checks/middleware/check";
import { FormBackdrop } from "@/components/shared/RHFFormBuilder/FormBackdrop";
import { useSelector } from "react-redux";
import CheckDialog from "./CheckDialog/CheckDialog";

export const ChecksPage = () => {
  const dispatch = useAppDispatch();

  const isLoading = useSelector((state: RootState) => state.checks.isLoading);

  const handleCheck = useCallback(async () => {
    dispatch(check());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Permguard Playground | Checkss</title>
      </Head>

      <FormBackdrop isLoading={isLoading} />
      <CheckDialog />

      <div className="flex flex-col">
        <button
          onClick={handleCheck}
          className="self-end ml-auto flex items-center sm:w-auto xl:ml-0 whitespace-nowrap rounded-[22px] px-4 py-2.5 bg-fuchsia-500 leading-none font-medium text-white shadow-sm hover:bg-fuchsia-400 disabled:bg-fuchsia-500/25 disabled:text-white/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-500"
        >
          <Icon
            className="h-5 -my-2 w-auto mr-2"
            icon="ix:code-document-check"
          />
          <span>Check</span>
        </button>
        <ChecksForm />
      </div>
    </>
  );
};

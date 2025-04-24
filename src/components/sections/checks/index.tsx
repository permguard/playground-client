import "@/utils/hooks/monaco";
import Head from "next/head";
import { ChecksForm } from "@/components/sections/checks/ChecksForm/ChecksForm";
import { useAppDispatch } from "@/store";
import { initChecksState } from "@/store/checks/middleware/initChecksState";
import { useEffect } from "react";

export const ChecksPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initChecksState());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Permguard Playground | Checkss</title>
      </Head>

      <div className="flex flex-col mt-15 sm:mt-19">
        <ChecksForm />
      </div>
    </>
  );
};

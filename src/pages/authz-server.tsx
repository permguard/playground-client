import "@/utils/hooks/monaco";
import Head from "next/head";
import { ServerForm } from "@/components/pages/server/ServerForm/ServerForm";
import { useAppDispatch } from "@/store";
import { initServerState } from "@/store/server/middleware/initServerState";
import { useEffect } from "react";

const ServerPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initServerState());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Permguard Playground | Servers</title>
      </Head>

      <div className="flex flex-col mt-15 sm:mt-19">
        <ServerForm />
      </div>
    </>
  );
};

export default ServerPage;

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

      <div className="flex flex-col my-20">
        <div className="max-w-[500px] mx-auto">
          <ServerForm />
        </div>
      </div>
    </>
  );
};

export default ServerPage;

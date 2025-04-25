import "@/utils/hooks/monaco";
import Head from "next/head";
import { ServerForm } from "@/components/sections/server/ServerForm/ServerForm";

export const ServerPage = () => {
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

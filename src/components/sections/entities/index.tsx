import "@/utils/hooks/monaco";
import Head from "next/head";
import { EntitiesJSONEditorForm } from "@/components/sections/entities/EntitiesJSONEditorForm/EntitiesJSONEditorForm";
export const EntitiesPage = () => {
  return (
    <>
      <Head>
        <title>Permguard Playground | Entities</title>
      </Head>

      <div className="flex flex-col">
        <div className="mt-3">
          <EntitiesJSONEditorForm />
        </div>
      </div>
    </>
  );
};

import "@/utils/hooks/monaco";
import Head from "next/head";
import { EntitiesJSONEditorForm } from "@/components/pages/entities/EntitiesJSONEditorForm/EntitiesJSONEditorForm";
import { useAppDispatch } from "@/store";
import { initEntitiesState } from "@/store/entities/middleware/initEntitiesState";
import { useEffect } from "react";

const EntitiesPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initEntitiesState());
  }, [dispatch]);

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

export default EntitiesPage;

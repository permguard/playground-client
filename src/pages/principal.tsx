import "@/utils/hooks/monaco";
import Head from "next/head";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import { PrincipalJSONEditorForm } from "@/components/pages/principal/PrincipalJSONEditorForm/PrincipalJSONEditorForm";
import { PrincipalForm } from "@/components/pages/principal/PrincipalForm/PrincipalForm";
import { useAppDispatch } from "@/store";
import { initPrincipalState } from "@/store/principal/middleware/initPrincipalState";
import { useEffect } from "react";

const PrincipalPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initPrincipalState());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Permguard Playground | Principals</title>
      </Head>

      <TabGroup className={"flex flex-col"}>
        <TabList className="flex gap-1 rounded-full bg-black/25 p-1 backdrop-blur-sm ml-auto">
          <Tab
            key="Form"
            className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-white/10 data-selected:data-hover:bg-white/10"
          >
            Form
          </Tab>
          <Tab
            key="json"
            className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-white/10 data-selected:data-hover:bg-white/10"
          >
            JSON
          </Tab>
        </TabList>
        <TabPanels className="mt-3">
          <TabPanel key={"form"}>
            <PrincipalForm />
          </TabPanel>
          <TabPanel key={"json"}>
            <PrincipalJSONEditorForm />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
};

export default PrincipalPage;

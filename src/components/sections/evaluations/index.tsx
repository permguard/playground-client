import "@/utils/hooks/monaco";
import Head from "next/head";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { FormBackdrop } from "@/components/shared/RHFFormBuilder/FormBackdrop";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { EvaluationsForm } from "./EvaluationsForm/EvaluationsForm";
import { EvaluationsJSONEditorForm } from "./EvaluationsJson/EvaluationsJSONEditorForm";

export const EvaluationsPage = () => {
  const isLoading = useSelector(
    (state: RootState) => state.evaluations.isLoading
  );

  return (
    <>
      <Head>
        <title>Permguard Playground | Evaluations</title>
      </Head>

      <FormBackdrop isLoading={isLoading} />

      <TabGroup className={"flex flex-col"}>
        <TabList className="flex gap-4 justify-end items center">
          <div className="flex gap-4">
            <div className="flex gap-1 rounded-full bg-black/25 p-1 backdrop-blur-sm">
              <Tab
                key="form"
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
            </div>
          </div>
        </TabList>
        <TabPanels className="mt-3">
          <TabPanel key={"form"}>
            <EvaluationsForm />
          </TabPanel>
          <TabPanel key={"json"}>
            <EvaluationsJSONEditorForm />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
};

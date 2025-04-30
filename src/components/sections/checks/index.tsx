import "@/utils/hooks/monaco";
import Head from "next/head";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ChecksRequest } from "./ChecksRequest";
import { ChecksResponseEditorForm } from "./ChecksResponse/ChecksResponseEditorForm";

export const ChecksPage = () => {
  return (
    <>
      <Head>
        <title>Permguard Playground | Checks</title>
      </Head>

      <TabGroup className={"flex flex-col"}>
        <TabList className="inline-flex mr-auto z-10 gap-4 justify-between items center">
          <div className="flex gap-4">
            <div className="flex gap-1">
              <Tab
                key="request"
                className="rounded-full px-3 py-1 text-sm/6 font-medium text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white  data-selected:text-fuchsia-500 "
              >
                Request
              </Tab>
              <Tab
                key="response"
                className="rounded-full px-3 py-1 text-sm/6 font-medium text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white  data-selected:text-fuchsia-500 "
              >
                Response
              </Tab>
            </div>
          </div>
        </TabList>
        <TabPanels className="mt-3">
          <TabPanel key={"form"}>
            <ChecksRequest />
          </TabPanel>
          <TabPanel key={"json"}>
            <ChecksResponseEditorForm />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
};

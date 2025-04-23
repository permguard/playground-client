import "@/utils/hooks/monaco";
import Head from "next/head";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import { LedgerJSONEditorForm } from "@/components/pages/ledger/LedgerJSONEditorForm/LedgerJSONEditorForm";

const LedgersPage = () => {
  return (
    <>
      <Head>
        <title>Permguard Playground | Ledgers</title>
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
          <TabPanel key={"form"}></TabPanel>
          <TabPanel key={"json"}>
            <LedgerJSONEditorForm />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
};

export default LedgersPage;

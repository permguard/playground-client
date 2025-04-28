import "@/utils/hooks/monaco";
import Head from "next/head";
import { ChecksForm } from "@/components/sections/checks/ChecksForm/ChecksForm";
import { Icon } from "@iconify/react/dist/iconify.js";
import { RootState, useAppDispatch } from "@/store";
import { useCallback } from "react";
import { check } from "@/store/checks/middleware/check";
import { FormBackdrop } from "@/components/shared/RHFFormBuilder/FormBackdrop";
import { useSelector } from "react-redux";
import CheckDialog from "./CheckDialog/CheckDialog";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ChecksJSONEditorForm } from "./ChecksJson/ChecksJSONEditorForm";

export const ChecksPage = () => {
  const dispatch = useAppDispatch();

  const isLoading = useSelector((state: RootState) => state.checks.isLoading);

  const handleCheck = useCallback(async () => {
    dispatch(check());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Permguard Playground | Checkss</title>
      </Head>

      <FormBackdrop isLoading={isLoading} />
      <CheckDialog />

      <TabGroup className={"flex flex-col"}>
        <div className="flex gap-4 ml-auto items-center">
          <button
            onClick={handleCheck}
            className="text-sm/6 flex items-center sm:w-auto xl:ml-0 whitespace-nowrap rounded-[22px] px-4 py-2.5 bg-fuchsia-500 leading-none font-medium text-white shadow-sm hover:bg-fuchsia-400 disabled:bg-fuchsia-500/25 disabled:text-white/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-500"
          >
            <Icon
              className="h-5 -my-2 w-auto mr-2"
              icon="ix:code-document-check"
            />
            <span>Check</span>
          </button>
          <TabList className="flex gap-1 rounded-full bg-black/25 p-1 backdrop-blur-sm">
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
        </div>
        <TabPanels className="mt-3">
          <TabPanel key={"form"}>
            <ChecksForm />
          </TabPanel>
          <TabPanel key={"json"}>
            <ChecksJSONEditorForm />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
};

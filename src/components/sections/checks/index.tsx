import "@/utils/hooks/monaco";
import Head from "next/head";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ChecksRequest } from "./ChecksRequest";
import { ChecksResponseEditorForm } from "./ChecksResponse/ChecksResponseEditorForm";
import { FormBackdrop } from "@/components/shared/RHFFormBuilder/FormBackdrop";
import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import CheckDialog from "./CheckDialog/CheckDialog";
import { Icon } from "@iconify/react/dist/iconify.js";
import { check } from "@/store/checks/middleware/check";
import { useCallback } from "react";

export const ChecksPage = () => {
  const dispatch = useAppDispatch();

  const isLoading = useSelector((state: RootState) => state.checks.isLoading);

  const handleCheck = useCallback(async () => {
    dispatch(check());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Permguard Playground | Checks</title>
      </Head>

      <FormBackdrop isLoading={isLoading} />
      <CheckDialog />

      <TabGroup className={"flex flex-col"}>
        <TabList className="flex flex-col sm:flex-row z-10 gap-6 sm:gap-4 sm:justify-between items-end sm:items-center">
          <div className="flex gap-1">
            <Tab
              key="request"
              className="rounded-full flex gap-2 px-3 py-1 text-sm/6 font-medium text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white  data-selected:text-fuchsia-500 "
            >
              <Icon icon="hugeicons:mail-send-01" fontSize={24} />
              <span>Request</span>
            </Tab>
            <Tab
              key="response"
              className="rounded-full flex gap-2 px-3 py-1 text-sm/6 font-medium text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white  data-selected:text-fuchsia-500 "
            >
              <Icon icon="hugeicons:mail-receive-01" fontSize={24} />
              <span>Response</span>
            </Tab>
          </div>

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
        </TabList>
        <TabPanels className="mt-6">
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

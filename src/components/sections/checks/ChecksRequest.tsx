import "@/utils/hooks/monaco";
import { ChecksForm } from "@/components/sections/checks/ChecksForm/ChecksForm";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppDispatch } from "@/store";
import { useCallback, useEffect } from "react";
import { check } from "@/store/checks/middleware/check";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ChecksJSONEditorForm } from "./ChecksJson/ChecksJSONEditorForm";
import { initChecksState } from "@/store/checks/middleware/initChecksState";

export const ChecksRequest = () => {
  const dispatch = useAppDispatch();

  const handleCheck = useCallback(async () => {
    dispatch(check());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initChecksState());
  }, [dispatch]);

  return (
    <>
      <TabGroup className={"flex flex-col sm:-mt-12"}>
        <TabList className="flex gap-4 justify-end items center">
          <div className="flex gap-4">
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

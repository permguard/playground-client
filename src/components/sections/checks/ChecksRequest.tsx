import "@/utils/hooks/monaco";
import { ChecksForm } from "@/components/sections/checks/ChecksForm/ChecksForm";
import { useAppDispatch } from "@/store";
import { useEffect } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ChecksJSONEditorForm } from "./ChecksJson/ChecksJSONEditorForm";
import { initChecksState } from "@/store/checks/middleware/initChecksState";

export const ChecksRequest = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initChecksState());
  }, [dispatch]);

  return (
    <>
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

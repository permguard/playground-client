import "@/utils/hooks/monaco";
import Head from "next/head";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import { RootState, useAppDispatch } from "@/store";
import { initLedgerState } from "@/store/ledger/middleware/initLedgerState";
import { useCallback, useEffect } from "react";
import {
  ArrowPathIcon,
  FingerPrintIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import { Icon } from "@iconify/react/dist/iconify.js";
import { LedgersPage } from "@/components/sections/ledger";
import { PrincipalPage } from "@/components/sections/principal";
import { EntitiesPage } from "@/components/sections/entities";
import { ChecksPage } from "@/components/sections/checks";
import { ServerPage } from "@/components/sections/server";
import { Autocomplete } from "@/components/shared/Autocomplete";
import { reset } from "@/store/ledger/middleware/reset";
import { EXAMPLES } from "@/utils/examples/examples";
import { useSelector } from "react-redux";
import { Card } from "@/components/shared/Card";

const tabs = [
  {
    name: "Ledger",
    icon: () => (
      <Icon className="mr-2" icon={"hugeicons:ice-cubes"} fontSize={24} />
    ),
    page: LedgersPage,
  },
  {
    name: "Principal",
    href: "/principal",
    icon: FingerPrintIcon,
    page: PrincipalPage,
  },
  {
    name: "Entities",
    icon: () => (
      <Icon className="mr-2" icon={"ic:baseline-data-object"} fontSize={24} />
    ),
    page: EntitiesPage,
  },
  {
    name: "AuthZ Checks",
    icon: () => (
      <Icon className="mr-2" icon={"hugeicons:auction"} fontSize={24} />
    ),
    page: ChecksPage,
  },
  {
    name: "AuthZ Server",
    icon: ServerIcon,
    page: ServerPage,
  },
];

const Page = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initLedgerState());
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  const selectedExample = useSelector(
    (state: RootState) => state.ledger.selectedExample
  );

  return (
    <>
      <Head>
        <title>Permguard Playground | Ledgers</title>
      </Head>
      <main className="w-full mx-auto px-6 sm:px-10 md:px-14 mt-6 mb-12 lg:my-12">
        <Card className={"mt-6 lg:mt-12"}>
          <div className="overflow-hidden">
            <TabGroup>
              <div
                className={
                  "flex flex-col-reverse items-start xl:flex-row justify-between xl:items-center mb-3 gap-3 sm:mb-6 sm:gap-6"
                }
              >
                <TabList
                  className={
                    "-mb-px flex space-x-8 w-full xl:w-auto overflow-x-auto no-scrollbar"
                  }
                >
                  {tabs.map((tab) => (
                    <Tab
                      key={tab.name}
                      className={
                        "group inline-flex items-center px-1 py-4 text-sm font-medium whitespace-nowrap z-30 text-white/75 hover:text-white/90 data-selected:text-fuchsia-600 data-selected:data-hover:text-fuchsia-600"
                      }
                    >
                      <tab.icon
                        aria-hidden="true"
                        className={"-ml-0.5 mr-2 size-5"}
                      />
                      <span>{tab.name}</span>
                    </Tab>
                  ))}
                </TabList>

                <div className="flex gap-6 flex-wrap-reverse items-center justify-start w-full xl:w-auto">
                  <Autocomplete
                    value={selectedExample}
                    options={EXAMPLES.map((el) => ({
                      label: el.name,
                      value: el.name,
                    }))}
                    onChange={() => {}}
                  />
                  <button
                    onClick={handleReset}
                    type="button"
                    className="flex items-center sm:w-auto xl:ml-0 whitespace-nowrap rounded-[22px] px-7 py-2.5 sm:py-2 bg-fuchsia-500 leading-none font-medium text-white shadow-sm hover:bg-fuchsia-400 disabled:bg-fuchsia-500/25 disabled:text-white/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-500"
                  >
                    <ArrowPathIcon
                      fontSize={24}
                      fill="#FFF"
                      className="min-w-5 mr-2 -ml-3"
                    />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
              <TabPanels className="mt-3">
                {tabs.map((tab) => (
                  <TabPanel key={tab.name}>
                    <tab.page />
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>
          </div>
        </Card>
      </main>
    </>
  );
};

export default Page;

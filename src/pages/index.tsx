import "@/utils/hooks/monaco";
import Head from "next/head";
import { LedgerForm } from "@/components/pages/ledger/SchemaForm/LedgerForm";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { classNames } from "@/utils/classNames";

import("@cedar-policy/cedar-wasm").then((mod) => {
  console.log(mod.schemaToJson(``));
});

const LedgersPage = () => {
  const selectedTab = useSelector(
    (state: RootState) => state.ledger.selectedTab
  );

  return (
    <>
      <Head>
        <title>Permguard Playground | Ledgers</title>
      </Head>

      <div
        className={
          "flex flex-col sm:flex-row items-start justify-start sm:items-center sm:justify-between mb-6 gap-6"
        }
      >
        <p className="text-sm">
          Cedar schema allows you to define the structure and data types that
          form the backbone of your authorization policies.
        </p>
        <div className="flex gap-1 rounded-full bg-black/25 p-1 backdrop-blur-sm">
          <button
            className={classNames(
              "rounded-full py-1 px-2 text-sm font-medium text-white hover:bg-white/5",
              selectedTab === "cedar" ? "bg-white/10" : null
            )}
          >
            Cedar
          </button>
          <button
            className={classNames(
              "rounded-full py-1 px-2 text-sm font-medium text-white hover:bg-white/5",
              selectedTab === "json" ? "bg-white/10" : null
            )}
          >
            JSON
          </button>
        </div>
      </div>
      <LedgerForm />
    </>
  );
};

export default LedgersPage;

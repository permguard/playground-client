import "@/utils/hooks/monaco";
import Head from "next/head";
import { LedgerForm } from "@/components/pages/ledger/SchemaForm/LedgerForm";

const LedgersPage = () => {
  return (
    <>
      <Head>
        <title>Permguard Playground | Ledgers</title>
      </Head>
      <LedgerForm />
    </>
  );
};

export default LedgersPage;

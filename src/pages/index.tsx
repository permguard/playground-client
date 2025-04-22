import { LedgerForm } from "@/components/pages/ledger/SchemaForm/LedgerForm";
import Head from "next/head";

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

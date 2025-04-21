import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header/Header";
import { classNames } from "@/utils/classNames";
import "@/styles/globals.css";
import { TabNavigation } from "@/components/TabNavigation";
import { Card } from "@/components/shared/Card";
import { Autocomplete } from "@/components/shared/Autocomplete";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const HARDCODED_OPTIONS = [
  { label: "SimpleTodo", value: "simple-todo" },
  { label: "SecureDocs", value: "secure-docs" },
];

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="wrapper">
      <div
        className={classNames(
          "max-w-[1440px] relative mx-auto",
          interSans.className
        )}
      >
        <Header />
        <main className="w-full mx-auto px-6 sm:px-10 md:px-14 mt-6 mb-12 lg:mt-12 lg:mb-24">
          <div className="flex justify-end">
            <Autocomplete
              value={HARDCODED_OPTIONS[0].value}
              options={HARDCODED_OPTIONS}
              onChange={() => {}}
            />
          </div>

          <Card className={"mt-6 lg:mt-12"}>
            <TabNavigation />
            <Component {...pageProps} />
          </Card>
        </main>

        <Footer />
      </div>
    </div>
  );
}

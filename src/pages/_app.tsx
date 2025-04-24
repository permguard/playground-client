import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header/Header";
import { classNames } from "@/utils/classNames";
import "@/styles/globals.css";
import { TabNavigation } from "@/components/TabNavigation";
import { Card } from "@/components/shared/Card";
import { Provider } from "react-redux";
import { store } from "@/store";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="wrapper">
        <div
          className={classNames(
            "max-w-[1440px] relative mx-auto min-h-screen flex flex-col",
            interSans.className
          )}
        >
          <Header />
          <main className="w-full mx-auto px-6 sm:px-10 md:px-14 mt-6 mb-12 lg:my-12">
            <Card className={"mt-6 lg:mt-12"}>
              <div className="overflow-hidden">
                <TabNavigation />
                <Component {...pageProps} />
              </div>
            </Card>
          </main>

          <Footer small />
        </div>
      </div>
    </Provider>
  );
}

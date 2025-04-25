import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header/Header";
import { classNames } from "@/utils/classNames";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import { NotificationBar } from "@/components/shared/Notification";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NotificationBar />
      <div className="wrapper">
        <div
          className={classNames(
            "max-w-[1440px] relative mx-auto min-h-screen flex flex-col",
            interSans.className
          )}
        >
          <Header />

          <Component {...pageProps} />

          <Footer small />
        </div>
      </div>
    </Provider>
  );
}

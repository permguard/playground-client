import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header/Header";
import { classNames } from "@/utils/classNames";
import "@/styles/globals.css";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

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
        <main className="w-full mx-auto px-6 sm:px-10 md:px-14">
          <Component {...pageProps} />
        </main>

        <Footer />
      </div>
    </div>
  );
}

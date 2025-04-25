import Link from "next/link";
import { SocialLinks } from "./SocialLinks";
import { MobileMenu } from "./MobileMenu";
import { classNames } from "@/utils/classNames";
import { VersionSelector } from "../VersionSelector";
// import { Navigation } from "./Navigation/Navigation";

export const Header = () => {
  return (
    <header
      className={classNames(
        "sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between px-6 py-5 transition sm:px-10 md:px-14 shadow-none"
      )}
    >
      <div
        className={classNames(
          "absolute left-[calc((100%-100vw)/2)] -z-10 h-20 w-screen shadow-slate-900/5 !bg-[rgba(255,255,255,0.02)] backdrop-blur-xs"
        )}
      />

      {/* Logo */}
      <Link href="/" className="z-[500]">
        <img
          className="h-auto z-150"
          src="/images/header_logo.svg"
          alt="Permguard Playground"
        />
      </Link>

      {/* <Navigation /> */}

      <div className="flex flex-row gap-4 justify-between items-center">
        <div className="relative basis-0 items-center justify-end gap-4 min-[390px]:gap-6 sm:gap-8 lg:flex-grow flex">
          <VersionSelector />
          <div className="hidden md:flex relative basis-0 items-center justify-end gap-6 md:gap-5 lg:gap-6">
            <SocialLinks />
          </div>
        </div>
        <MobileMenu />
      </div>
    </header>
  );
};

import { classNames } from "@/utils/classNames";
import { useState, useCallback } from "react";
import { SocialLinks } from "./SocialLinks";
import Portal from "../shared/Portal";
import Link from "next/link";
import { NAVIGATION } from "./Navigation/Navigation";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export const MobileMenu = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpened((oldState) => !oldState);
  }, []);

  return (
    <>
      <button
        onClick={toggleMenu}
        aria-label="Menu"
        className="flex md:hidden flex-col gap-1 z-[500] cursor-pointer"
      >
        <div className={"w-5 h-0.5 bg-white transition"} />
        <div className={"w-5 h-0.5 bg-white transition"} />
        <div className={"w-5 h-0.5 bg-white transition"} />
      </button>

      {/* Menu opened */}
      <Portal>
        <div
          onClick={toggleMenu}
          className={classNames(
            "flex md:hidden fixed h-screen left-0 right-0 top-0 overflow-hidden bg-[rgba(23,24,28,0.5)] backdrop-blur-xs z-[1000]",
            isMenuOpened ? "opacity-100 visible" : "opacity-0 invisible"
          )}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="ml-auto relative flex flex-col w-[50%] min-w-[min(315px,100%)] bg-[#17181C] border-l border-[#343a40]"
          >
            <div className="px-4 pr-6 py-5 border-b border-[#343a40] flex justify-between">
              <h1 className="text-[20px] leading-[30px] font-bold">
                permguard
              </h1>
              <button
                className="z-10"
                onClick={toggleMenu}
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="#94a3b8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M18 6 6 18"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <div className="flex flex-col p-4 h-full">
              <div className="space-y-2 py-6 pl-2">
                {NAVIGATION.map((el) => {
                  if (el.sublinks) {
                    return (
                      <Disclosure key={el.href} as="div" className="-mx-3">
                        <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-white hover:bg-zinc-800">
                          {el.name}
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="size-5 flex-none group-data-[open]:rotate-180"
                          />
                        </DisclosureButton>
                        <DisclosurePanel className="mt-2 space-y-2">
                          {el.sublinks.map((item) => (
                            <DisclosureButton
                              key={item.name}
                              as="a"
                              href={item.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-white hover:bg-zinc-800"
                            >
                              {item.name}
                            </DisclosureButton>
                          ))}
                        </DisclosurePanel>
                      </Disclosure>
                    );
                  }

                  return (
                    <Link
                      key={el.href}
                      href={el.href!}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-zinc-800"
                    >
                      {el.name}
                    </Link>
                  );
                })}
              </div>

              <div className="flex gap-6 justify-center p-6 mt-auto">
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </Portal>
    </>
  );
};

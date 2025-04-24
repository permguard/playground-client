import { classNames } from "@/utils/classNames";
import {
  ArrowPathIcon,
  FingerPrintIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { Autocomplete } from "./shared/Autocomplete";
import { EXAMPLES } from "@/utils/examples/examples";
import { RootState, useAppDispatch } from "@/store";
import { useCallback } from "react";
import { reset } from "@/store/ledger/middleware/reset";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";

const tabs = [
  {
    name: "Ledger",
    href: "/",
    icon: () => (
      <Icon className="mr-2" icon={"hugeicons:ice-cubes"} fontSize={24} />
    ),
  },
  { name: "Principal", href: "/principal", icon: FingerPrintIcon },
  {
    name: "Entities",
    href: "/entities",
    icon: () => (
      <Icon className="mr-2" icon={"ic:baseline-data-object"} fontSize={24} />
    ),
  },
  {
    name: "AuthZ Checks",
    href: "/authz-checks",
    icon: () => (
      <Icon className="mr-2" icon={"hugeicons:auction"} fontSize={24} />
    ),
  },
  {
    name: "AuthZ Server",
    href: "/authz-server",
    icon: ServerIcon,
  },
];

export function TabNavigation() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleReset = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  const selectedExample = useSelector(
    (state: RootState) => state.ledger.selectedExample
  );

  return (
    <div className="flex flex-col-reverse items-start xl:flex-row justify-between xl:items-center mb-3 gap-3 sm:mb-6 sm:gap-6">
      <nav
        aria-label="Tabs"
        className="-mb-px flex space-x-8 w-full xl:w-auto overflow-x-auto no-scrollbar"
      >
        {tabs.map((tab) => (
          <a
            key={tab.name}
            href={tab.href}
            aria-current={router.asPath === tab.href ? "page" : undefined}
            className={classNames(
              router.asPath === tab.href
                ? "text-fuchsia-600"
                : "text-white/75 hover:text-white/90",
              "group inline-flex items-center px-1 py-4 text-sm font-medium whitespace-nowrap z-30"
            )}
          >
            <tab.icon
              aria-hidden="true"
              className={classNames(
                router.asPath === tab.href
                  ? "text-fuchsia-500"
                  : "text-zinc-400 group-hover:text-white/75",
                "-ml-0.5 mr-2 size-5"
              )}
            />
            <span>{tab.name}</span>
          </a>
        ))}
      </nav>

      <div className="flex gap-6 flex-wrap-reverse items-center justify-start w-full xl:w-auto">
        <Autocomplete
          value={selectedExample}
          options={EXAMPLES.map((el) => ({ label: el.name, value: el.name }))}
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
  );
}

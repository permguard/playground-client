import { classNames } from "@/utils/classNames";
import {
  DocumentTextIcon,
  ShieldCheckIcon,
  UsersIcon,
  LockClosedIcon,
  ServerIcon,
  ArrowPathIcon,
} from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { Autocomplete } from "./shared/Autocomplete";

const tabs = [
  { name: "Ledger", href: "/", icon: DocumentTextIcon },
  { name: "Policies", href: "/policies", icon: ShieldCheckIcon },
  { name: "Entities", href: "/entities", icon: UsersIcon },
  { name: "AuthZ Checks", href: "/authz-checks", icon: LockClosedIcon },
  { name: "AuthZ Server", href: "/authz-server", icon: ServerIcon },
];

const HARDCODED_OPTIONS = [
  { label: "SimpleTodo", value: "simple-todo" },
  { label: "SecureDocs", value: "secure-docs" },
];

export function TabNavigation() {
  const router = useRouter();

  return (
    <div className="flex flex-col-reverse items-start xl:flex-row justify-between gap-6 xl:items-center overflow-hidden mb-6">
      <nav
        aria-label="Tabs"
        className="-mb-px flex space-x-8 overflow-x-auto no-scrollbar w-full xl:w-auto"
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

      <div className="flex gap-6 items-center justify-start overflow-x-auto no-scrollbar w-full xl:w-auto">
        <Autocomplete
          value={HARDCODED_OPTIONS[0].value}
          options={HARDCODED_OPTIONS}
          onChange={() => {}}
        />
        <button
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

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { ComponentType, SVGProps } from "react";

export interface NavigationSublink {
  name: string;
  href: string;
  description?: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

interface INavLinkProps {
  name: string;
  href?: string;
  sublinks?: NavigationSublink[];
}

export const NavLink: React.FC<INavLinkProps> = ({ name, href, sublinks }) => {
  return (
    <Popover as="li" className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm/6 font-semibold text-white outline-none">
        {href ? (
          <Link title={name} href={href}>
            {name}
          </Link>
        ) : (
          <span>{name}</span>
        )}
        {sublinks ? (
          <ChevronDownIcon aria-hidden="true" className="size-5" />
        ) : null}
      </PopoverButton>

      {sublinks ? (
        <PopoverPanel
          as="nav"
          transition
          className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="w-screen max-w-[529px] flex-auto overflow-hidden rounded-3xl bg-[#1e1f23] text-sm/6 shadow-lg ring-1 ring-zinc-900/5">
            <ul className="p-4 grid grid-cols-2">
              {sublinks?.map((item) => (
                <li
                  key={item.name}
                  className="group relative flex gap-x-6 rounded-lg p-4 px-2 hover:bg-zinc-900/50"
                >
                  <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-zinc-800 group-hover:bg-zinc-800">
                    <item.icon
                      aria-hidden="true"
                      className="size-6 text-zinc-400 group-hover:text-white"
                    />
                  </div>
                  <div>
                    <Link
                      title={item.name}
                      href={item.href}
                      className="font-semibold text-white"
                    >
                      {item.name}
                      <span className="absolute inset-0" />
                    </Link>
                    <p className="mt-1 text-zinc-400">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </PopoverPanel>
      ) : null}
    </Popover>
  );
};

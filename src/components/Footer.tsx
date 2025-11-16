import { EnvelopeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";

interface IFooterProps {
  small?: boolean;
}

export const Footer: React.FC<IFooterProps> = ({ small }) => {
  return (
    <footer className="flex flex-col w-full mt-auto p-6 pt-0 sm:pt-6 sm:px-10 md:px-14 md:pb-16">
      {small ? null : (
        <nav className="grid grid-cols-1 lg:grid-cols-8">
          {/* Logo and Email Section */}
          <div className="ml-[13px] lg:ml-0 col-span-1 lg:col-span-3 xl:col-span-2 mb-6 lg:mb-0 mr-24">
            <Link
              className="flex items-center text-white text-[16px] font-medium"
              href="/"
            >
              <img
                src="/images/footer_logo.svg"
                alt="Permguard logo"
                className="mr-1 w-6"
              />
              <span className="font-[Montserrat]">Permguard</span>
            </Link>
            <div className="flex items-center mt-6">
              <div>
                <EnvelopeIcon width={25} />
              </div>
              <Link
                href="mailto:opensource@permguard.com"
                className="text-white ml-3 text-sm font-medium"
              >
                opensource@permguard.com
              </Link>
            </div>
          </div>

          {/* Links */}
          <div className="col-span-1 lg:col-span-5 xl:col-span-6 grid grid-cols-1 sm:grid-cols-8 gap-5 sm:gap-6 flex-1">
            {/* Overview Section */}
            <nav className="col-span-6 sm:col-span-4 lg:col-span-2">
              <h3 id="nav0" className="text-white text-sm m-0 font-bold">
                Overview
              </h3>
              <ul className="flex flex-col gap-3 mt-6">
                <li>
                  <Link
                    className="text-sm text-[#A1A1AA] font-medium"
                    href="/docs/0.0.x/getting-started/permguard-paradigm/"
                  >
                    Permguard Paradigm
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-[#A1A1AA] font-medium"
                    href="/docs/0.0.x/getting-started/why-permguard/"
                  >
                    Why Permguard
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-[#A1A1AA] font-medium"
                    href="/docs/0.0.x/concepts/authn-authz/authn-vs-authz/"
                  >
                    concepts
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-[#A1A1AA] font-medium"
                    href="/docs/0.0.x/concepts/patterns/cloud-native-patterns/"
                  >
                    Cloud Native Patterns
                  </Link>
                </li>
              </ul>
            </nav>

            {/* CodeOps Section */}
            <nav id="nav1" className="col-span-6 sm:col-span-4 lg:col-span-2">
              <h3 className="text-white text-sm m-0 font-bold">CodeOps</h3>
              <ul className="flex flex-col gap-3 mt-6">
                <li>
                  <Link
                    className="text-sm text-[#A1A1AA] font-medium"
                    href="/docs/0.0.x/code-ops/initializing-the-workspace/"
                  >
                    Initializing the Workspace
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-[#A1A1AA] font-medium"
                    href="/docs/0.0.x/command-line/how-to-use/"
                  >
                    Permguard CLI
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-[#A1A1AA] font-medium"
                    href="/docs/0.0.x/policy-as-code/policy-languages/"
                  >
                    Policy as Code
                  </Link>
                </li>
              </ul>
            </nav>

            {/* DevOps Section */}
            <nav id="nav2" className="col-span-6 sm:col-span-4 lg:col-span-2">
              <h3 className="text-white text-sm m-0 font-bold">DevOps</h3>
              <ul className="flex flex-col gap-3 mt-6">
                <li>
                  <Link
                    className="text-sm text-[#A1A1AA] font-medium"
                    href="/docs/0.0.x/devops/environments/"
                  >
                    Environments
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-[#A1A1AA] font-medium"
                    href="/docs/0.0.x/devops/authz-server/authorization-server/"
                  >
                    AuthZServer
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Useful Links Section */}
            <nav id="nav3" className="col-span-6 sm:col-span-4 lg:col-span-2">
              <h3 className="text-white text-sm m-0 font-bold">Useful Links</h3>
              <ul className="flex flex-col gap-3 mt-6">
                <li>
                  <Link
                    className="text-sm text-[#A1A1AA] font-medium"
                    href="/docs/0.0.x/getting-started/features-licensing/"
                  >
                    License
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-[#A1A1AA] font-medium"
                    href="/blog/"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </nav>
      )}

      {/* Legal Notice */}
      <div className="flex flex-col md:flex-row justify-between gap-2 mt-10 lg:mt-8">
        <p className="text-white text-sm font-medium mb-0">
          © {new Date().getFullYear()}, Nitro Agility Srl. All rights reserved.
        </p>
        <p className="text-white text-sm font-medium mb-0 mt-4 md:mt-0">
          Brought to you by{" "}
          <Link
            target="_blank"
            href="https://www.nitroagility.com/"
            rel="noreferrer"
          >
            Nitro Agility S.r.l.
          </Link>
        </p>
      </div>
    </footer>
  );
};

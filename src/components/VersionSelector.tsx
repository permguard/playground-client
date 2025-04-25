import { useVersion, VERSIONS } from "@/utils/hooks/useVersion";
import { useState, useEffect, useRef } from "react";

export const VersionSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  const { currentVersion, isLatest, switchVersion } = useVersion();

  // Close selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={selectorRef}>
      {/* Selector Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-md py-2 text-sm font-medium
          !outline-none transition-colors duration-200 focus:outline-none
          text-zinc-200"
      >
        <span>{currentVersion}</span>
        {isLatest && (
          <span
            className="inline-flex items-center rounded-full px-2 py-0.5 text-xs
            font-medium bg-fuchsia-900 text-white"
          >
            Latest
          </span>
        )}
        <svg
          className={`h-4 w-4 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Selector Menu */}
      {isOpen && (
        <div
          className="animate-in fade-in zoom-in-95 absolute right-0 z-10 mt-2 w-48 rounded-md border
          shadow-lg duration-200 border-zinc-700 bg-zinc-800"
        >
          <div className="py-1">
            {VERSIONS.map((version) => (
              <button
                key={version}
                onClick={() => {
                  switchVersion(version);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm
                  ${
                    version === currentVersion
                      ? "font-medium bg-fuchsia-600 text-white"
                      : "text-zinc-200 hover:bg-zinc-700"
                  }`}
              >
                <span>{version}</span>
                {version === currentVersion && (
                  <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import React from "react";
import { toast, ToastBar, Toaster } from "react-hot-toast";
import { classNames } from "@/utils/classNames";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

export const NotificationBar = () => {
  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
        }}
      >
        {(t) => (
          <ToastBar
            toast={t}
            style={{ padding: 0, boxShadow: "none", background: "transparent" }}
          >
            {() => (
              <div className="flex w-full max-w-xs items-center rounded-lg p-4 shadow bg-gray-800 text-gray-400">
                <div
                  className={classNames(
                    "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    t.type === "error" ? "bg-red-500 text-red-200" : null,
                    t.type === "success"
                      ? "bg-fuchsia-500 text-fuchsia-200"
                      : null
                  )}
                >
                  {t.type === "success" && <CheckIcon width={20} />}
                  {t.type === "error" && <XMarkIcon width={25} />}
                </div>
                <div className="ml-3 text-sm font-normal text-white">
                  {t.message as string}
                </div>
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                  }}
                  type="button"
                  className="-m-1.5 ml-auto inline-flex h-8 w-8 rounded-lg p-1.5 focus:ring-2 focus:ring-gray-300 bg-gray-800 hover:bg-gray-700 hover:text-white text-white"
                >
                  <XMarkIcon width={"100%"} />
                </button>
              </div>
            )}
          </ToastBar>
        )}
      </Toaster>
    </>
  );
};

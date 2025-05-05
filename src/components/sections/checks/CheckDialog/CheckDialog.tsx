"use client";

import { useCallback } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { closeModal } from "@/store/evaluations/evaluationsSlice";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function CheckDialog() {
  const dispatch = useAppDispatch();

  const response = useSelector(
    (state: RootState) => state.evaluations.response
  );
  const isModalOpen = useSelector(
    (state: RootState) => state.evaluations.isModalOpen
  );

  const handleClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return (
    <Dialog open={isModalOpen} onClose={handleClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-zinc-800/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-zinc-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-zinc-500/25 juce">
                {response?.decision ? (
                  <Icon
                    icon="iconamoon:check-bold"
                    className="h-8 w-auto text-green-500"
                  />
                ) : (
                  <Icon
                    icon="ep:close-bold"
                    className="h-7 w-auto text-red-500"
                  />
                )}
              </div>
              <div className="mt-3 sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-base text-center font-semibold text-white"
                >
                  Decision: {response?.decision ? "Allowed" : "Denied"}
                </DialogTitle>
                <div className="my-4 flex flex-col gap-2 text-start">
                  <p className="text-sm text-gray-400">
                    <span className="font-bold text-gray-300">
                      Reason admin:
                    </span>{" "}
                    {response?.response.Context?.ReasonAdmin?.Message}
                  </p>
                  <p className="text-sm text-gray-400">
                    <span className="font-bold text-gray-300">
                      Reason user:
                    </span>{" "}
                    {response?.response.Context?.ReasonUser?.Message}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex w-full justify-center rounded-md bg-fuchsia-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-fuchsia-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

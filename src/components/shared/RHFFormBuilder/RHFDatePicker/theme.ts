import { IFieldError } from "../utils";

export const getDatePickerTheme = (error: IFieldError) => {
  return {
    root: {
      base: "relative",
      input: {
        field: {
          input: {
            colors: {
              gray: `focus:border-fuchsia-500 bg-zinc-800 text-white placeholder-gray-400 focus:border-fuchsia-500 ${
                error !== undefined ? "border-red-500" : "border-zinc-700"
              }`,
            },
          },
        },
      },
    },
    popup: {
      root: {
        inner: "inline-block rounded-lg bg-white p-4 shadow-lg bg-zinc-800",
      },
      header: {
        selectors: {
          button: {
            base: "rounded-lg px-5 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-fuchsia-500 bg-gray-700 text-white hover:bg-gray-600",
          },
        },
      },
      view: {
        base: "p-1",
      },
      footer: {
        base: "mt-2 flex space-x-2",
        button: {
          base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-2 focus:ring-fuchsia-500",
          today: "text-white bg-fuchsia-500 hover:bg-fuchsia-600",
          clear:
            "border border-gray-600 bg-gray-700 text-white hover:bg-gray-600",
        },
      },
    },
    views: {
      days: {
        items: {
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-white hover:bg-fuchsia-600",
            selected: "bg-fuchsia-500 text-white hover:bg-fuchsia-600",
          },
        },
      },
      months: {
        items: {
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-white hover:bg-fuchsia-600",
            selected: "bg-fuchsia-500 text-white hover:bg-fuchsia-600",
          },
        },
      },
      years: {
        items: {
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-white hover:bg-fuchsia-600",
            selected: "bg-fuchsia-500 text-white hover:bg-fuchsia-600",
          },
        },
      },
      decades: {
        items: {
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-white hover:bg-fuchsia-600",
            selected: "bg-fuchsia-500 text-white hover:bg-fuchsia-600",
          },
        },
      },
    },
  };
};

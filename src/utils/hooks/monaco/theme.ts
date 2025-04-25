import { loader } from "@monaco-editor/react";

if (typeof window !== "undefined") {
  loader.init().then((monaco) => {
    monaco.editor.defineTheme("vs", {
      base: "vs",
      inherit: true,
      colors: {
        "editor.background": "#FAFAFA",
        "editor.foreground": "#333333",
      },
      rules: [
        {
          token: "keyword",
          foreground: "005cc5",
          fontStyle: "bold",
        },
        {
          token: "variable",
          foreground: "22863a",
        },
        {
          token: "class-name",
          foreground: "d73a49",
          fontStyle: "italic",
        },
        {
          token: "string",
          foreground: "032f62",
        },
        {
          token: "operator",
          foreground: "6a737d",
        },
        {
          token: "number",
          foreground: "b31d28",
        },
        {
          token: "comment",
          foreground: "6a737d",
          fontStyle: "italic",
        },
      ],
    });

    monaco.editor.defineTheme("vs-dark", {
      base: "vs-dark",
      inherit: true,
      colors: {
        "editor.background": "#1E1E1E",
        "editor.foreground": "#D4D4D4",
      },
      rules: [
        {
          token: "keyword",
          foreground: "c586c0",
          fontStyle: "bold",
        },
        {
          token: "variable",
          foreground: "9cdcfe",
        },
        {
          token: "class-name",
          foreground: "4ec9b0",
          fontStyle: "italic",
        },
        {
          token: "string",
          foreground: "ce9178",
        },
        {
          token: "operator",
          foreground: "d4d4d4",
        },
        {
          token: "number",
          foreground: "b5cea8",
        },
        {
          token: "comment",
          foreground: "608b4e",
          fontStyle: "italic",
        },
      ],
    });
  });
}

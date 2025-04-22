import { loader } from "@monaco-editor/react";

if (typeof window !== "undefined") {
  loader.init().then((monaco) => {
    monaco.languages.register({ id: "cedar-schema" });

    monaco.languages.setMonarchTokensProvider("cedar-schema", {
      tokenizer: {
        root: [
          [/@\w+\((\".*?\"|[^"]*?)\)/, "annotation"],
          [/\b__cedar::\b/, "class-name"],
          [/\/\/.*$/, "comment"],
          [/^"([^"\\]|\\.)*$/, "string"],
          [
            /"/,
            {
              token: "string.quote",
              next: "@string",
            },
          ],
          [
            /\b(?:namespace|type|entity|action|tags|Record|Extension)\b/,
            "keyword",
          ],
          [/\b(?:principal|resource|context)\b/, "variable"],
          [/\b(?:false|true)\b/, "boolean"],
          [/\b0|[-]?[1-9](_?[0-9])*/, "number"],
          [/(in|=)/, "operator"],
          [/[\(\)\[\]\{\},;]/, "punctuation"],
        ],
        string: [
          [/[^"\\]+/, "string"],
          [/\\./, "string.escape"],
          [
            /"/,
            {
              token: "string.quote",
              next: "@pop",
            },
          ],
        ],
      },
    });

    monaco.languages.setLanguageConfiguration("cedar-schema", {
      autoClosingPairs: [
        {
          open: "{",
          close: "}",
        },
        {
          open: "[",
          close: "]",
        },
        {
          open: "(",
          close: ")",
        },
        {
          open: '"',
          close: '"',
        },
      ],
      surroundingPairs: [
        {
          open: "{",
          close: "}",
        },
        {
          open: "[",
          close: "]",
        },
        {
          open: "(",
          close: ")",
        },
        {
          open: '"',
          close: '"',
        },
      ],
      brackets: [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"],
      ],
      onEnterRules: [
        {
          beforeText:
            /^\s(?:namespace|type|entity|action|principal|resource|context).?\s\{[^}]$/,
          action: {
            indentAction: monaco.languages.IndentAction.Indent,
          },
        },
        {
          beforeText: /^\s}/,
          action: {
            indentAction: monaco.languages.IndentAction.Outdent,
            removeText: 1,
          },
        },
        {
          beforeText: /^\s}/,
          afterText: /^$/,
          action: {
            indentAction: monaco.languages.IndentAction.Outdent,
            removeText: 1,
          },
        },
      ],
    });

    monaco.languages.registerCompletionItemProvider("cedar-schema", {
      provideCompletionItems: () => ({
        suggestions: [
          {
            label: "namespace",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "namespace ",
            detail: "Keyword: define a namespace",
            range: monaco.Range.fromPositions(
              { lineNumber: 1, column: 1 },
              { lineNumber: 1, column: 1 }
            ),
          },
          {
            label: "type",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "type ",
            detail: "Keyword: define a type",
            range: monaco.Range.fromPositions(
              { lineNumber: 1, column: 1 },
              { lineNumber: 1, column: 1 }
            ),
          },
          {
            label: "entity",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "entity ",
            detail: "Keyword: define an entity",
            range: monaco.Range.fromPositions(
              { lineNumber: 1, column: 1 },
              { lineNumber: 1, column: 1 }
            ),
          },
          {
            label: "action",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "action ",
            detail: "Keyword: define an action",
            range: monaco.Range.fromPositions(
              { lineNumber: 1, column: 1 },
              { lineNumber: 1, column: 1 }
            ),
          },
          {
            label: "principal",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "principal ",
            detail: "Keyword: define a principal",
            range: monaco.Range.fromPositions(
              { lineNumber: 1, column: 1 },
              { lineNumber: 1, column: 1 }
            ),
          },
          {
            label: "resource",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "resource ",
            detail: "Keyword: define a resource",
            range: monaco.Range.fromPositions(
              { lineNumber: 1, column: 1 },
              { lineNumber: 1, column: 1 }
            ),
          },
          {
            label: "context",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "context ",
            detail: "Keyword: define a context",
            range: monaco.Range.fromPositions(
              { lineNumber: 1, column: 1 },
              { lineNumber: 1, column: 1 }
            ),
          },
          {
            label: "in",
            kind: monaco.languages.CompletionItemKind.Operator,
            insertText: " in ",
            detail: "Operator: membership check",
            range: monaco.Range.fromPositions(
              { lineNumber: 1, column: 1 },
              { lineNumber: 1, column: 1 }
            ),
          },
          {
            label: "Set",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "Set<",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: "Keyword: define a set type",
            range: monaco.Range.fromPositions(
              { lineNumber: 1, column: 1 },
              { lineNumber: 1, column: 1 }
            ),
          },
          {
            label: "Long",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "Long",
            detail: "Keyword: define a long type",
            range: monaco.Range.fromPositions(
              { lineNumber: 1, column: 1 },
              { lineNumber: 1, column: 1 }
            ),
          },
          {
            label: "String",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "String",
            detail: "Keyword: define a string type",
            range: monaco.Range.fromPositions(
              { lineNumber: 1, column: 1 },
              { lineNumber: 1, column: 1 }
            ),
          },
          {
            label: "Bool",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "Bool",
            detail: "Keyword: define a boolean type",
            range: monaco.Range.fromPositions(
              { lineNumber: 1, column: 1 },
              { lineNumber: 1, column: 1 }
            ),
          },
          {
            label: "Record",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "Record",
            detail: "Keyword: define a record type",
            range: monaco.Range.fromPositions(
              { lineNumber: 1, column: 1 },
              { lineNumber: 1, column: 1 }
            ),
          },
          {
            label: "Extension",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "Extension",
            detail: "Keyword: define an extension type",
            range: monaco.Range.fromPositions(
              { lineNumber: 1, column: 1 },
              { lineNumber: 1, column: 1 }
            ),
          },
        ],
      }),
    });
  });
}

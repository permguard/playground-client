import { loader } from "@monaco-editor/react";

loader.init().then((monaco) => {
  if (monaco) {
    monaco.languages.register({ id: "cedar-policy" });

    monaco.languages.setMonarchTokensProvider("cedar-policy", {
      tokenizer: {
        root: [
          [/\/\/.*$/, "comment"],
          [/^"([^"\\]|\\.)*$/, "string"],
          [
            /"/,
            {
              token: "string.quote",
              next: "@string",
            },
          ],
          [/\b(?:permit|forbid|when|unless)\b/, "keyword"],
          [/\b(?:false|true)\b/, "boolean"],
          [/\?(?:principal|resource)\b/, "symbol"],
          [
            new RegExp(
              "\\b(?<![\\.\\?])(?:principal|action|resource|context)\\b"
            ),
            "variable",
          ],
          [/\b0|\-?[1-9](_?[0-9])*/, "number"],
          [/(?:&&|\|\||==|!=|>=|<=|>|<|\+|-|\*)/, "operator"],
          [/\b(?:in|like|has|if|then|else|is)\b/, "operator"],
          [
            /\b(?:([_a-zA-Z][_a-zA-Z0-9]*::)*[_a-zA-Z][_a-zA-Z0-9]*)(?=::)/,
            "class-name",
          ],
          [/\b(?:ip|decimal)(?=\()/, "builtin"],
          [/(?=.)(contains|containsAll|containsAny)(?=\()/, "function"],
          [
            /(?=.)(lessThan|lessThanOrEqual|greaterThan|greaterThanOrEqual)(?=\()/,
            "function",
          ],
          [
            /(?=.)(isIpv4|isIpv6|isLoopback|isMulticast|isInRange)(?=\()/,
            {
              token: "function",
              next: "@pop",
            },
          ],
          [/[\(|\)|\[|\]|{|}|,;]/, "punctuation"],
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

    monaco.languages.setLanguageConfiguration("cedar-policy", {
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
          beforeText: /^\s*(?:permit|if|when|forbid).*?\s*\{[^}]*$/,
          action: {
            indentAction: monaco.languages.IndentAction.Indent,
          },
        },
        {
          beforeText: /^\s*}/,
          action: {
            indentAction: monaco.languages.IndentAction.Outdent,
          },
        },
      ],
    });

    monaco.languages.registerCompletionItemProvider("cedar-policy", {
      provideCompletionItems: () => ({
        suggestions: [
          {
            label: "permit",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "permit ",
            detail: "Keyword: permit a specific action",
            range: monaco.Range.fromPositions(
              { lineNumber: 1, column: 1 },
              { lineNumber: 1, column: 1 }
            ),
          },
          {
            label: "forbid",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "forbid ",
            detail: "Keyword: forbid a specific action",
            range: monaco.Range.fromPositions(
              { lineNumber: 1, column: 1 },
              { lineNumber: 1, column: 1 }
            ),
          },
          {
            label: "when",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "when ",
            detail: "Keyword: condition for permission or forbidding",
            range: monaco.Range.fromPositions(
              { lineNumber: 1, column: 1 },
              { lineNumber: 1, column: 1 }
            ),
          },
          {
            label: "if",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "if ",
            detail: "Keyword: conditional statement",
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
            label: "is",
            kind: monaco.languages.CompletionItemKind.Operator,
            insertText: " is ",
            detail: "Operator: type check",
            range: monaco.Range.fromPositions(
              { lineNumber: 1, column: 1 },
              { lineNumber: 1, column: 1 }
            ),
          },
          {
            label: "principal",
            kind: monaco.languages.CompletionItemKind.Variable,
            insertText: "principal ",
            detail: "Variable: the principal entity performing the action",
            range: monaco.Range.fromPositions(
              { lineNumber: 1, column: 1 },
              { lineNumber: 1, column: 1 }
            ),
          },
          {
            label: "action",
            kind: monaco.languages.CompletionItemKind.Variable,
            insertText: "action ",
            detail: "Variable: the action being performed",
            range: monaco.Range.fromPositions(
              { lineNumber: 1, column: 1 },
              { lineNumber: 1, column: 1 }
            ),
          },
          {
            label: "resource",
            kind: monaco.languages.CompletionItemKind.Variable,
            insertText: "resource ",
            detail: "Variable: the resource being acted upon",
            range: monaco.Range.fromPositions(
              { lineNumber: 1, column: 1 },
              { lineNumber: 1, column: 1 }
            ),
          },
          {
            label: "contains",
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: "contains(",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: "Function: contains a value",
            range: monaco.Range.fromPositions(
              { lineNumber: 1, column: 1 },
              { lineNumber: 1, column: 1 }
            ),
          },
          {
            label: "==",
            kind: monaco.languages.CompletionItemKind.Operator,
            insertText: " == ",
            detail: "Operator: equality check",
            range: monaco.Range.fromPositions(
              { lineNumber: 1, column: 1 },
              { lineNumber: 1, column: 1 }
            ),
          },
          {
            label: "&&",
            kind: monaco.languages.CompletionItemKind.Operator,
            insertText: " && ",
            detail: "Operator: logical AND",
            range: monaco.Range.fromPositions(
              { lineNumber: 1, column: 1 },
              { lineNumber: 1, column: 1 }
            ),
          },
        ],
      }),
    });
  }
});

import { loader } from "@monaco-editor/react";

if (typeof window !== "undefined") {
  loader.init().then((monaco) => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: "http://my-schema.json",
          fileMatch: ["inmemory://entity-schema.json"],
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                uid: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      description: "Unique identifier of the user",
                    },
                    type: {
                      type: "string",
                      description: "Type of the entity",
                    },
                  },
                  required: ["id", "type"],
                },
                attrs: {
                  type: "object",
                  additionalProperties: true,
                },
                parents: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                        description: "Type of parent entity",
                      },
                      id: {
                        type: "string",
                        description: "ID of the parent entity",
                      },
                    },
                    required: ["type", "id"],
                  },
                },
              },
              required: ["uid", "attrs", "parents"],
            },
          },
        },
      ],
    });

    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: "http://my-schema.json",
          fileMatch: ["inmemory://auth-request-schema.json"],
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                principal: {
                  type: "string",
                },
                action: {
                  type: "string",
                },
                resource: {
                  type: "string",
                },
                context: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              required: ["principal", "action", "resource", "context"],
            },
          },
        },
      ],
    });
  });
}

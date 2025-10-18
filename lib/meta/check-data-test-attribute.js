export const meta = {
  type: "problem",
  docs: {
    description: "Ensure correct data-test attribute is used",
    category: "Best Practices",
    recommended: false,
  },
  schema: [
    {
      type: "object",
      properties: {
        attributeName: {
          type: "string",
          default: "data-test",
        },
        tagPatterns: {
          type: "object",
          additionalProperties: {
            type: "array",
            items: { type: "string" },
          },
        },
        requiredTags: {
          type: "array",
          items: { type: "string" },
        },
        roleMappings: {
          type: "object",
          additionalProperties: {
            type: "string",
          },
        },
        componentMappings: {
          type: "object",
          additionalProperties: {
            type: "string",
          },
        },
      },
      additionalProperties: false,
    },
  ],
};

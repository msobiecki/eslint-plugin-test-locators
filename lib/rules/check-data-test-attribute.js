const {
  attributeName: defaultAttributeName,
  tagPatterns: defaultTagPatterns,
  requiredTags: defaultRequiredTags,
  roleMappings: defaultRoleMappings,
  componentMappings: defaultComponentMappings,
} = require("../defaults/check-data-test-attribute");

const meta = require("../meta/check-data-test-attribute");

const getAttributeForElement = (attributes, attributeName) => {
  const attribute = attributes.find(
    ({ name, value }) =>
      name?.name === attributeName && value?.type === "Literal",
  );
  return attribute?.value.value || null;
};

const getPatternForElement = (
  tagPatterns,
  roleMappings,
  componentMappings,
  tagName,
  role,
  type,
) => {
  const typePattern = type ? `[type="${type}"]` : "";
  const key =
    (role && roleMappings[role]) || componentMappings[tagName] || tagName;

  const fullKey = `${key}${typePattern}`;
  if (tagPatterns[fullKey]) {
    return tagPatterns[fullKey];
  }

  if (tagPatterns[key]) {
    return tagPatterns[key];
  }

  return undefined;
};

module.exports = {
  meta: meta,
  create(context) {
    const options = context.options[1] || {};
    const attributeName = options.attributeName || defaultAttributeName;

    const tagPatterns = {
      ...defaultTagPatterns,
      ...(options.tagPatterns || {}),
    };

    const requiredTags = options.requiredTags || defaultRequiredTags;

    const roleMappings = {
      ...defaultRoleMappings,
      ...(options.roleMappings || {}),
    };

    const componentMappings = {
      ...defaultComponentMappings,
      ...(options.componentMappings || {}),
    };

    return {
      JSXOpeningElement(node) {
        const tagName = node.name.name;

        const role = getAttributeForElement(node.attributes, "role");
        const type = getAttributeForElement(node.attributes, "type");

        const patterns = getPatternForElement(
          tagPatterns,
          roleMappings,
          componentMappings,
          tagName,
          role,
          type,
        );

        if (!patterns) {
          return;
        }

        const isRequired =
          requiredTags.includes(tagName) ||
          (role && requiredTags.includes(roleMappings[role])) ||
          (componentMappings[tagName] &&
            requiredTags.includes(componentMappings[tagName]));

        const attribute = node.attributes.find(
          (attribute) =>
            attribute.name && attribute.name.name === attributeName,
        );

        if (isRequired && !attribute) {
          context.report({
            node,
            message: `<${tagName}>${role ? ` with role="${role}"` : ""} is required to have a "data-test" attribute. It should match one of the patterns: ${patterns.join(", ")}.`,
          });
          return;
        }

        if (!isRequired && !attribute) {
          return;
        }

        if (attribute.value && attribute.value.type === "Literal") {
          const value = attribute.value.value;

          const isValid = patterns.some((pattern) =>
            new RegExp(`^${pattern}`).test(value),
          );

          if (!isValid) {
            context.report({
              node: attribute,
              message: `Invalid "data-test" value: "${value}" for <${tagName}>${role ? ` with role="${role}"` : ""}. It should match one of the patterns: ${patterns.join(", ")}.`,
            });
          }
        } else if (
          attribute.value &&
          attribute.value.type === "JSXExpressionContainer"
        ) {
          const quasis = attribute.value.expression.quasis.map(
            (quasi) => quasi.value.raw,
          );

          const value = quasis[0];

          const isValid = patterns.some((pattern) =>
            new RegExp(`^${pattern}`).test(value),
          );

          if (!isValid) {
            context.report({
              node: attribute,
              message: `Invalid "data-test" value: "${value}" for <${tagName}>${role ? ` with role="${role}"` : ""}. It should match one of the patterns: ${patterns.join(", ")}.`,
            });
          }
        }
      },
    };
  },
};

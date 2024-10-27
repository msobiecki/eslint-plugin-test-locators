const defaults = {
  attributeName: "data-test",
  tagPatterns: {
    // Buttons and Interactions
    button: ["button-", "btn-"],
    'input[type="button"]': ["button-", "btn-"],
    'input[type="submit"]': ["submit-"],
    'input[type="reset"]': ["reset-"],
    // Links and Navigation
    a: ["anchor-", "link-"],
    nav: ["nav-*"],
    // Forms and Inputs
    input: ["input-"],
    'input[type="text"]': ["input-text-"],
    'input[type="search"]': ["input-search-"],
    'input[type="email"]': ["input-email-"],
    'input[type="password"]': ["input-password-"],
    textarea: ["textarea-"],
    select: ["select-", "dropdown-"],
    'input[type="checkbox"]': ["input-checkbox-"],
    'input[type="radio"]': ["input-radio-"],
    'input[type="date"]': ["input-date-"],
    'input[type="range"]': ["input-range-", "input-slider-"],
    form: ["form-"],
    // Text and Content
    p: ["text-"],
    span: ["text-inline-"],
    h1: ["heading-", "title-"],
    h2: ["heading-", "title-"],
    h3: ["heading-", "title-"],
    h4: ["heading-", "title-"],
    h5: ["heading-", "title-"],
    h6: ["heading-", "title-"],
    blockquote: ["quote-"],
    strong: ["strong-"],
    em: ["emphasis-"],
    // Tables and Grid Layouts
    table: ["table-"],
    thead: ["table-header-"],
    tbody: ["table-body-"],
    td: ["cell-"],
    th: ["header-"],
    tr: ["row-"],
    // Containers and Sections
    div: ["container-"],
    section: ["section-"],
    article: ["article-"],
    main: ["main-"],
    aside: ["aside-"],
    // Custom Components and Miscellaneous
    "custom-scroll": ["scroll-"],
    "custom-tab": ["tab-"],
    "custom-grid": ["grid-"],
    "custom-datepicker": ["datepicker-"],
    "custom-carousel": ["carousel-"],
    "custom-modal": ["modal-"],
  },
  requiredTags: ["button", "a", "input", "select", "textarea", "form"],
  roleMappings: {
    button: "button",
    link: "a",
    checkbox: 'input[type="checkbox"]',
    radio: 'input[type="radio"]',
    textbox: 'input[type="text"]',
    slider: 'input[type="range"]',
    searchbox: 'input[type="search"]',
    tab: "custom-tab",
    dialog: "custom-modal",
  },
  componentMappings: {
    // Buttons and Interactions
    Button: "button",
    // Links and Navigation
    Link: "a",
    // Forms and Inputs
    Input: "input",
    // Text and Content,
    Text: "p",
    // Custom Components and Miscellaneous
    ScrollContainer: "custom-scroll",
    GridContainer: "custom-grid",
    Datepicker: "custom-datepicker",
    Carousel: "custom-carousel",
    Modal: "custom-modal",
  },
};

function mapComponentToTag(componentMappings, componentName) {
  return componentMappings[componentName] || componentName;
}

const getAttributeForElement = (attributes, arributeName) => {
  let arribute = null;
  attributes.forEach((attribute) => {
    if (
      attribute.name &&
      attribute.name.name === arributeName &&
      attribute.value &&
      attribute.value.type === "Literal"
    ) {
      arribute = attribute.value.value;
    }
  });
  return arribute;
};

function getPatternForElement(tagPatterns, roleMappings, tagName, role, type) {
  const typePattern = type ? `[type="${type}"]` : "";

  if (role && roleMappings[role]) {
    return tagPatterns[`${roleMappings[role]}${typePattern}`];
  }

  return tagPatterns[`${tagName}${typePattern}`];
}

module.exports = {
  meta: {
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
  },
  create(context) {
    const options = context.options[1] || {};
    const attributeName = options.attributeName || defaults.attributeName;

    const tagPatterns = {
      ...defaults.tagPatterns,
      ...(options.tagPatterns || {}),
    };

    const requiredTags = options.requiredTags || defaults.requiredTags;

    const roleMappings = {
      ...defaults.roleMappings,
      ...(options.roleMappings || {}),
    };

    const componentMappings = {
      ...defaults.componentMappings,
      ...(options.componentMappings || {}),
    };

    return {
      JSXOpeningElement(node) {
        const tagName = node.name.name;
        const mappedTagName = mapComponentToTag(componentMappings, tagName);

        const role = getAttributeForElement(node.attributes, "role");
        const type = getAttributeForElement(node.attributes, "type");
        const patterns = getPatternForElement(
          tagPatterns,
          roleMappings,
          mappedTagName,
          role,
          type,
        );

        const isRequired =
          requiredTags.includes(tagName) ||
          (role && requiredTags.includes(roleMappings[role]));
        const hasDataTest = node.attributes.some(
          (attribute) =>
            attribute.name && attribute.name.name === attributeName,
        );

        console.log(tagName, mappedTagName, patterns, role, type);

        if (isRequired && !hasDataTest) {
          context.report({
            node,
            message: `<${tagName}>${role ? ` with role="${role}"` : ""} is required to have a "data-test" attribute. It should match one of the patterns: ${patterns.join(", ")}.`,
          });
          return;
        }

        if (!isRequired && !hasDataTest) {
          return;
        }

        node.attributes.forEach((attribute) => {
          if (
            attribute.name &&
            attribute.name.name === "data-test" &&
            attribute.value &&
            attribute.value.type === "Literal"
          ) {
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
          }
        });
      },
    };
  },
};

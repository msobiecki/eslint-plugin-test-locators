module.exports = {
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
# eslint-plugin-test-locators

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/msobiecki/eslint-plugin-test-locators/blob/master/LICENSE)

A simple ESLint plugin for improving test locator usage. It ensures that your test selectors are consistent and easy to maintain.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Rules](#rules)
- [License](#license)

## Installation

To install the plugin, run:

```bash
npm install --save-dev eslint-plugin-test-locators
```

Make sure to install the necessary peer dependencies as well:

```bash
npm install --save-dev eslint
```

## Usage

To use this ESLint configuration, you need to extend it in your project's `.eslintrc` file:


### Basic Configuration

```json
{
  "plugins": ["test-locators"],
  "rules": {
    "test-locators/check-data-test-attribute": "error"
  }
}
```

### Configuration with Custom Options

You can customize the rules in your ESLint config to suit your project needs:

```json
{
  "plugins": ["test-locators"],
  "rules": {
    "test-locators/check-data-test-attribute": ["error", {
      "attributeName": "data-test",
      "requiredTags": ["button", "a", "input", "select", "textarea"],
      "roleMappings": {
        "button": ["button-", "btn-"],
        "link": ["anchor-", "link-"]
      }
    }]
  }
}
```

## Rules

The plugin currently includes the following rules:

- [**check-data-test-attribute**](./docs/rules/check-data-test-attribute.md): Enforces the presence of a data-test attribute on specific HTML elements, such as buttons, links, and form controls, according to customizable patterns and role mappings.

### Example Rule Configuration:

```json
"test-locators/check-data-test-attribute": ["error", {
  "attributeName": "data-test-id",
  "tagPatterns": {
    "button": ["button-", "btn-"],
    "a": ["anchor-", "link-"],
    "input": ["input-"],
    "select": ["select-"],
    "textarea": ["textarea-"]
  },
  "requiredTags": ["button", "a", "input", "select", "textarea"],
  "roleMappings": {
    "button": "button",
    "link": "a"
  },
  "componentMappings": {
    "Button": "button",
    "Link": "a",
    "Input": "input",
  }
}]
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Feel free to contribute to this repository by opening issues or submitting pull requests. Happy coding!

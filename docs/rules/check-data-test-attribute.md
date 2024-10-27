# Ensure correct `data-test` attribute is used. (`test-locators/check-data-test-attribute`)

## Rule Details

Examples of **incorrect** code for this rule:

```html
<div>
  <button data-test="text-save">Save</button>  // ❌ Invalid
  <input data-test="form-name" />              // ❌ Invalid
  <a data-test="hyperlink-value">Home</a>      // ❌ Invalid
</div>
```

Examples of **correct** code for this rule:

```html
<div>
  <button data-test="button-save">Save</button>  // ✅ Valid
  <input data-test="input-name" />               // ✅ Valid
  <a data-test="anchor-value">Home</a>           // ✅ Valid
</div>
```

## Rule Options

```js
"test-locators/check-data-test-attribute": [<enabled>, {
  "attributeName": <string>,
  "tagPatterns": {
    [key: string]: [<string>, ...],
    ...
  },
  "requiredTags": [<string>, ...],
  "roleMappings": {
    [key: string]: <string>,
    ...
  },
  "componentMappings": {
    [key: string]: <string>,
    ...
  },
}]
```

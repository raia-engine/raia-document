# Last Updated

::: details Source text
https://github.com/vuejs/vitepress/blob/3c40e9d9a8443433f49599111ee571d569de530d/docs/en/reference/default-theme-last-updated.md
:::

The update time of the last content will be displayed in the lower right corner of the page. To enable it, add `lastUpdated` options to your config.

::: tip
You need to commit the markdown file to see the updated time.
:::

## Site-Level Config

```js
export default {
  lastUpdated: true
}
```

## Frontmatter Config

This can be disabled per-page using the `lastUpdated` option on frontmatter:

```yaml
---
lastUpdated: false
---
```

Also refer [Default Theme: Last Updated](./default-theme-config#lastupdated) for more details. Any truthy value at theme-level will also enable the feature unless explicitly disabled at site or page level.

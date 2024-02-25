# rehype-target-blank
rehype plugin to set `_blank` to `target` attributes.

## Installation
```sh
npm i git+https://github.com/iwstkhr/rehype-target-blank.git
```

## Options
| Name | Type | Description |
| ---- | ---- | ----------- |
| excludes | string[] | Excluded URLs |
| icon | boolean | Whether an external icon should be displayed |
| iconClass | string | CSS classes for an external icon |
| rel | string | [`rel`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel) attribute value |

## Usage in Astro
Add `rehypeTargetBlank` to `astro.config.mjs` like the following.

```js
export default defineConfig({
  site: 'https://<YOUR_SITE>/',
  integrations: [tailwind()],
  markdown: {
    rehypePlugins: [
      [rehypeTargetBlank, {
        excludes: [
          'https://<YOUR_SITE>',
          'http://localhost',
          '#',
        ],
        icon: true,
        iconClass: 'ml-1 inline-block align-text-top w-2.5 h-2.5',
        rel: 'external',
      }],
    ],
  },
});
```

If you use Tailwind CSS, please make sure to add `'./node_modules/@iwstkhr/rehype-target-blank/**/*.js',` to `tailwind.config.js` like the following.

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx,astro}',
    './node_modules/@iwstkhr/rehype-target-blank/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## License
MIT

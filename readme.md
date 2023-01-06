# vite-plugin-i18n-loader

<p align="center">
  <a href="https://npmjs.com/package/vite-plugin-i18n-loader"><img src="https://img.shields.io/npm/v/vite-plugin-i18n-loader.svg" alt="npm package"></a>
  <img alt="GitHub" src="https://img.shields.io/github/license/web-ts/vite-plugin-i18n-loader">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/web-ts/vite-plugin-i18n-loader">
  <a href="https://gitmoji.dev"><img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg" alt="Gitmoji"></a>
</p>
<br/>

Loads all of your language/translation `.yaml` or `.yml` files based on a folder structure.

## Installation

Add `vite-plugin-i18n-loader` to your `vite.config.ts` file

```ts
import { defineConfig } from "vite";
import i18nLoader from "vite-plugin-i18n-loader";

export default defineConfig({
  plugins: [i18nLoader()]
});
```

## Usage

`./en.lang.yaml`:

```yaml
myKey: My Translation
myNestedKey:
  firstLevel: Nested on one level
```

`./ro.lang.yaml`:

```yaml
myKey: Traducerea Mea
myNestedKey:
  firstLevel: Un nivel in jos
```

Will be loaded into a virtual file and can be imported anywhere via:

```ts
import { messages } from "virtual:i18n-loader";

console.log(messages);
/*
Messages will be:
{
  en: {
    myKey: "My Translation",
    myNestedKey: {
      firstLevel: "Nested on one level"
    }
  },
  ro: {
    myKey: "Traducerea Mea",
    myNestedKey: {
      firstLevel: "Un nivel in jos"
    }
  }
}
*/
```

Files are loaded based on directory structure. The same file as above will append the path if it's in a subdirectory.

`./some-dir/some-other-dir/en.lang.yaml` Will become:

```ts
{
  en: {
   "some-dir": {
     "some-other-dir": {
        myKey: "My Translation",
        myNestedKey: {
          firstLevel: "Nested on one level"
        }
      }
    }
  }
}
```

You will essentially be able to use it like this: `t("some-dir.some-other-dir.myKey")`

The plugin can also emit all the transformed files into a single folder so you can use it with other vite plugins or vs-code extensions. The default folder is "locales".


[`vite`]: https://github.com/vitejs/vite

## Options

```ts
interface PluginOptions {
  ignoredFolderNames: Array<string>;
  include: Array<string>;
  emitFiles: boolean;
  emitFolder: string;
}
```

### ignoredFolderNames

An array of folder names that you want to skip from path nesting.

```ts
i18nLoader({
  ignoredFolderNames: ["src", "locales"]
});
```

Example:

File Path: `./src/myAwesomeAppModule/locales/en.lang.yaml`

```yaml
myKey: MyValue
```

To access `myKey` from the above example we would skip the `src` and `locales` folder and access it with `myAwesomeAppModule.myKey`

### include

An array of folders that you want to load. By default is searches inside the `src` folder. Accepts a glob patten.

```ts
i18nLoader({
  include: ["./src/**/*.lang.yml", "./src/**/*.lang.yaml"]
});
```

### emitFiles & emitFolder

This plugin can also emit the transformed messages as files separated per locale.

```ts
i18nLoader({
  emitFiles: true,
  emitFolder: "locales" // The folder where we want to emit the files
});
```

Let's take the following:

```
.
└── src
    ├── myAppModule
    │   └── locales
    │       ├── en.lang.yaml
    │       ├── ro.lang.yaml
    │       ├── fr.lang.yaml
    │       └── de.lang.yaml
    └── anotherAppModule
        └── locales
            ├── en.lang.yaml
            ├── de.lang.yaml
            └── hu.lang.yaml
```
The resulting folder will merge all locales of the same language and put them under the `locales` folder by default.

``` 
.
├── locales
│   ├── en.json
│   ├── ro.json
│   ├── fr.json
│   ├── de.json
│   └── hu.json
└── src
    ├── myAppModule
    │   └── locales
    │       ├── en.lang.yaml
    │       ├── ro.lang.yaml
    │       ├── fr.lang.yaml
    │       └── de.lang.yaml
    └── anotherAppModule
        └── locales
            ├── en.lang.yaml
            ├── de.lang.yaml
            └── hu.lang.yaml
```
This way  you have more granularity over how you load the files if you don't want to use the virtual import. I recommend having this one on if you plan on using something like the `i18n Ally` extension for vs-code as it will pick up on all the translations you may be missing. 

## TypeScript support

The recommended way to add type definitions for the virtual import is via a `tsconfig.json` file.

```ts
// tsconfig.json
{
  "compilerOptions": {
    ...
    "types": [
      ...
      "vite-plugin-i18n-loader/module"
      ],
  }
}
```

You may also add type definitions without `tsconfig`:

```ts
// vite-env.d.ts
/// <reference types="vite-plugin-i18n-loader/module" />
```

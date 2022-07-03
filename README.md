# ESBuild TypeScript Turborepo Monorepo starter/example

## Details:

This is an example monorepository using ESBuild for it's near-instantaneous build times and Turborepo for it's caching capabilities. It's pre-configured for TypeScript (2 different configurations for browser and for node) and ESLint for linting.

Additionally it's using NPM Workspaces, most examples I could find online were using YARN.

## Installation:

```sh
git clone https://github.com/barca-reddit/typescript-vscode-esbuild.git

cd typescript-vscode-esbuild

npm run watch
```

## Tech stack:

-   [ESBuild](esbuild.github.io/)

-   [TypeScript](https://www.typescriptlang.org/)

-   [Turborepo](https://turborepo.org/)

-   [NPM Workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces)

-   [Eslint](https://eslint.org/)

-   [Nodemon](https://nodemon.io/)

## Exporting/sharing packages:

**NB**: <ins>I don't know if this is the best or the accepted way to do this, neither I consider myself an expert, so PR/issues/feedback of any kind is welcome.</ins>

To create a shared package and import it somewhere else in your monorepo, edit the contents of `package.json` of the package you want to export and add the following fields:

```json
"exports": {
    ".": {
        "import": "./out/main.js"
    }
},
"typesVersions": {
    "*": {
        "*": ["./src/main.ts"]
    }
}
```

The `exports` field is there to serve plain javascript imports and it should point out to an index (main) file in your compiled `out` directory. The `import` nested key is a ["conditional export"](https://nodejs.org/docs/latest-v16.x/api/packages.html#conditional-exports).

The `typesVersions` is there to make TypeScript happy and should point out to a file that exports other files (an index). This allows you to do the following:

```ts
// foo.ts
export const foo = "foo";

// main.ts
export * from "./foo.js";
export * from "./bar.js";

// inside some other package
import { foo } from "@repo/shared";
```

Don't forget to add the package you're exporting as a dependency to the package you're importing it to:

```json
// package.json
{
    // ...
    "dependencies": { "@repo/shared": "*" }
}
```

For more advanced usages, you can also use ["subpath exports"](https://nodejs.org/docs/latest-v16.x/api/packages.html#subpath-exports).

```json
"exports": {
    ".": {
        "import": "./out/main.js"
    },
    "./other": {
        "import": "./out/other/index.js"
    }
},
"typesVersions": {
    "*": {
        "*": ["./src/main.ts"],
        "other": ["./src/other/index.ts"]
    }
}
```

This allows you to do the following:

```ts
// src/other/foo.ts
export const foo = "foo";

// src/other/bar.ts
export const bar = "bar";

// src/other/index.ts
export * from "./foo.js";
export * from "./bar.js";

// inside some other package
import { foo, bar } from "@repo/shared/other";
//                                     ^^^^^
```

## Notes:

### Turborepo

For Turborepo caching to work, it's essential that all `.cache` directories it creates are git-ignored.

If build order isn't important for your setup, add the `--parallel` flag to the `npm build` script to speed up compiling. You can probably get away with this if you don't bundle any code via `bundle: true` setting passed to esbuild.

### TSC

The TypeScript compiler is used only for type checking, everything else is handled by ESBuild.

### Typescript/Eslint

TypeScript and ESLint configurations are matter of personal preference and can easily be adjusted to one's requirements. The same applies for ESBuild, [you can also pass additional parameters](packages/config/esbuild/build-browser.mjs#L14) to `buildBrowser` or `buildNode` which will override the default ones.

### VSCode

If the `.cache` directories become annoying, you can just hide them in VSCode, create/edit this file under `.vscode/settings.json`.

```json
{
    "files.exclude": {
        "cache/": true,
        "**/.turbo": true
    }
}
```

## Useful resources:

-   [Video: Turborepo Tutorial | Part 1 - Typescript, Eslint, Tailwind, Husky shared config setup in a Monorepo](https://www.youtube.com/watch?v=YQLw5kJ1yrQ) by Leo Roese.

-   [typescript-subpath-exports-workaround](https://github.com/teppeis/typescript-subpath-exports-workaround) by Teppei Sato.

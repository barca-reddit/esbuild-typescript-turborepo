# ESBuild TypeScript Turborepo Monorepo starter/example

## Update December 2022:

-   The way of exporting/sharing packages has changed. Check the updated [section](#exportingsharing-packages).

## Update November 2022:

-   Added support for React with an example app in `apps/react`.

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

[Previously](https://github.com/barca-reddit/esbuild-typescript-turborepo/tree/0a22bbc5b0652a940caf5d6d45d60edbbebeeea7#exportingsharing-packages) we were making use of `typeVersions` in `package.json` to share code within the monorepository, but that caused some issues. Now, we're making use of `"moduleResolution": "NodeNext"` in `tsconfig.json`, so that makes things easier.

To create a shared package and import it somewhere else in your monorepo, edit the contents of `package.json` of the package you want to export and add the following fields:

```json
"exports": {
    ".": {
        "types": "./src/main.ts",
        "import": "./out/main.js"
    }
}
```

The first part of the `export` object is the path you want to import (details below).

The `types` key should point out to an index file where all your exports live. For example:

```ts
// src/main.ts
export const foo = "foo";
export const bar = "foo";
```

The `import` key should point out to an index (main) file in your compiled `out` directory and it's there to server plain javascript imports.

All of this allows you to do the following:

```ts
// inside some other package
import { foo, bar } from "@repo/shared";
```

Don't forget to add the package you're exporting as a dependency to the package you're importing it to:

```json
// package.json
{
    // ...
    "dependencies": { "@repo/shared": "*" }
}
```

You can also have multiple import paths.

```json
"exports": {
    ".": {
        "types": "./src/main.ts",
        "import": "./out/main.js"
    },
    "./server": {
        "types": "./src/server/index.ts",
        "import": "./out/server/index.js"
    },
    "./web": {
        "types": "./src/web/index.ts",
        "import": "./out/web/index.js"
    }
}
```

```ts
// inside some other package
import { foo } from "@repo/shared/server";
import { bar } from "@repo/shared/web";
```

It is also possible to have wildcard exports like this:

```json
"exports": {
    "./*": {
        "types": "./src/*.ts",
        "import": "./out/*.js"
    }
}
```

But unfortunately TypeScript is unable to find type declarations this way. If you have a solution or tips about this, issues and PRs are welcome!

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

### Version mismatches

You can quickly check whether your package dependencies are in sync, e.g, `@repo/a` and `@repo/b` are different versions of the same library.

```json
// package.json (repo a)
{
    "name": "repo/a",
    "dependencies": {
        "foo": "^1.0.0"
    }
}
// package.json (repo b)
{
    "name": "repo/b",
    "dependencies": {
        "foo": "^2.0.0"
    }
}
```

```sh
npm run mismatch

Error: Found version mismatch for the following package:

foo - versions: ^1.0.0, ^2.0.0
- apps/package-a/package.json (@repo/a) - ^1.0.0
- apps/package-b/package.json (@repo/b) - ^2.0.0
```

This is just a quick and dirty solution that will only report mismatches but won't fix them for you. For more advanced solutions, check out [syncpack](https://github.com/JamieMason/syncpack).

## Useful resources:

-   [Video: Turborepo Tutorial | Part 1 - Typescript, Eslint, Tailwind, Husky shared config setup in a Monorepo](https://www.youtube.com/watch?v=YQLw5kJ1yrQ) by Leo Roese.

-   [typescript-subpath-exports-workaround](https://github.com/teppeis/typescript-subpath-exports-workaround) by Teppei Sato.

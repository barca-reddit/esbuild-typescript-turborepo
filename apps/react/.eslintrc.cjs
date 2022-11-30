module.exports = {
    root: true,
    env: {
        es2021: true,
        node: true,
    },
    extends: [
        "plugin:react/recommended",
        "plugin:react-hooks/recommended"
    ],
    plugins: [
        "react",
        "react-hooks",
        "@typescript-eslint",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: {
            jsx: true
        },
        sourceType: "module",
        jsxPragma: null,
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
    },
    settings: {
        /* https://github.com/jsx-eslint/eslint-plugin-react/blob/master/README.md */
        react: {
            createClass: "createReactClass",
            pragma: "React",
            fragment: "Fragment",
            version: "detect",
            flowVersion: "0.53"
        }
    },
    ignorePatterns: ["*.*", "!src/**/*"],
    rules: {
        "react/react-in-jsx-scope": 0,
        "react/jsx-uses-react": 0,
        ...require("@repo/config/eslint/eslint-default").rules
    }
};
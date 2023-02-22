const tailwindcss = require('tailwindcss');
const postCSSImport = require('postcss-import');

module.exports = {
    plugins: [
        postCSSImport(),
        tailwindcss('./tailwind.config.cjs'),
    ]
};
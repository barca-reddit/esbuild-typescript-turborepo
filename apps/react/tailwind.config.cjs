const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.(tsx|html)'],
    theme: {
        extend: {
            fontFamily: {
                'ubuntu': ['Ubuntu', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
};
module.exports = {
    'semi': ['warn', 'always'],
    'quotes': ['warn', 'single'],
    'eqeqeq': ['error', 'always', {
        'null': 'ignore'
    }],
    'no-unsafe-optional-chaining': ['error', {
        'disallowArithmeticOperators': true
    }]
};
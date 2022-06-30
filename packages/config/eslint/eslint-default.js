module.exports = {
    'rules': {
        'semi': ['warn', 'always'],
        'quotes': ['warn', 'single'],
        'eqeqeq': ['error', 'always', {
            'null': 'ignore'
        }],
        'no-unsafe-optional-chaining': ['error', {
            'disallowArithmeticOperators': true
        }],
        '@typescript-eslint/no-unused-vars': ['warn'],
        '@typescript-eslint/no-floating-promises': ['error', {
            'ignoreVoid': false,
            'ignoreIIFE': false
        }],
        '@typescript-eslint/no-misused-promises': ['error', {
            'checksVoidReturn': false
        }],
        '@typescript-eslint/await-thenable': ['error'],
        '@typescript-eslint/consistent-type-imports': ['warn', {
            'prefer': 'type-imports'
        }],
        '@typescript-eslint/consistent-type-exports': ['warn', {
            'fixMixedExportsWithInlineTypeSpecifier': true
        }],
        '@typescript-eslint/explicit-member-accessibility': ['warn', {
            'accessibility': 'explicit',
            'overrides': {
                'constructors': 'off'
            }
        }]
    }
};
module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true
    },
    extends: [
        'prettier-standard'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: [
        'react',
        'standard'
    ],
    rules: {
        'react/jsx-uses-react': 2,
        'react/jsx-uses-vars': 2
    }
};
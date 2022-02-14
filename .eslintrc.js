module.exports = {
    env: {
        node: true,
        'vue/setup-compiler-macros': true,
    },
    extends: ['eslint:recommended', 'airbnb-base', 'plugin:vue/vue3-essential', 'prettier'],
    rules: {
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',
    },
}

module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'semi': 0,
        "space-before-function-paren": 0,
        //关闭空行规则
        "indent": [0],
        //空行最多不能超过100行
        "no-multiple-empty-lines": [0, { "max": 100 }],
        //关闭禁止混用tab和空格
        "no-mixed-spaces-and-tabs": [0],
        "no-tabs": "off",
        "no-console":"off"
    }
}
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue/base',
    'plugin:vuetify/base',
  ],
  rules: {
    'vue/no-reserved-component-names': 'off',    // turned off for now becuase Header and Footer are reserved names in HTML
    'vue/multi-word-component-names': 'off'
  }
}
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    'browser': true,
    'node': true
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html',
    'async-await'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    'async-await/space-after-async': 0,
    'async-await/space-after-await': 0,
    'import/no-unresolved': 0,
    'no-console': 'off',
    'no-param-reassign': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}

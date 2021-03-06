module.exports = {
  'env': {
    'browser': true,
    'node': true,
    'es6': true,
  },
  'extends': ['eslint:recommended', 'google'],
  'globals': {
    'Vue': true,
    'VueMaterial': true,
    'axios': true,
    'Clipboard': true,
  },
  'rules': {
    'indent': [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'quotes': [
      'error',
      'single',
      {
        'avoidEscape': true,
      },
    ],
    'semi': [
      'error',
      'never',
    ],
    'max-len': [
      'error',
      {
        'ignoreUrls': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'ignoreRegExpLiterals': true,
      },
    ],
  },
}

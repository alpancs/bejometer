module.exports = {
  'env': {
    'browser': true,
    'node': true,
    'es6': true,
  },
  'extends': ['eslint:recommended', 'google'],
  'globals': {
    '$': true,
    'sanitize': true,
    'Vue': true,
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

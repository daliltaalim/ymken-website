import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['public/**'],
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: js.configs.recommended.rules,
  },
];

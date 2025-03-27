import nx from '@nx/eslint-plugin';

export default [
  // ✅ Base NX configurations
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],

  // ✅ Ignore dist folder
  {
    ignores: ['**/dist'],
  },

  // ✅ Merge rules for all relevant files
  {
    files: [
      '**/*.{ts,tsx,cts,mts,js,jsx,cjs,mjs}', // 🔥 Cleaner glob pattern
    ],
    rules: {
      // ✅ NX module boundary rule
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],

      // ✅ Warn on unused variables (ignore `_` prefixed)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_', // ✅ Ignore unused args starting with '_'
          varsIgnorePattern: '^_', // ✅ Ignore unused vars starting with '_'
        },
      ],
      '@typescript-eslint/ban-ts-comment': [
        'warn',
        {
          'ts-expect-error': 'allow-with-description',
        },
      ],

      // ✅ Disable `no-explicit-any` globally if needed
      '@typescript-eslint/no-explicit-any': 'off', // 🔥 Optional if you want to disable `any` usage
    },
  },
];

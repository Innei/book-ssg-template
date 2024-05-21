module.exports = {
  extends: ['@innei/eslint-config-react-ts'],
  rules: {
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: 'use.*Selector',
        // additionalHooks: 'use(.*?)Selector',
      },
    ],
    'prefer-arrow-callback': 'off',
    'react/display-name': 'off',
    'tailwindcss/migration-from-tailwind-2': 0,
  },
}

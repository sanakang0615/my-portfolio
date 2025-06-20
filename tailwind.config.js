/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.gray.800'),
            '--tw-prose-headings': theme('colors.black'),
            '--tw-prose-links': theme('colors.blue.700'),
            '--tw-prose-bold': theme('colors.black'),
            '--tw-prose-counters': theme('colors.gray.800'),
            '--tw-prose-bullets': theme('colors.gray.800'),
            '--tw-prose-quotes': theme('colors.gray.800'),
            '--tw-prose-code': theme('colors.gray.800'),
            '--tw-prose-pre-code': theme('colors.gray.800'),
            '--tw-prose-pre-bg': theme('colors.gray.100'),
            maxWidth: 'none',
            h1: {
              fontSize: theme('fontSize.2xl[0]'),
              fontWeight: theme('fontWeight.bold'),
              marginTop: theme('spacing.8'),
              marginBottom: theme('spacing.6'),
            },
            h2: {
              fontSize: theme('fontSize.xl[0]'),
              fontWeight: theme('fontWeight.bold'),
              marginTop: theme('spacing.6'),
              marginBottom: theme('spacing.4'),
            },
            h3: {
              fontSize: theme('fontSize.lg[0]'),
              fontWeight: theme('fontWeight.semibold'),
              marginTop: theme('spacing.5'),
              marginBottom: theme('spacing.3'),
            },
            h4: {
              fontSize: theme('fontSize.base[0]'),
              fontWeight: theme('fontWeight.semibold'),
              marginTop: theme('spacing.4'),
              marginBottom: theme('spacing.2'),
            },
            h5: {
              fontSize: theme('fontSize.sm[0]'),
              fontWeight: theme('fontWeight.semibold'),
              marginTop: theme('spacing.3'),
              marginBottom: theme('spacing.2'),
            },
            h6: {
              fontSize: theme('fontSize.xs[0]'),
              fontWeight: theme('fontWeight.semibold'),
              marginTop: theme('spacing.2'),
              marginBottom: theme('spacing.2'),
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.gray.300'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-links': theme('colors.blue.400'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.gray.300'),
            '--tw-prose-bullets': theme('colors.gray.300'),
            '--tw-prose-quotes': theme('colors.gray.300'),
            '--tw-prose-code': theme('colors.gray.300'),
            '--tw-prose-pre-code': theme('colors.gray.300'),
            '--tw-prose-pre-bg': theme('colors.gray.800'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
} 
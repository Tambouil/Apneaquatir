/** @type {import('tailwindcss').Config} */
export default {
  content: ['./resources/**/*.edge', './resources/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
    boxShadow: {
      DEFAULT: '0px 2px 4px rgba(44, 43, 42, 0.1)',
      spread: '0px 12px 32px rgba(44, 43, 42, 0.16)',
    },
    minWidth: {
      240: '240px',
      full: '100%',
    },
    extend: {},
  },
  // eslint-disable-next-line unicorn/prefer-module
  plugins: [require('@tailwindcss/forms')],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  theme: {
    extend: {
      colors: {
        red: '#840029',
        bred: '#ef4444',
        gray: '#C8C9C7',
        gold: '#FDB913',
        black: '#000000',
        bgold: '#EFDBB2',
        white: '#f8fafc',
        bogold: '#bd955a',
        green: '#22c55e',
        ulmgray: '#65666A',
        ulmgold: '#FDB913',
        ulm_red: '#8A2432',
        ulm_maroon: '#3B0000',
        ulm_logo_red: '#6F0129',
        orange: '#FF8D1E',
      },
      extend: {
        spacing: {
          64: '16rem',
          128: '32rem',
          256: '64rem',
          512: '128rem',
          1024: '256rem',
        },
        extend: {
          backgroundImage: {
            'ulm-library': "url('/public/ulm_library.jpg')",
            'ulm-aerial': "url('/public/aerial.jpg')",
          },
        },
      },
    },
  },

  plugins: [require('@tailwindcss/forms')],
};

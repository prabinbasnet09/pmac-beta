/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",

  ],
  variants: {
    extend: {
      backgroundColor:['active'],
      // backgroundImage: {
      //   'eagleBackgroundImage': "url('/src/pages/photos/statue2LG.jpg')",
        
      // }
    }
 

  },
  theme: {
    extend: {
      colors: {
        'red': '#840029',
        'bred': '#ef4444',
        'gray': '#C8C9C7',
        'gold': '#FDB913',
        'black': '#000000',
        'bgold': '#EFDBB2',
        'white': '#f8fafc',
        'bogold': '#bd955a',
        'green': '#22c55e',
        'ulmgray': '#65666A',
        'ulmgold': '#FDB913',
        'ulm_red': '#8A2432',
        'ulm_maroon': '#3B0000',
        'ulm_logo_red': '#6F0129',
        'orange': '#FF8D1E'
      },
    },
  },
  plugins: [
   
    require('@tailwindcss/forms'),
  ],
 
  
}

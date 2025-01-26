/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        patternbold: ['"Pattern Blank Bold"'],
        patternregular: ['"Pattern Blank Regular"'],
        nunitoregular:['"Nunito Regular"'],
        nunitobold:['"Nunito Bold"'],
        nunitosemibold:['"Nunito SemiBold"'],
        nunitolight:['"Nunito Light"'],
        textShadow: {
          DEFAULT: '0 -1px 0 rgba(0, 0, 0, 0.4)',
        },



      },
      colors:{
        "logo-blue":"#59a2fd",
        "black_hover":"#1F2937",
        "main_bg_color":"#F0F7FF",
        "main_blue":"#006BFF"
      },
      backgroundColor:theme=>({
        'default':theme('')
      })
    },
  },
  plugins: [
    require('daisyui'),


  ],

  daisyui: {
    themes: true, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "light", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
}


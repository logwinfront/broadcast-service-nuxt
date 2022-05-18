module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './src/components/**/*.{vue,js}',
      './src/common/*.{js}',
      './src/layouts/**/*.vue',
      './src/pages/**/*.vue',
      './src/plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
    ],
    options: {
      safelist: [],
    },
    variants: {
      width: ['responsive', 'hover', 'focus'],
      margin: ['responsive', 'last'],
      // backgroundColor: ['hover', 'active', 'focus', 'odd'],
      textColor: ['hover', 'active', 'focus'],
      borderColor: ['hover', 'active', 'focus'],
      extend: {
        textColor: ['active', 'group-hover'],
        backgroundColor: ['odd', 'active'],
        // borderColor: ['active'],
        space: ['hover', 'focus'],
        position: ['hover', 'focus'],
        width: ['hover', 'focus'],
      },
    },
  },
  theme: {
    colors: {
      transparent: 'transparent',
      primary: {
        400: '#2a243e',
        DEFAULT: '#1f1b2e',
      },
      secondary: {
        200: '#ff7096',
        300: '#ff4778',
        400: '#ff1f5a',
        DEFAULT: '#ea003d',
        600: '#cc0036',
        700: '#a3002c',
        800: '#7a0021',
      },
      blue: {
        700: '#192039',
        800: '#100e19',
      },
      gray: {
        DEFAULT: '#9e9e9e',
        700: '#434a54',
      },
      white: '#fff',
      black: '#000',
    },
    screens: {
      xs: '375px',
      sm: '425px',
      md: '768px',
      lg: '1024px',
      xl: '1260px',
    },
    container: {
      center: true,
      padding: '10px',
    },
    zIndex: {
      0: 0,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
      75: 75,
      100: 100,
      auto: 'auto',
      max: 99999999,
    },
  },
  plugins: [
    // require('@tailwindcss/aspect-ratio')
  ],
}

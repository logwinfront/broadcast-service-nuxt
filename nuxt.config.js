import { resolve } from 'path'
import pkg from './package.json'

export default {
  version: pkg.version,

  alias: {
    '~': resolve(__dirname, './'),
  },

  srcDir: 'src/',

  telemetry: false,

  tailwindcss: {
    exposeConfig: true,
    configPath: '~~/tailwind.config.js',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/base.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    { src: '~/plugins/vue-awesome-swiper', mode: 'client' },
    // '~/plugins/vue-agile'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: '~/components', // will get any components nested in let's say /components/test too
      pathPrefix: false,
    },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/i18n',
  ],

  i18n: {
    vueI18nLoader: true,
    locales: [
      {
        code: 'en',
        iso: 'en-EN',
        file: 'en.js',
        dir: 'ltr',
        name: 'English',
        dateFnsCode: 'enGB',
      },
      {
        code: 'ru',
        iso: 'ru-RU',
        file: 'ru.js',
        dir: 'ltr',
        name: 'Русский',
        dateFnsCode: 'ru',
      },
    ],
    defaultLocale: 'ru',
    vueI18n: {
      fallbackLocale: 'ru',
    },
    lazy: true,
    langDir: '~/lang/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  proxy: {
    '/api': {
      target: 'https://api.sportefir.com',
      changeOrigin: true,
      logLevel: 'info',
      headers: {
        Connection: 'keep-alive',
      },
      // pathRewrite: { '^/api/': '' },
    },
    '/media': {
      target: 'https://api.sportefir.com',
      changeOrigin: true,
      logLevel: 'info',
      headers: {
        Connection: 'keep-alive',
      },
      // pathRewrite: { '^/api/': '' },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // axios: {
  //   // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
  //   baseURL: '/',
  // },

  router: {
    middleware: [],
    prefetchLinks: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vue-agile'],
  },
}

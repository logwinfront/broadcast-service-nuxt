import { resolve } from 'path'
import pkg from './package.json'

export default {
  version: pkg.version,

  alias: {
    '~': resolve(__dirname, './'),
  },

  env: {
    baseApiUrl: process.env.BASE_API_URL || 'http://10.8.0.7:8000',
  },

  srcDir: 'src/',

  server: {
    host: '0.0.0.0',
    port: 8090, // default: 3000
  },

  telemetry: false,

  tailwindcss: {
    exposeConfig: true,
    configPath: '~~/tailwind.config.js',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })

    return {
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content:
            'user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width',
        },
        { name: 'format-detection', content: 'telephone=no' },
        ...i18nHead.meta,
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        { rel: 'mask-icon', color: '#43b655', href: '/safari-pinned-tab.svg' },
        { rel: 'manifest', href: '/site.webmanifest' },
        ...i18nHead.link,
      ],
      htmlAttrs: {
        ...i18nHead.htmlAttrs,
      },
      bodyAttrs: {
        class: 'ui-scroll',
      },
    }
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
    'nuxt-trailingslash-module',
  ],

  trailingslash: {
    methods: ['GET', 'HEAD'],
  },

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
        name: '??????????????',
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
      target: process.env.BASE_API_URL,
      changeOrigin: true,
      logLevel: 'info',
      headers: {
        Connection: 'keep-alive',
      },
      // pathRewrite: { '^/api/': '' },
    },
    '/media': {
      target: process.env.BASE_API_URL,
      changeOrigin: true,
      logLevel: 'info',
      headers: {
        Connection: 'keep-alive',
      },
      // pathRewrite: { '^/api/': '' },
    },
  },

  router: {
    middleware: [],
    prefetchLinks: false,
    prefetchPayloads: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // transpile: ['vue-agile'],
  },
}

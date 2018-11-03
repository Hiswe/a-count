// TODO: add support for <i18n> blocks
// https://kazupon.github.io/vue-i18n/guide/sfc.html#webpack
// https://github.com/nuxt/nuxt.js/issues/772#issuecomment-331831119

export default {
  modulesDir: [`../node_modules`],
  css: [`@/assets/vuetify.styl`, `@/assets/global.scss`],
  plugins: [
    `@/plugins/vue-libraries.ts`,
    `@/plugins/global-acount-components.ts`,
    { src: `@/plugins/nuxt-client-init`, ssr: false },
  ],
  modules: [`nuxt-ts-module`, `@nuxtjs/axios`, `cookie-universal-nuxt`],
  router: {
    middleware: [`authenticated`, `handle-server-post`],
    linkExactActiveClass: `is-active`,
  },
  env: {
    COOKIE_NAME: `acount_nuxt`,
    JWT_FORMAT: `Bearer`,
  },
  axios: {
    baseURL: `http://localhost:4040/v1.1`,
    browserBaseURL: `http://localhost:4040/v1.1`,
    credentials: true,
  },
  head: {
    meta: [
      { charset: `utf-8` },
      { name: `viewport`, content: `width=device-width, initial-scale=1` },
      // rel="icon" href="/favicon.png" type="image/png"
      { 'http-equiv': `X-UA-Compatible`, content: `IE=edge` },
      { rel: `icon`, href: `/favicon.png`, type: `image/png` },
    ],
    link: [
      {
        rel: `stylesheet`,
        href: `https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons`,
      },
    ],
  },
}

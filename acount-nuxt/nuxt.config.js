export default {
  modulesDir: [`../node_modules`],
  css: [`@/assets/vuetify.styl`, `@/assets/global.scss`],
  plugins: [`@/plugins/vue-libraries.ts`],
  modules: [`nuxt-ts-module`, `@nuxtjs/axios`, `cookie-universal-nuxt`],
  router: {
    middleware: [`jwt-authentification`, `handle-server-post`, `authenticated`],
  },
  env: {
    COOKIE_NAME: `acount_nuxt`,
  },
  axios: {
    baseURL: `http://localhost:4040/v1`,
    browserBaseURL: `http://localhost:4040/v1`,
    credentials: true,
  },
  head: {
    meta: [
      { charset: `utf-8` },
      { name: `viewport`, content: `width=device-width, initial-scale=1` },
      { 'http-equiv': `X-UA-Compatible`, content: `IE=edge` },
    ],
    link: [
      {
        rel: `stylesheet`,
        href: `https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons`,
      },
    ],
  },
}

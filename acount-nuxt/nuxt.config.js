export default {
  modulesDir: [`../node_modules`],
  css: [`@/assets/vuetify.styl`, `@/assets/global.scss`],
  plugins: [`@/plugins/vue-libraries.ts`],
  modules: [`nuxt-ts-module`, `@nuxtjs/axios`],
  axios: {
    baseURL: `http://localhost:4040/v1`,
    // for SPA just force a relative URL
    browserBaseURL: `http://localhost:4040/v1`,
  },
  router: {
    middleware: [`handle-server-post`, `authenticated`],
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

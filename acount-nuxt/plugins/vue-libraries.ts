import Vue from 'vue'
import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'

import * as messages from '~/locales'

Vue.use(Vuetify, {
  // theme: {
  //   primary: '#3f51b5',
  //   secondary: '#b0bec5',
  //   accent: '#8c9eff',
  //   error: '#b71c1c',
  // },
})

Vue.use(VueI18n)

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    // locale: store.state.settings.locale,
    // locale: store.state.settings.locale,
    fallbackLocale: `en`,
    fallbackRoot: true,
    silentTranslationWarn: true,
    messages,
  })

  // // https://vuex.vuejs.org/api/#watch
  // store.watch(
  //   state => state.settings.locale,
  //   newLocale => (app.i18n.locale = newLocale),
  // )
}

import Vue from 'vue'
import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'

import * as messages from '~/locales'
import numberFormats from '~/locales/number-formats'
import dateTimeFormats from '~/locales/date-time-formats'

Vue.use(Vuetify, {
  theme: {
    primary: '#4c409a',
    secondary: '#b0bec5',
    accent: '#2297cc',
    error: '#b71c1c',
  },
  options: {
    customProperties: true,
  },
})

Vue.use(VueI18n)

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    // locale: store.state.settings.locale,
    locale: `en`,
    fallbackLocale: `en`,
    fallbackRoot: true,
    silentTranslationWarn: true,
    messages,
    numberFormats,
    dateTimeFormats,
  })

  // // https://vuex.vuejs.org/api/#watch
  // store.watch(
  //   state => state.settings.locale,
  //   newLocale => (app.i18n.locale = newLocale),
  // )
}

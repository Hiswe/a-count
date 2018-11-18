<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

import numberFormats from '~/locales/number-formats'
import { CustomersState } from '~/types/acount-store'
import { NEW_CUSTOMER } from '~/store/customers'

const i18n = {
  numberFormats,
  messages: {
    en: {
      title: `new customer`,
    },
    fr: {
      title: `nouveau client`,
    },
  },
}

export default Vue.extend({
  name: `page-new-customer`,
  i18n,
  meta: {
    authRequired: true,
  },
  async fetch(nuxtContext) {
    const { store, route } = nuxtContext
    await store.dispatch(`customers/${NEW_CUSTOMER}`)
  },
  computed: {
    ...mapState<CustomersState>(`customers`, {
      customer: state => state.current,
    }),
  },
})
</script>

<template lang="pug">
acount-main-content(:title="$t( `title` )")
</template>

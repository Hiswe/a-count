<script lang="ts">
import Vue from 'vue'

import { ALL_CUSTOMERS } from '~/store/customers'

export default Vue.extend({
  name: `page-customers-list`,
  meta: {
    authRequired: true,
  },
  async fetch(nuxtContext) {
    const { store } = nuxtContext
    await store.dispatch(`customers/${ALL_CUSTOMERS}`)
  },
})
</script>

<template lang="pug">
  h1 {{ $t(`shared.customers`) }}
</template>

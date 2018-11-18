<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'

import { QuotationsState } from '~/types/acount-store'
import { ALL_QUOTATIONS } from '~/store/quotations'

export default Vue.extend({
  name: `page-quotations-list`,
  meta: {
    authRequired: true,
  },
  async fetch(nuxtContext) {
    const { store } = nuxtContext
    await store.dispatch(`quotations/${ALL_QUOTATIONS}`)
  },
  data() {
    return {
      headers: [
        {
          text: `#`,
          value: `reference`,
        },
        {
          text: this.$t(`table.header.name`),
          value: `name`,
        },
        {
          text: this.$t(`table.header.customer`),
          value: `customer.name`,
        },
        {
          text: this.$t(`table.header.sent`),
          value: `sendAt`,
          align: `right`,
        },
        {
          text: this.$t('table.header.validated'),
          value: `validatedAt`,
        },
        {
          text: this.$t('table.amount.total'),
          value: `total`,
        },
        {
          text: ``,
          value: `id`,
        },
      ],
    }
  },
  computed: {
    ...mapState<QuotationsState>(`quotations`, {
      items: state => state.active,
    }),
  },
})
</script>

<template lang="pug">
acount-main-content(:title="$t( `shared.quotations` )")
  template(slot="centered")
    v-data-table(
        :headers="headers"
        :items="items"
      )
        template(slot="items" slot-scope="props")
          tr
            td
              nuxt-link(:to="`/quotations/${props.item.id}`") {{props.item.reference}}
            td
              nuxt-link(:to="`/quotations/${props.item.id}`") {{ props.item.name }}
            td
              nuxt-link(:to="`/customers/${props.item.customerId}`") {{ props.item.customer.name }}
            td {{ props.item.sendAt }}
            td {{ props.item.validatedAt }}
            td.text-xs-right {{ $n(props.item.total, `currency`) }}
            td remove
</template>

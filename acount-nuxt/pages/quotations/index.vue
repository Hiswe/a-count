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
          text: this.$t(`table.header.name`),
          value: `name`,
          align: `left`,
        },
        {
          text: this.$t(`table.header.quotations`),
          value: `quotationsCount`,
          align: `right`,
          // width: `6em`,
          sortable: false,
        },
        {
          text: this.$t(`table.header.cumulative-amount`),
          value: `quotationsTotal`,
          align: `right`,
          // width: `1em`,
        },
        {
          text: this.$t(`table.header.invoices`),
          value: `invoicesCount`,
          align: `right`,
          // align: `left`,
        },
        {
          text: this.$t(`table.header.cumulative-amount`),
          value: `invoicesTotal`,
          align: `right`,
          // align: `left`,
          // width: `6em`,
        },
        {
          text: this.$t('table.amount.paid'),
          value: `invoicesTotalPaid`,
          sortable: false,
          // width: `1em`,
        },
      ],
    }
  },
  computed: {
    ...mapState(`quotations`, {
      items: (state: QuotationsState) => state.active,
    }),
  },
})
</script>

<template lang="pug">
acount-main-content(:title="$t( `shared.quotations` )")

</template>

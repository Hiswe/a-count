<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

import { CustomersState } from '~/types/acount-customers'
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
  computed: {
    ...mapState(`customers`, {
      items: (state: CustomersState) => state.active,
    }),
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
})
</script>

<template lang="pug">
  div
    h1 {{ $t(`shared.customers`) }}
    v-data-table(
      :headers="headers"
      :items="items"
    )
      template(slot="items" slot-scope="props")
        tr
          td
            nuxt-link(:to="`/customers/${props.item.id}`") {{props.item.name}}
          td.text-xs-right {{ props.item.quotationsCount }}
          td.text-xs-right {{ $n(props.item.quotationsTotal, `currency`) }}
          td.text-xs-right {{ props.item.invoicesCount }}
          td.text-xs-right {{ $n(props.item.invoicesTotal, `currency`) }}
          td
            acount-progress(
              :value="props.item.invoicesTotalPaid"
              :max="props.item.invoicesTotal"
            )
      </tr>
    </template>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

import numberFormats from '~/locales/number-formats'
import { CustomersState } from '~/types/acount-store'
import { ALL_CUSTOMERS } from '~/store/customers'

const i18n = {
  numberFormats,
  messages: {
    en: {
      'new-customer': `new customer`,
    },
    fr: {
      'new-customer': `nouveau client`,
    },
  },
}

export default Vue.extend({
  name: `page-customers-list`,
  i18n,
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
acount-main-content(:title="$t( `shared.customers` )")
  template(slot="actions")
    v-btn(to="/customers/new" color="accent") {{$t( `new-customer` )}}
    //- v-btn(fab dark color="accent" type="submit" form="settings")
    //-   v-icon(dark medium) save
  template(slot="centered")
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
</template>

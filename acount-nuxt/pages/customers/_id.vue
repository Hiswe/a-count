<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import cloneDeep from 'lodash.clonedeep'

import numberFormats from '~/locales/number-formats'
import { CustomersState, QuotationsState } from '~/types/acount-store'
import {} from '~/store/quotations'
import { CUSTOMER_QUOTATIONS } from '~/store/quotations'
import { READ_CUSTOMER, UPDATE_CUSTOMER } from '~/store/customers'
import {
  AcountKeyPresentation,
  AcountKeyPresentationItem,
} from '~/components/key-presentation'
import { AcountCustomerQuotations } from '~/components/customers'

const i18n = {
  numberFormats,
  messages: {
    en: {
      'total-quotations': `quotations total`,
      'total-invoices': `invoices total`,
      'to-be-paid': `to be paid`,
      'payment-progress': `payment progress`,
    },
    fr: {
      'total-quotations': `total devis`,
      'total-invoices': `total factures`,
      'to-be-paid': `à payer`,
      'payment-progress': `progression des paiements`,
    },
  },
}

export default Vue.extend({
  name: `page-edit-customer`,
  i18n,
  components: {
    AcountKeyPresentation,
    AcountKeyPresentationItem,
    AcountCustomerQuotations,
  },
  meta: {
    authRequired: true,
  },
  async fetch(nuxtContext) {
    const { store, route } = nuxtContext
    const { id } = route.params
    await Promise.all([
      store.dispatch(`customers/${READ_CUSTOMER}`, id),
      store.dispatch(`quotations/${CUSTOMER_QUOTATIONS}`, id),
    ])
  },
  created() {
    this.form = cloneDeep(this.customer)
  },
  data() {
    return {
      form: {},
      quotationHeaders: [
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
    id() {
      return this.$route.params.id
    },
    ...mapState<CustomersState>(`customers`, {
      customer: state => state.current,
    }),
    ...mapState<QuotationsState>(`quotations`, {
      quotations: state => state.active,
    }),
  },
  methods: {
    submit() {
      this.updateCustomer(this.form)
    },
    ...mapActions(`customers`, {
      updateCustomer: UPDATE_CUSTOMER,
    }),
  },
})
</script>

<template lang="pug">
acount-main-content(title="#edit customer")
  acount-tabs
    template(slot="header")
      acount-key-presentation
        acount-key-presentation-item(:title="$t( `total-quotations` )")
          | {{$n( form.quotationsTotal, `currency` )}}
        acount-key-presentation-item(:title="$t( `total-invoices` )")
          | {{$n( form.invoicesTotal, `currency` )}}
        acount-key-presentation-item(:title="$t( `to-be-paid` )")
          | {{$n( form.invoicesTotalLeft, `currency` )}}
        acount-key-presentation-item(:title="$t( `payment-progress` )")
          acount-progress(
            :value="form.invoicesTotalPaid"
            :max="form.invoicesTotal"
          )
    acount-tab(:title="$t( `shared.quotations` )")
      AcountCustomerQuotations(:items="quotations")
    acount-tab(:title="$t( `shared.invoices` )")
      | #invoices
    acount-tab(:title="$t( `shared.address` )")
      acount-grid
        form(
          :action="`/customers/${id}`"
          method="post"
          @submit.prevent="submit"
        )
          input(
            name="id"
            type="hidden"
            v-model="form.id"
          )
          acount-input(
            name="name"
            :label="$t(`form.name`)"
            v-model="form.name"
          )
          acount-textarea(
            name="address"
            :label="$t(`shared.address`)"
            v-model="form.address"
          )
          v-btn(color="accent" type="submit") {{ $t(`form.update`) }}
        acount-paper(part="top-right")
          acount-party(title="to" :people="form" )
</template>


<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import cloneDeep from 'lodash.clonedeep'

import numberFormats from '~/locales/number-formats'
import { CustomersState } from '~/types/acount-store'
import { READ_CUSTOMER, UPDATE_CUSTOMER } from '~/store/customers'
import {
  AcountKeyPresentation,
  AcountKeyPresentationItem,
} from '~/components/key-presentation'

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
  },
  meta: {
    authRequired: true,
  },
  async fetch(nuxtContext) {
    const { store, route } = nuxtContext
    const { id } = route.params
    await store.dispatch(`customers/${READ_CUSTOMER}`, id)
  },
  created() {
    this.form = cloneDeep(this.customer)
  },
  data() {
    return {
      form: {},
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    ...mapState<CustomersState>(`customers`, {
      customer: state => state.current,
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
              :value="10"
              :max="20"
            )
    acount-tab(title="#quotations")
      | #headers
    acount-tab(title="#invoices")
      | #invoices
    acount-tab(title="#header")
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
        v-text-field(
          name="name"
          :label="$t(`form.name`)"
          v-model="form.name"
        )
        v-textarea(
          name="address"
          :label="$t(`form.address`)"
          v-model="form.address"
        )
        v-btn(color="accent" type="submit") {{ $t(`form.update`) }}
</template>


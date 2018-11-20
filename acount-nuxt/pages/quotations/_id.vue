<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import cloneDeep from 'lodash.clonedeep'

import numberFormats from '~/locales/number-formats'
import { QuotationsState, CustomersState } from '~/types/acount-store'
import { READ_QUOTATION } from '~/store/quotations'
import { ALL_CUSTOMERS } from '~/store/customers'

const i18n = {
  numberFormats,
  messages: {
    en: {
      title: `quotation: {reference}`,
    },
    fr: {
      title: `devis : {reference}`,
    },
  },
}

export default Vue.extend({
  name: `page-edit-quotation`,
  i18n,
  meta: {
    authRequired: true,
  },
  async fetch(nuxtContext) {
    const { store, route } = nuxtContext
    const { id } = route.params
    await Promise.all([
      store.dispatch(`quotations/${READ_QUOTATION}`, id),
      store.dispatch(`customers/${ALL_CUSTOMERS}`),
    ])
  },
  created() {
    this.form = cloneDeep(this.quotation)
  },
  data() {
    return {
      form: {},
    }
  },
  computed: {
    ...mapState<QuotationsState>(`quotations`, {
      quotation: state => state.current,
    }),
    ...mapState<CustomersState>(`customers`, {
      customers: state => state.active,
    }),
  },
})
</script>

<template lang="pug">
form
  acount-main-content(:title="$t( `title`, {reference: form.reference} )")
    acount-header
      .quotation-dates
        acount-datepicker(
          name="sendAt"
          label="#sendAt"
          v-model="form.sendAt"
        )
        acount-datepicker(
          name="validatedAt"
          label="#validatedAt"
          v-model="form.validatedAt"
        )
        acount-datepicker(
          name="signedAt"
          label="#signedAt"
          v-model="form.signedAt"
        )
      .quotation-meta
        acount-select(
          v-model="form.customerId"
          name="customerId"
          itemText="name"
          itemValue="id"
          :items="customers"
          :label="$t( `shared.customer` )"
        )
        acount-input(
          v-model="form.tax"
          name="tax"
          type="number"
          :label="$t( `shared.tax` )"
        )
    template(slot="centered")
      acount-paper
        acount-input(
          v-model="form.name"
          name="name"
          :label="$t( `form.subject` )"
        )
        acount-table-edit-products(
          :document="form"
        )

</template>

<style lang="scss" scoped>
.quotation-dates {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--s-gutter);
  padding-bottom: var(--s-gutter);
}
.quotation-meta {
  display: grid;
  grid-template-columns: 1fr 150px;
  grid-gap: var(--s-gutter) var(--s-two-gutter);
}
</style>

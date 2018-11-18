<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import cloneDeep from 'lodash.clonedeep'

import numberFormats from '~/locales/number-formats'
import { CustomersState } from '~/types/acount-store'
import { BLANK_CUSTOMER, CREATE_CUSTOMER } from '~/store/customers'

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
    await store.dispatch(`customers/${BLANK_CUSTOMER}`)
  },
  data() {
    return {
      form: {},
    }
  },
  created() {
    this.form = cloneDeep(this.customer)
  },
  computed: {
    ...mapState<CustomersState>(`customers`, {
      customer: state => state.current,
    }),
  },
  methods: {
    ...mapActions(`customers`, {
      createCustomer: CREATE_CUSTOMER,
    }),
    submit() {
      this.createCustomer(this.form)
    },
  },
})
</script>

<template lang="pug">
acount-main-content(:title="$t( `title` )")
  template(slot="actions")
    v-btn(fab dark color="accent" type="submit" form="new-customer")
      v-icon(dark medium) save
  acount-header
    form(
      id="new-customer"
      action="/customers/new"
      method="post"
      @submit.prevent="submit"
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
  template(slot="centered")
    acount-paper(part="top")
      acount-party-user
      acount-party(title="to" :people="form" )
</template>

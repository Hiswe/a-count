<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

import { CustomersState } from '~/types/acount-customers'
import { GET_CUSTOMER } from '~/store/customers'

export default Vue.extend({
  name: `page-edit-customer`,
  meta: {
    authRequired: true,
  },
  async fetch(nuxtContext) {
    const { store, route } = nuxtContext
    const { id } = route.params
    await store.dispatch(`customers/${GET_CUSTOMER}`, id)
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    ...mapState(`customers`, {
      customer: (state: CustomersState) => state.current,
    }),
  },
})
</script>

<template lang="pug">

section
  h1 #edit customer
  form(
    :action="`/customers/${id}`"
    method="post"
  )
    v-text-field(
      name="name"
      :label="$t(`form.name`)"
      v-model="customer.name"
    )
    v-textarea(
      name="address"
      :label="$t(`form.address`)"
      v-model="customer.address"
    )

</template>


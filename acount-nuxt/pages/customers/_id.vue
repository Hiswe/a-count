<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import cloneDeep from 'lodash.clonedeep'

import { CustomersState } from '~/types/acount-customers'
import { READ_CUSTOMER, UPDATE_CUSTOMER } from '~/store/customers'

export default Vue.extend({
  name: `page-edit-customer`,
  meta: {
    authRequired: true,
  },
  async fetch(nuxtContext) {
    const { store, route } = nuxtContext
    const { id } = route.params
    await store.dispatch(`customers/${READ_CUSTOMER}`, id)
  },
  mounted() {
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
    ...mapState(`customers`, {
      customer: (state: CustomersState) => state.current,
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
section
  h1 #edit customer
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

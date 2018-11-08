<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import clonedeep from 'lodash.clonedeep'

import numberFormats from '~/locales/number-formats'
import { UserState } from '~/types/acount-store'
import { UPDATE_USER } from '~/store/user'

const i18n = {
  numberFormats,
  messages: {
    en: {
      from: `from`,
      'default-product': `Default product`,
      mentions: `Footer mentions`,
      reference: `Reference number`,
    },
    fr: {
      from: `Coordonnées`,
      'default-product': `Produit par défaut`,
      mentions: `Bas de page`,
      reference: `Nº de référence`,
    },
  },
}
const customerExample = {
  name: `Customer name`,
  address: `123 6th St.
__Melbourne, FL 32904__
AUSTRALIA`,
}
const currencies = [
  { value: `USD`, label: `US Dollars` },
  { value: `EUR`, label: `Euros` },
  { value: `THB`, label: `Thai Bahts` },
]
const languages = [
  { value: `fr`, label: `français` },
  { value: `en`, label: `english` },
]

export default Vue.extend({
  name: `page-settings`,
  i18n,
  meta: {
    authRequired: true,
  },
  data() {
    return { form: {} }
  },
  computed: {
    ...mapState<UserState>(`user`, {
      user: state => state.user,
    }),
  },
  created() {
    this.updateForm()
  },
  methods: {
    async submit() {
      await this.updateUser(this.form)
      this.updateForm()
    },
    updateForm() {
      this.form = clonedeep(this.user)
    },
    ...mapActions(`user`, {
      updateUser: UPDATE_USER,
    }),
  },
})
</script>

<template lang="pug">
acount-main-content(title="#settings")
  acount-tabs
    template(slot="header")
      | {{ user.lang }}
      |
      | {{ user.currency }}
    acount-tab(:title="$t(`from`)")
      acount-grid
        acount-paper(part="top-left")
          acount-party(title="from" :people="form" )
        form(
          id="login"
          action="/account/settings"
          method="post"
          @submit.prevent="submit"
        )
          v-text-field(
            name="name"
            :label="$t(`form.name`)"
            v-model="form.name"
          )
          v-textarea(
            name="address"
            :label="$t(`shared.address`)"
            v-model="form.address"
          )
          v-btn(color="accent" type="submit") {{ $t(`form.update`) }}
    acount-tab(:title="$t(`default-product`)")
      | {{$t(`default-product`)}}
    acount-tab(:title="$t(`mentions`)")
      | {{$t(`footer-mentions`)}}
    acount-tab(:title="$t(`reference`)")
      | {{$t(`reference`)}}
</template>

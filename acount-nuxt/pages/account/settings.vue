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
      'mention-quotation': `Footer quotations`,
      'mention-invoice': `Footer invoices`,
      reference: `Reference number`,
    },
    fr: {
      from: `Coordonnées`,
      'default-product': `Produit par défaut`,
      'mention-quotation': `Mentions des devis`,
      'mention-invoice': `Mentions des factures`,
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
acount-main-content(:title="$t( `shared.settings` )")
  template(slot="actions")
    v-btn(fab dark color="accent" type="submit" form="settings")
      v-icon(dark medium) save
  form(
    id="settings"
    action="/account/settings"
    method="post"
    @submit.prevent="submit"
  )
    acount-tabs
      template(slot="header")
        | {{ user.lang }}
        |
        | {{ user.currency }}
      acount-tab(:title="$t(`from`)")
        acount-grid
          acount-paper(part="top-left")
            acount-party(title="from" :people="form" )
          div
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
      acount-tab(:title="$t(`default-product`)")
        | {{$t(`default-product`)}}
      acount-tab(:title="$t(`mention-quotation`)")
        v-textarea(
          name="quotationConfig[mentions]"
          :label="$t(`mention-quotation`)"
          v-model="form.quotationConfig.mentions"
        )
        acount-paper(part="bottom")
          acount-mentions(:content="form.quotationConfig.mentions" signature)
      acount-tab(:title="$t(`mention-invoice`)")
        v-textarea(
          name="invoiceConfig[mentions]"
          :label="$t(`mention-invoice`)"
          v-model="form.invoiceConfig.mentions"
        )
        acount-paper(part="bottom")
          acount-mentions(:content="form.invoiceConfig.mentions")
      acount-tab(:title="$t(`reference`)")
        | {{$t(`reference`)}}
</template>

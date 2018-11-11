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
      'reference-warning': `Changing <strong>the starting number</strong> will renumber all references of the type concerned.
        <br />
        Be cautious!`,
      prefix: `prefix`,
      'start-at': `start at`,
      quantity: `quantity`,
      'default-price': `default price`,
      tax: `tax`,
      language: `language`,
      currency: `currency`,
    },
    fr: {
      from: `Coordonnées`,
      'default-product': `Produit par défaut`,
      'mention-quotation': `Mentions des devis`,
      'mention-invoice': `Mentions des factures`,
      reference: `Nº de référence`,
      'reference-warning': `Changer <strong>le chiffre de début</strong> renumérotera toutes les références du type concerné.
        <br />
        Soyez prudent !`,
      prefix: `préfixe`,
      'start-at': `commence à`,
      quantity: `quantité`,
      'default-price': `prix par défaut`,
      tax: `taxe`,
      language: `langue`,
      currency: `devise`,
    },
  },
}
const languages = [
  { value: `fr`, text: `français` },
  { value: `en`, text: `english` },
]
const currencies = [
  { value: `USD`, text: `US Dollars` },
  { value: `EUR`, text: `Euros` },
  { value: `THB`, text: `Thai Bahts` },
]
const now = new Date().toUTCString()

export default Vue.extend({
  name: `page-settings`,
  i18n,
  meta: {
    authRequired: true,
  },
  data() {
    return { form: {}, currencies, languages }
  },
  computed: {
    ...mapState<UserState>(`user`, {
      user: state => state.user,
    }),
    fakeQuotationReference() {
      const { quotationConfig } = this.form
      return {
        sendAt: now,
        reference: `${quotationConfig.prefix}${quotationConfig.startAt}`,
      }
    },
    fakeInvoiceReference() {
      const { invoiceConfig } = this.form
      return {
        sendAt: now,
        reference: `${invoiceConfig.prefix}${invoiceConfig.startAt}`,
      }
    },
    fakeDocument() {
      const { productConfig, quotationConfig } = this.form
      return {
        products: [
          {
            _id: `fake-product-1`,
            checked: true,
            description: `a __product__ example`,
            quantity: 2,
            price: productConfig.price,
          },
          {
            _id: `fake-product-2`,
            checked: true,
            ...productConfig,
          },
        ],
        tax: quotationConfig.tax,
      }
    },
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
        acount-grid
          acount-select(
            v-model="form.lang"
            name="lang"
            :items="languages"
            :label="$t( `language` )"
          )
          acount-select(
            v-model="form.currency"
            name="currency"
            :items="currencies"
            :label="$t( `currency` )"
          )
      acount-tab(:title="$t(`from`)")
        acount-grid
          acount-paper(part="top-left")
            acount-party(title="from" :people="form" )
          div
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
      acount-tab(:title="$t(`default-product`)")
        .default-product
          acount-input(
            name="productConfig[quantity]"
            :label="$t( `quantity` )"
            type="number"
            v-model="form.productConfig.quantity"
          )
          acount-input(
            name="productConfig[price]"
            :label="$t( `default-price` )"
            type="number"
            v-model="form.productConfig.price"
          )
          acount-input(
            name="quotationConfig[tax]"
            :label="$t( `tax` )"
            type="number"
            v-model="form.quotationConfig.tax"
          )
        acount-table-products(
          :document="fakeDocument"
        )
      acount-tab(:title="$t(`mention-quotation`)")
        acount-textarea(
          name="quotationConfig[mentions]"
          :label="$t(`mention-quotation`)"
          v-model="form.quotationConfig.mentions"
        )
        acount-paper(part="bottom")
          acount-mentions(:content="form.quotationConfig.mentions" signature)
      acount-tab(:title="$t(`mention-invoice`)")
        acount-textarea(
          name="invoiceConfig[mentions]"
          :label="$t(`mention-invoice`)"
          v-model="form.invoiceConfig.mentions"
        )
        acount-paper(part="bottom")
          acount-mentions(:content="form.invoiceConfig.mentions")
      acount-tab(:title="$t(`reference`)")
        v-alert(
          :value="true"
          color="warning"
          icon="warning"
        ): span(style="color: black;" v-html="$t( `reference-warning` )")
        acount-grid
          dl.reference
            dt.reference__title(v-text="$t( `shared.quotations` )")
            dd.reference__form
              acount-input(
                name="quotationConfig[prefix]"
                :label="$t(`prefix`)"
                v-model="form.quotationConfig.prefix"
              )
              acount-input(
                name="quotationConfig[startAt]"
                type="number"
                :label="$t(`start-at`)"
                v-model="form.quotationConfig.startAt"
              )
            dd.reference__output
              acount-paper(part="top-right")
                acount-reference(
                  type="quotation"
                  :product="fakeQuotationReference"
                )
          dl.reference
            dt.reference__title(v-text="$t( `shared.invoices` )")
            dd.reference__form
              acount-input(
                name="invoiceConfig[prefix]"
                :label="$t(`prefix`)"
                v-model="form.invoiceConfig.prefix"
              )
              acount-input(
                name="invoiceConfig[startAt]"
                type="number"
                :label="$t(`start-at`)"
                v-model="form.invoiceConfig.startAt"
              )
            dd.reference__output
              acount-paper(part="top-right")
                acount-reference(
                  type="invoice"
                  :product="fakeInvoiceReference"
                )
</template>

<style lang="scss" scoped>
.reference {
  &__title {
    font-weight: 700;
    font-size: 1.25rem;
  }
  &__form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--s-gutter);
  }
}
.default-product {
  display: grid;
  max-width: 400px;
  margin: 0 auto;
  grid-template-columns: 5rem 1fr 5rem;
  grid-gap: var(--s-gutter);
}
</style>

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
const now = new Date().toUTCString()

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
            acount-textarea(
              name="address"
              :label="$t(`shared.address`)"
              v-model="form.address"
            )
      acount-tab(:title="$t(`default-product`)")
        .default-product
          v-text-field(
            name="productConfig[quantity]"
            :label="$t( `quantity` )"
            type="number"
            v-model="form.productConfig.quantity"
          )
          v-text-field(
            name="productConfig[price]"
            :label="$t( `default-price` )"
            type="number"
            v-model="form.productConfig.price"
          )
          v-text-field(
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
              v-text-field(
                name="quotationConfig[prefix]"
                :label="$t(`prefix`)"
                v-model="form.quotationConfig.prefix"
              )
              v-text-field(
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
              v-text-field(
                name="invoiceConfig[prefix]"
                :label="$t(`prefix`)"
                v-model="form.invoiceConfig.prefix"
              )
              v-text-field(
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

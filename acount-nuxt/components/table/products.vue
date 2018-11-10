<script lang="ts">
import Vue from 'vue'
import {
  computeProductTotal,
  computeTotals,
  enforceNumber,
} from '@acount/helpers'

import numberFormats from '~/locales/number-formats'

const i18n = {
  numberFormats,
  messages: {
    en: {
      'amount-ht': `pre-tax amount`,
      'amount-tax': `taxes`,
      'amount-total': `amount`,
    },
    fr: {
      'amount-ht': `montant HT`,
      'amount-tax': `taxes`,
      'amount-total': `total`,
    },
  },
}

export default Vue.extend({
  name: `acount-table-product`,
  i18n,
  props: {
    document: {
      type: Object,
      default: {},
    },
  },
  computed: {
    products() {
      return this.document.products.map(product => ({
        ...product,
        total: computeProductTotal(product),
      }))
    },
    totals() {
      return computeTotals(this.document)
    },
    tax() {
      return enforceNumber(this.document.tax)
    },
  },
})
</script>

<template lang="pug">
table.acount-table-product
  thead
    tr.acount-table-product__header
      th #description
      th #quantity
      th #unit-price
      th #amount
  tbody
    tr(
      v-for="(product, index) in products"
      :key="product._id"
    )
      td: acount-markdown(:source="product.description")
      td.number {{ product.quantity }}
      td.number {{ $n(product.price, `currency`) }}
      td.number {{ $n(product.total, `currency` ) }}
  tfoot
    tr(v-if="tax")
      td.number(colspan="3") {{$t( `amount-ht` )}}
      td.number {{$n( totals.totalNet, `currency` )}}
    tr(v-if="tax")
      td.number(colspan="3") {{$t( `amount-tax` )}}
      td.number {{$n( totals.totalTax, `currency` )}}
    tr(v-if="")
      td.number(colspan="3") {{$t( `amount-total` )}}
      td.number {{$n( totals.total, `currency` )}}
</template>

<style lang="scss" scoped>
.acount-table-product {
  border-collapse: collapse;
  width: 100%;

  th,
  td {
    padding: 0.5em 0.75em;
  }
  th {
    font: inherit;
    font-weight: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-transform: uppercase;
    font-size: 12px;
    padding: 1em 1.3em;
    background: black;
    color: white;

    @media #{$mq-print} {
      // box-shadow act as a background for print
      box-shadow: inset black 0 0 0 100px;
    }
  }
  .number {
    text-align: right;
  }
  tbody td {
    border: solid black;
    border-width: 0 1px 1px;
  }
  tfoot {
    font-weight: 700;
    td {
      padding-bottom: 0;
    }
    tr:not(:first-child) td {
      padding-top: 0;
    }
  }
  /deep/ p {
    margin: 0;
  }
}
</style>


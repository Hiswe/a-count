<script lang="ts">
import Vue from 'vue'
import {
  computeProductTotal,
  computeTotals,
  enforceNumber,
} from '@acount/helpers'

export default Vue.extend({
  name: `acount-edit-products`,
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
table.acount-table-edit-products
  thead
    tr.acount-table-edit-products__header
      th
      th #description
      th #quantity
      th #unit-price
      th #amount
      th
  tbody
    tr(
      v-for="(product, index) in products"
      :key="product._id"
    )
      td
      td {{ product.description }}
      td.number {{ product.quantity }}
      td.number {{ product.price }}
      td.number {{ $n(product.total, `currency` ) }}
      td
  tfoot.acount-table-edit-products__footer
    tr(v-if="tax")
      td.number(colspan="4") {{$t( `amount.ht` )}}
      td.number(colspan="2") {{$n( totals.totalNet, `currency` )}}
    tr(v-if="tax")
      td.number(colspan="4") {{$t( `amount.tax` )}}
      td.number(colspan="2") {{$n( totals.totalTax, `currency` )}}
    tr(v-if="")
      td.number(colspan="4") {{$t( `amount.total` )}}
      td.number(colspan="2") {{$n( totals.total, `currency` )}}
</template>

<style lang="scss" scoped>
@import './table-mixins';

.acount-table-edit-products {
  @include products-base();
  --products-header: var(--c-primary-darker);
  --products-border: var(--c-primary-lighter);

  &__footer {
    background: var(--c-primary-lightest);
    border: 1px solid var(--products-border);

    td {
      padding: 0.5em 0.75em;
    }
  }
}
</style>

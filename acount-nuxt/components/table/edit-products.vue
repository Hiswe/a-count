<script lang="ts">
import Vue from 'vue'
import {
  computeProductTotal,
  computeTotals,
  computeQuotation,
  enforceNumber,
} from '@acount/helpers'

export default Vue.extend({
  name: `acount-edit-products`,
  props: {
    value: {
      type: Object,
      default: {},
    },
  },
  computed: {
    quotation() {
      return computeQuotation(this.value)
    },
    totals() {
      return computeTotals(this.value)
    },
    tax() {
      return enforceNumber(this.value.tax)
    },
  },
  methods: {
    onInput(event) {
      this.$emit(`input`, this.quotation)
    },
  },
})
</script>

<template lang="pug">
table.acount-table-edit-products(@input="onInput")
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
      v-for="(product, index) in quotation.products"
      :key="product._id"
    )
      td.acount-table-cell.acount-table-cell--checkbox
        input(
          type="hidden"
          :name="`${product.path}[_id]`"
          :value="product.id"
        )
        acount-checkbox(
          :name="`${product.path}[checked]`"
          v-model="product.checked"
        )
      td.acount-table-cell.acount-table-cell--description
        acount-textarea(
          :name="`${product.path}[description]`"
          v-model="product.description"
          rows="1"
        )
      td.acount-table-cell.acount-table-cell--quantity.number
        input(
          v-model.number="product.quantity"
          :name="`${product.path}[quantity]`"
          type="number"
          min="0"
          step="0.25"
        )
      td.acount-table-cell.acount-table-cell--price.number
        input(
          v-model.number="product.price"
          :name="`${product.path}[price]`"
          type="number"
          min="0"
          step="0.5"
        )
      td.acount-table-edit-products__cell.acount-table-cell--total
        | {{ $n(product.total, `currency` ) }}
      td.acount-table-edit-products__cell
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

  .acount-table-cell {
    vertical-align: top;

    &--description,
    &--quantity,
    &--price {
      padding: 0;
    }
    &--checkbox {
      width: 2.5em;
    }
    &--quantity {
      width: 3em;
    }
    &--price {
      width: 5em;
    }
    &--total {
      width: 7em;
      text-align: right;
    }
  }
  input {
    text-align: right;
    width: 100%;
    display: block;
    padding: 0.5em 0.75em;
  }
  &__footer {
    background: var(--c-primary-lightest);
    border: 1px solid var(--products-border);

    td {
      padding: 0.5em 0.75em;
    }
  }
}
</style>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: `acount-edit-products`,
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
  //- tbody
  //-   tr(
  //-     v-for="(product, index) in products"
  //-     :key="product._id"
  //-   )
  //-     td: acount-markdown(:source="product.description")
  //-     td.number {{ product.quantity }}
  //-     td.number {{ $n(product.price, `currency`) }}
  //-     td.number {{ $n(product.total, `currency` ) }}
  //- tfoot
  //-   tr(v-if="tax")
  //-     td.number(colspan="3") {{$t( `amount-ht` )}}
  //-     td.number {{$n( totals.totalNet, `currency` )}}
  //-   tr(v-if="tax")
  //-     td.number(colspan="3") {{$t( `amount-tax` )}}
  //-     td.number {{$n( totals.totalTax, `currency` )}}
  //-   tr(v-if="")
  //-     td.number(colspan="3") {{$t( `amount-total` )}}
  //-     td.number {{$n( totals.total, `currency` )}}
</template>

<style lang="scss" scoped>
@import './table-mixins';

.acount-table-edit-products {
  @include products-base();

  th {
    background: var(--c-primary-darker);
  }
}
</style>

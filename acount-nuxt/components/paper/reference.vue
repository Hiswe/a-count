<script lang="ts">
import Vue from 'vue'

import dateTimeFormats from '~/locales/date-time-formats'

const PARTY_NAMES = [`quotation`, `invoice`]
const i18n = {
  messages: {
    en: {
      date: `date: `,
    },
    fr: {
      date: `date : `,
    },
  },
  dateTimeFormats,
}

export default Vue.extend({
  name: `acount-paper-reference`,
  i18n,
  props: {
    type: {
      type: String,
      required: true,
      validator(value?: string): boolean {
        if (!value) return false
        return PARTY_NAMES.indexOf(value) !== -1
      },
    },
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    reference() {
      return `Ref. ${this.product.reference}`
    },
    date() {
      return this.product.sendAt
        ? new Date(this.product.sendAt)
        : this.product.createdAt
          ? new Date(this.product.createdAt)
          : new Date()
    },
  },
})
</script>

<template lang="pug">
header.acount-paper-reference
  h3.acount-paper-reference__type
    | {{ this.type }}
  h4.acount-paper-reference__id
    | {{ this.reference }}
  p.acount-paper-reference__date
    | {{ $t(`date`) }}{{ $d(this.date, `short`) }}
</template>

<style lang="scss" scoped>
.acount-paper-reference {
  text-align: right;
  margin-top: 0;

  &__type,
  &__id,
  &__date {
    margin: 0;
    text-transform: capitalize;
  }
  &__type {
    font-size: var(--sheet-big-font-size);
  }
  &__id {
    font-weight: normal;
    font-size: var(--sheet-big-font-size);
  }
  &__date {
    font-size: 1rem;
    font-weight: 400;
  }
}
</style>

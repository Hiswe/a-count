<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: `customers-quotations`,
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      headers: [
        {
          text: `#`,
          value: `reference`,
        },
        {
          text: this.$t(`table.header.name`),
          value: `name`,
        },
        {
          text: this.$t(`table.header.sent`),
          value: `sendAt`,
        },
        {
          text: this.$t('table.header.validated'),
          value: `validatedAt`,
        },
        {
          text: this.$t('table.header.signed'),
          value: `signedAt`,
        },
        {
          text: this.$t('table.header.invoice'),
          value: `id`,
        },
        {
          text: this.$t('table.amount.total'),
          value: `total`,
          align: `right`,
        },
        {
          text: ``,
          value: `id`,
        },
      ],
    }
  },
})
</script>

<template lang="pug">
v-data-table(
    :headers="headers"
    :items="items"
  )
    template(slot="items" slot-scope="props")
      tr
        td
          nuxt-link(:to="`/quotations/${props.item.id}`") {{props.item.reference}}
        td
          nuxt-link(:to="`/quotations/${props.item.id}`") {{ props.item.name }}
        td
          acount-date(:value="props.item.sendAt")
        td
          acount-date(:value="props.item.validatedAt")
        td
          acount-date(:value="props.item.signedAt")
        td #invoice
        td.text-xs-right {{ $n(props.item.total, `currency`) }}
        td remove
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: `acount-paper-mentions`,
  props: {
    content: {
      type: String,
      default: ``,
    },
    signature: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    additionalClasses() {
      return { 'acount-paper-mentions--signature': this.signature }
    },
  },
})
</script>

<template lang="pug">
footer.acount-paper-mentions(:class="additionalClasses")
  acount-markdown(:source="content")
</template>

<style lang="scss" scoped>
.acount-paper-mentions {
  padding-top: var(--s-gutter);
  min-height: calc(var(--s-gutter) * 4);

  @media #{$mq-print} {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  &--signature {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: var(--s-gutter);

    &::after {
      content: '';
      border: 2px solid var(--v-secondary-base);
      height: calc(var(--s-gutter) * 4);
      align-self: end;
    }
  }
}
</style>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: `account-key-presentation-item`,
  props: {
    title: String,
  },
})
</script>

<template lang="pug">
dl.account-key-presentation
  dt.account-key-presentation__key(v-text="title")
  dd.account-key-presentation__value
    slot
</template>

<style lang="scss" scoped>
.account-key-presentation {
  grid-row: 1 / span 1;
  text-align: center;

  &__key {
    color: var(--v-primary-base);
  }
}
</style>

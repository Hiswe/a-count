<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: `acount-main-content`,
  props: {
    title: String,
  },
})
</script>

<template lang="pug">
.acount-main-content
  header.acount-main-content__header
    h2.acount-main-content__title(v-text="title")
    .acount-main-content__actions
      slot(name="actions")
  .acount-main-content__body
    slot
  .acount-main-content__body--centered(v-if="$slots.centered")
    slot(name="centered")
</template>

<style lang="scss" scoped>
.acount-main-content {
  &__header {
    height: 70px;
    display: flex;
    align-items: center;
    margin-left: auto;
  }
  &__body {
    &--centered {
      max-width: calc(var(--s-max-width) + var(--s-gutter) * 2);
      padding: 0 var(--s-gutter);
      margin: 0 auto;
    }
  }
}
</style>

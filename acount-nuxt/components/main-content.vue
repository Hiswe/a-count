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
</template>

<style lang="scss" scoped>
.acount-main-content {
  &__header {
    height: 70px;
    display: flex;
    align-items: center;
    margin-left: auto;
  }
}
</style>

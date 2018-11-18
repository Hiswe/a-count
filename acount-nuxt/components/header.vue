<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: `acount-header`,
})
</script>

<template lang="pug">
header.acount-header
  .acount-header__in
    slot
</template>

<style lang="scss" scoped>
.acount-header {
  margin: 0 0 calc(var(--s-gutter) * -1);
  padding: var(--s-gutter) var(--s-gutter);
  background: var(--header-bg);
  border-radius: var(--header-border-radius) 0 0 var(--header-border-radius);

  &__in {
    max-width: var(--s-max-width);
    margin: 0 auto;
  }
}
</style>

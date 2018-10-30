<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: `acount-nav-wrapper`,
})
</script>

<template lang="pug" functional>
nav.acount-navigation
  h1.acount-navigation__title A-Count
  .acount-navigation__menu
    slot
</template>

<style lang="scss" scoped>
.acount-navigation {
  --nav-width: 230px;
  max-height: 100vh;
  width: var(--nav-width);

  &__title {
    text-align: center;
    padding: 1rem;
  }
}
</style>

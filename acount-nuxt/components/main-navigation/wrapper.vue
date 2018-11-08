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
  max-height: 100vh;
  width: var(--nav-main-width);
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;

  &__title {
    text-align: center;
    padding: 1rem;
    flex: 0 0 auto;
    color: var(--v-primary-base);
    text-transform: uppercase;
    font-weight: 200;
    font-size: 2rem;
  }
  &__menu {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
  }
}
</style>

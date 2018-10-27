<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: `acount-navigation`,
})
</script>

<template lang="pug">
nav.acount-navigation
  h1.acount-navigation__title A-Count
  .acount-navigation__menu
    nuxt-link.acount-navigation__item(to="/") {{ $t(`home` )}}
    nuxt-link.acount-navigation__item(to="/account/login")  {{ $t(`login` )}}
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
  &__item {
    display: block;
    text-align: center;
    padding: 1rem;
  }
}
</style>


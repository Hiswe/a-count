<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: `acount-navigation-connected`,
})
</script>

<template lang="pug">
.acount-navigation__menu
  nuxt-link.acount-navigation__item(to="/") {{ $t(`home` )}}
  nuxt-link.acount-navigation__item(to="/account/logout")  {{ $t(`logout` )}}
</template>

<style lang="scss" scoped>
.acount-navigation {
  &__item {
    display: block;
    text-align: center;
    padding: 1rem;
  }
}
</style>


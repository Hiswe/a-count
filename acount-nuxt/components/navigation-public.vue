<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: `acount-navigation-public`,
})
</script>

<template lang="pug">
.acount-navigation__menu
  nuxt-link.acount-navigation__item(to="/account/login")  {{ $t(`login` )}}
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


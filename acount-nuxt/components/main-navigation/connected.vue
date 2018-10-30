<script lang="ts">
import Vue from 'vue'

import AcountNavWrapper from './wrapper.vue'
import AcountNavLink from './link.vue'

export default Vue.extend({
  name: `acount-nav-connected`,
  components: {
    AcountNavWrapper,
    AcountNavLink,
  },
})
</script>

<template lang="pug">
acount-nav-wrapper
  acount-nav-link(to="/")
    | {{ $t(`shared.home` )}}
  acount-nav-link(to="/account/logout")
    | {{ $t(`shared.logout` )}}
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


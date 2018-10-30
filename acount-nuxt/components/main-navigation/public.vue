<script lang="ts">
import Vue from 'vue'

import AcountNavWrapper from './wrapper.vue'
import AcountNavLink from './link.vue'

export default Vue.extend({
  name: `acount-nav-public`,
  components: {
    AcountNavWrapper,
    AcountNavLink,
  },
})
</script>

<template lang="pug">
acount-nav-wrapper
  acount-nav-link(to="/account/login")
    | {{ $t(`shared.login` )}}
  acount-nav-link(to="/account/register")
    | {{ $t(`shared.register` )}}
</template>


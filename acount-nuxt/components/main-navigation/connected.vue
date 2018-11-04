<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

import { UserState } from '~/types/acount-user'
import AcountNavWrapper from './wrapper.vue'
import AcountNavLink from './link.vue'

const i18n = {
  messages: {
    en: {
      connected: `connected as:`,
    },
    fr: {
      connected: `connecté en tant que :`,
    },
  },
}

export default Vue.extend({
  name: `acount-nav-connected`,
  i18n,
  components: {
    AcountNavWrapper,
    AcountNavLink,
  },
  computed: {
    ...mapState(`user`, {
      user: (state: UserState) => state.user,
    }),
  },
})
</script>

<template lang="pug">
acount-nav-wrapper
  acount-nav-link(to="/")
    | {{ $t(`shared.home` )}}
  acount-nav-link(to="/quotations")
    | {{ $t(`shared.quotations` )}}
  acount-nav-link(to="/invoices")
    | {{ $t(`shared.invoices` )}}
  acount-nav-link(to="/customers")
    | {{ $t(`shared.customers` )}}
  acount-nav-link(to="/account/settings")
    | {{ $t(`shared.settings` )}}
  p.acount-navigation__user
    | {{ $t(`connected`) }}
    br
    | {{ user.email }}
  acount-nav-link(to="/account/logout")
    | {{ $t(`shared.logout` )}}
</template>

<style lang="scss" scoped>
.acount-navigation__user {
  margin-top: auto;
  margin-bottom: 0;
  color: var(--v-primary-lighten3);
  text-align: center;
}
</style>

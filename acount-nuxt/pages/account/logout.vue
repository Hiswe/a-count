<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

import { LOGOUT } from '../../store/user'

// can't destructuring process.env
const COOKIE_NAME = process.env.COOKIE_NAME

export default Vue.extend({
  name: `page-logout`,
  meta: {
    authRequired: true,
  },
  created() {
    const { $axios, $cookies, $router } = this
    this.logout()
    $cookies.remove(COOKIE_NAME)
    $axios.setToken(false)
    // doesn't work for now…
    // TODO: figure out why redirection isn't happening
    console.log(Object.keys($router))
    $router.push(`/account/login`)
  },
  methods: {
    ...mapActions(`user`, {
      logout: LOGOUT,
    }),
  },
})
</script>

<template lang="pug">
  div bye bye
</template>


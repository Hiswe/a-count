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
  async created() {
    await this.logout()
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


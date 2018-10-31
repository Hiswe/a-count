<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

import { LOGIN } from '~/store/user'

export default Vue.extend({
  name: `page-login`,
  data() {
    return {
      form: {
        email: ``,
        password: ``,
      },
    }
  },
  meta: {
    authForbidden: true,
  },
  methods: {
    submit() {
      this.login(this.form)
    },
    ...mapActions(`user`, {
      login: LOGIN,
    }),
  },
})
</script>

<template lang="pug">
form(
  id="login"
  action="/account/login"
  method="post"
  @submit.prevent="submit"
)
  h2 {{ $t(`shared.login`) }}
  v-text-field(
    type="email"
    name="email"
    :label="$t(`form.email`)"
    v-model="form.email"
  )
  v-text-field(
    type="password"
    name="password"
    :label="$t(`form.password`)"
    v-model="form.password"
  )
  v-btn(color="primary" type="submit") {{ $t(`shared.login`) }}
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

import { FormErrorState } from '~/types/acount-store'
import { LOGIN } from '~/store/user'

export default Vue.extend({
  name: `page-login`,
  meta: {
    authForbidden: true,
  },
  data() {
    return {
      form: {
        email: ``,
        password: ``,
      },
    }
  },
  methods: {
    submit() {
      this.login(this.form)
    },
    ...mapActions(`user`, {
      login: LOGIN,
    }),
  },
  computed: {
    ...mapState<FormErrorState>(`form-errors`, {
      passwordError: state => {
        return state.password ? state.password : []
      },
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
  acount-notifications
  acount-input(
    type="email"
    name="email"
    :label="$t(`form.email`)"
    v-model="form.email"
  )
  acount-input(
    type="password"
    name="password"
    :label="$t(`form.password`)"
    v-model="form.password"
    :error-messages="passwordError"
  )
  v-btn(color="primary" type="submit") {{ $t(`shared.login`) }}
</template>

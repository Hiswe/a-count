<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

import { FormErrorState } from '~/types/acount-form-error'
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
  computed: {
    ...mapState(`form-errors`, {
      passwordError: (state: FormErrorState) => {
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
    :error-messages="passwordError"
  )
  v-btn(color="primary" type="submit") {{ $t(`shared.login`) }}
</template>

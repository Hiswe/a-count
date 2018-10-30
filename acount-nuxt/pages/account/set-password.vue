<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

import { SET_PASSWORD } from '../../store/user'

const i18n = {
  messages: {
    en: {
      title: `Setup your password`,
      submit: `Set password`,
    },
    fr: {
      title: `Définition du mot de passe`,
      submit: `Définir le mot de passe`,
    },
  },
}

export default Vue.extend({
  name: `page-set-password`,
  meta: {
    authForbidden: true,
  },
  i18n,
  data() {
    return {
      form: {
        password: ``,
      },
    }
  },

  methods: {
    submit() {
      this.setPassword(this.form)
    },
    ...mapActions(`user`, {
      setPassword: SET_PASSWORD,
    }),
  },
})
</script>

<template lang="pug">
form(
  id="login"
  action="/account/set-password"
  method="post"
  @submit.prevent="submit"
)
  h2 {{ $t(`title`) }}
  v-text-field(
    type="password"
    name="password"
    :label="$t(`form.password`)"
    v-model="form.password"
  )
  v-text-field(
    type="token"
    name="token"
    :label="$t(`form.token`)"
    v-model="form.token"
  )
  v-btn(color="primary" type="submit") {{ $t(`submit`) }}
</template>

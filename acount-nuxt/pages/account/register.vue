<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

import { REGISTER } from '../../store/user'

const i18n = {
  messages: {
    en: {
      'register-help': `After submitting, you will receive a confirmation code by email`,
    },
    fr: {
      'register-help': `Après l'envoie du formulaire, vous recevrez un code de conformation par email`,
    },
  },
}

export default Vue.extend({
  name: `page-register`,
  i18n,
  data() {
    return {
      form: {
        email: ``,
      },
    }
  },
  meta: {
    authForbidden: true,
  },
  methods: {
    submit() {
      this.register(this.form)
    },
    ...mapActions(`user`, {
      register: REGISTER,
    }),
  },
})
</script>

<template lang="pug">
form(
  id="login"
  action="/account/register"
  method="post"
  @submit.prevent="submit"
)
  h2 {{ $t(`shared.register`) }}
  v-alert(
    :value="true"
    color="info"
    icon="info"
  ) {{ $t(`register-help` )}}
  v-text-field(
    type="email"
    name="email"
    :label="$t(`form.email`)"
    v-model="form.email"
  )
  v-btn(color="primary" type="submit") {{ $t(`shared.register`) }}
</template>

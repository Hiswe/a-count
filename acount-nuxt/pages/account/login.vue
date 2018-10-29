<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

// don't know why but can't use Nuxt path sortcuts for store files…
// import { LOGIN } from '~/store/user'
import { LOGIN, IS_CONNECTED } from '../../store/user'

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
  watch: {
    isConnected(newValue, oldValue) {
      if (newValue === true) this.$router.push(`/`)
    },
  },
  computed: {
    ...mapGetters(`user`, {
      isConnected: IS_CONNECTED,
    }),
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
  v-btn(color="primary" type="submit") send
</template>

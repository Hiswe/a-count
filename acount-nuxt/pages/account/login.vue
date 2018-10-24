<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: `page-login`,
})
</script>

<template lang="pug">
form(id="login" action="/account/login")
  v-text-field(
    type="email"
    name="email"
    label="email"
  )
  v-text-field(
    type="password"
    name="password"
    label="password"
  )
  v-btn(small color="primary") send
</template>

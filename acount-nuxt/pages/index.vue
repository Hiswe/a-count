<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: `home`,
  meta: {
    authRequired: true,
  },
})
</script>

<template lang="pug">
div
  h1 hello nuxt world
  acount-tabs
    acount-tab(title="first")
      | FIIIIIRST
    acount-tab(title="second")
      | SECOOOOOOOND
</template>


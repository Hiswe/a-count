<script lang="ts">
import Vue from 'vue'

import AcountNavigation from '../components/main-navigation.vue'

export default Vue.extend({
  name: `acount-layout`,
  components: {
    AcountNavigation,
  },
})
</script>

<template lang="pug">
v-app
  acount-navigation
  v-content
    v-container(fluid)
      nuxt
</template>

<style lang="scss" scoped>
</style>

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
main.acount-main(role="main")
  acount-navigation
  v-app.acount-v-app
    //- v-content
    //-   v-container(fluid)
    nuxt
</template>

<style lang="scss" scoped>
.acount-main {
  min-height: 100vh;
  display: flex;
}
.acount-v-app {
  flex: 1 0 auto;
}
</style>

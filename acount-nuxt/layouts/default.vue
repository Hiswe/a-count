<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

import { IS_CONNECTED } from '~/store/user'
import AcountNavConnected from '~/components/main-navigation/connected.vue'
import AcountNavPublic from '~/components/main-navigation/public.vue'

export default Vue.extend({
  name: `acount-layout`,
  components: {
    AcountNavConnected,
    AcountNavPublic,
  },
  computed: {
    ...mapGetters(`user`, {
      isConnected: IS_CONNECTED,
    }),
  },
})
</script>

<template lang="pug">
main.acount-main(role="main")
  acount-nav-connected(v-if="isConnected")
  acount-nav-public(v-else)
  v-app.acount-v-app
    nuxt
</template>

<style lang="scss" scoped>
.acount-main {
  min-height: 100vh;
  display: flex;
}
.acount-v-app {
  flex-grow: 1;
  background: white;
}
</style>

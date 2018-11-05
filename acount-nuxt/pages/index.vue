<script lang="ts">
import Vue from 'vue'

import AcountTabs from '~/components/tabs/tabs.vue'
import AcountTab from '~/components/tabs/tab.vue'

export default Vue.extend({
  name: `home`,
  meta: {
    authRequired: true,
  },
  components: {
    AcountTabs,
    AcountTab,
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


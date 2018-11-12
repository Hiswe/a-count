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
acount-main-content(:title="$t( `shared.home` )")
</template>


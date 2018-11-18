<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: `page-edit-quotation`,
  meta: {
    authRequired: true,
  },
})
</script>

<template lang="pug">
acount-main-content(:title="$t( `shared.quotation` )")
</template>


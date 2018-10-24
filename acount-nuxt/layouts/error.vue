<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: `acount-error`,
  props: [`error`],
})
</script>

<template lang="pug">
section.error
  h1 {{error.statusCode}}
  h2(v-if="error.statusCode === 404") not found
  h2(v-else) {{error.message}}
  router-link( to="/" exact) back
</template>

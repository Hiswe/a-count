<script lang="ts">
import Vue from 'vue'
import marked from 'marked'

export default Vue.extend({
  name: `acount-markdown`,
  props: {
    source: {
      type: String,
    },
  },
  computed: {
    rendered() {
      if (!this.source) return ``
      return marked(this.source, { breaks: true })
    },
  },
})
</script>

<template lang="pug">
.acount-markdown
  div(v-html="rendered")
</template>

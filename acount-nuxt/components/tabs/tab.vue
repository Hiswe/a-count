<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: `acount-tab`,
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    _isTab() {
      // For parent sniffing of child
      return true
    },
  },
})
</script>

<template lang="pug">
section.acount-tabs__panel
  slot
</template>

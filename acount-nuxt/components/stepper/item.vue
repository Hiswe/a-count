<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: `acount-step`,
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      // amy value is possible
      validator() {
        return true
      },
    },
  },
})
</script>

<template lang="pug">
.acount-step-content
  slot
</template>

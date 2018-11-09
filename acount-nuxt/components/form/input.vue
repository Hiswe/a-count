<script lang="ts">
import Vue from 'vue'

const INPUT_TYPES = [``, `text`, `number`]

export default Vue.extend({
  name: `acount-input`,
  props: {
    value: {
      default: ``,
      type: String,
    },
    type: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
    id: {
      type: String,
    },
  },
  data() {
    return {}
  },
})
</script>

<template lang="pug">
.acount-input
</template>

<style lang="scss" scoped>
.acount-input {
}
</style>

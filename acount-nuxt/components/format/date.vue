<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: `acount-date`,
  props: {
    value: {
      type: String,
    },
  },
  computed: {
    date() {
      return this.value ? this.$d(new Date(this.value), `short`) : ``
    },
  },
})
</script>

<template lang="pug">
span {{ date }}
</template>

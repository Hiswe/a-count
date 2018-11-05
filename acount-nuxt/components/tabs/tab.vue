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
})
</script>

<template lang="pug">
.acount-tabs__panel-in
  slot
</template>

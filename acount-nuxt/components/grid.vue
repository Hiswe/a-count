<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: `acount-grid`,
})
</script>


<template lang="pug">
.acount-grid
  slot
</template>

<style lang="scss" scoped>
.acount-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: var(--s-two-gutter);
}
</style>


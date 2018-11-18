<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: `acount-progress`,
  props: {
    value: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      defalut: 1,
    },
  },
  computed: {
    percent(): number {
      const percent = this.value / this.max
      const cssPercent = Math.max(0, Math.min(100, percent * 100))
      return isNaN(cssPercent) ? 0 : cssPercent
    },
  },
})
</script>

<template lang="pug">
dl.acount-progress
  dt.acount-progress__label
    | {{ $n(percent / 100, 'percent') }}
  dd.acount-progress__bar
    v-progress-linear(
      color="info"
      height="20"
      :value="percent"
    )
</template>

<style lang="scss" scoped>
.acount-progress {
  position: relative;
  margin: 0;
}
.acount-progress__label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
.v-progress-linear {
  margin: 0;
}
</style>

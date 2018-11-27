<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: `acount-checkbox`,
  props: {
    value: {
      default: false,
      type: Boolean,
    },
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
    },
  },
  data() {
    return {
      hasJS: false,
    }
  },
  computed: {
    htmlFor() {
      return this.id || this.name
    },
    inputClasses() {
      return {
        'acount-checkbox__input--has-js': this.hasJS,
      }
    },
  },
  mounted() {
    this.hasJS = true
  },
  methods: {
    onChange($event) {
      const { checked } = $event.target
      this.$emit(`input`, checked)
    },
  },
})
</script>

<template lang="pug">
label.acount-checkbox(
  :for="htmlFor"
)
  input.acount-checkbox__input(
    :checked="value"
    :class="inputClasses"
    :id="htmlFor"
    :name="name"
    type="checkbox"
    @change="onChange"
  )
  v-icon.acount-checkbox__icon.acount-checkbox__icon--checked
    | check_box
  v-icon.acount-checkbox__icon.acount-checkbox__icon--blank
    | check_box_outline_blank
</template>

<style lang="scss" scoped>
.acount-checkbox {
  display: inline-block;
  $root: &;

  &__input {
    border: 0 !important;
    clip: rect(0 0 0 0) !important;
    height: 1px !important;
    margin: -1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    width: 1px !important;

    &:checked ~ #{$root}__icon--blank,
    &:not(:checked) ~ #{$root}__icon--checked {
      display: none;
    }
  }
  &__icon {
    &--checked {
      color: var(--c-accent);
    }
  }
}
</style>

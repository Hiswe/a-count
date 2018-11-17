<script lang="ts">
import Vue from 'vue'
import { enforceNumber } from '@acount/helpers'

const INPUT_TYPES = [`text`, `number`, `email`]

export default Vue.extend({
  name: `acount-input`,
  props: {
    value: {
      default: ``,
      type: [String, Number],
    },
    type: {
      type: String,
      default: `text`,
      validator(value?: string): boolean {
        if (!value) return false
        return INPUT_TYPES.indexOf(value) !== -1
      },
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
    return {
      hasJS: false,
      isFocus: false,
    }
  },
  mounted() {
    this.hasJS = true
  },
  computed: {
    inputClasses() {
      return {
        'acount-textarea__input--autoresize': this.hasJS,
      }
    },
    wrapperClasses() {
      return {
        'acount-input--focus': this.isFocus,
        'acount-input--number': this.isNumber,
      }
    },
    htmlFor() {
      return this.id || this.name
    },
    isNumber() {
      return this.type === `number`
    },
  },
  methods: {
    onFocus() {
      this.isFocus = true
    },
    onBlur() {
      this.isFocus = false
    },
    onInput($event) {
      let { value } = $event.target
      // <input type="number"> give back a string
      this.$emit(`input`, this.isNumber ? enforceNumber(value) : value)
    },
  },
})
</script>

<template lang="pug">
.acount-input(:class="wrapperClasses")
  label.acount-input__label(:for="htmlFor" v-if="label") {{ label }}
  input.acount-input__input(
    ref="input"
    :value="value"
    :type="type"
    :id="htmlFor"
    :name="name"
    :class="inputClasses"
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur"
  )
</template>

<style lang="scss" scoped>
@import './form-mixins';

.acount-input {
  @include input-base();
  @include input-bottom-border();
  @include input-floating-label();
  $root: &;

  &--number {
    text-align: right;

    #{$root}__label {
      left: auto;
      right: 0;
      transform-origin: top right;
    }
  }
}
</style>

<script lang="ts">
import Vue from 'vue'

import EventBus from '~/helpers/event-bus'

// change textarea size if too much content
// • https://maximilianhoffmann.com/posts/autoresizing-textareas
export default Vue.extend({
  name: `spark-textarea`,
  props: {
    value: {
      default: ``,
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
    rows: {
      type: String,
      default: ``,
    },
  },
  data() {
    return {
      hasJS: false,
      isFocus: false,
    }
  },
  mounted() {
    this.recomputeSize()
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
        'acount-textarea--focus': this.isFocus,
        'acount-textarea--no-label': !this.label,
      }
    },
    htmlFor() {
      return this.id || this.name
    },
  },
  methods: {
    onInput($event) {
      let { value } = $event.target
      this.$emit(`input`, value)
      this.recomputeSize()
    },
    onFocus() {
      this.isFocus = true
      EventBus.$emit(`close`)
    },
    onBlur() {
      this.isFocus = false
    },
    recomputeSize() {
      const el = this.$refs.input
      const originalRows = el.getAttribute(`rows`)
      // force a one-liner by default
      // • this make it easy to calculate the right height
      el.setAttribute(`rows`, `1`)
      el.style.minHeight = `auto`
      el.style.minHeight = `${el.scrollHeight}px`
      el.scrollTop = el.scrollHeight
      el.setAttribute(`rows`, originalRows)
    },
  },
})
</script>

<template lang="pug">
.acount-textarea(:class="wrapperClasses")
  label.acount-textarea__label(:for="htmlFor" v-if="label") {{ label }}
  textarea.acount-textarea__input(
    ref="input"
    :value="value"
    :id="htmlFor"
    :name="name"
    :class="inputClasses"
    :rows="rows"
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur"
  ) {{ value }}
</template>

<style lang="scss" scoped>
@import './form-mixins';

.acount-textarea {
  @include input-base();
  @include input-bottom-border();
  @include input-floating-label();
  $root: &;

  // use case: in a table
  &--no-label {
    margin: 0;
    padding: 0;

    &::after {
      display: none;
    }
    #{$root}__input {
      border: 0;
      padding: 0.5rem 0.75rem;
    }
  }

  &__input--autoresize {
    resize: none;
  }
}
</style>

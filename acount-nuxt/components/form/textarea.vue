<script lang="ts">
import Vue from 'vue'

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
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur"
  )
</template>

<style lang="scss" scoped>
@import './form-mixins';

.acount-textarea {
  @include input-base();
  @include input-bottom-border();
  @include input-floating-label();

  &__input--autoresize {
    resize: none;
  }
}
</style>

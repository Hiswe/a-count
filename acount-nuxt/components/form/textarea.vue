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
    for() {
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
  label.acount-textarea__label(:for="this.for" v-if="label") {{ label }}
  textarea.acount-textarea__input(
    ref="input"
    :value="value"
    :id="id"
    :name="name"
    :class="inputClasses"
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur"
  )
</template>

<style lang="scss" scoped>
.acount-textarea {
  $root: &;
  position: relative;
  padding-top: 0.5rem;
  margin-top: 0.25rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    border-bottom: 2px solid var(--v-primary-base);
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    transform: scaleX(0);
  }
  &--focus {
    &::after {
      transform: scaleX(1);
    }
    #{$root}__label {
      color: var(--v-primary-base);
    }
  }
  &__label {
    left: 0px;
    position: absolute;
    color: rgba(0, 0, 0, 0.54);
    transform-origin: top left;
    transform: translateY(-1.1rem) scale(0.75);
    transition: color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  }
  &__input {
    width: 100%;
    display: block;
    max-width: none;
    padding: 0.25rem 0;
    border: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    line-height: initial;
    transition: border 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    &:hover {
      border-bottom-color: currentColor;
    }
    &--autoresize {
      resize: none;
    }
  }
}
</style>

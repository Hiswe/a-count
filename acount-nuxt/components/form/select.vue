<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: `acount-select`,
  props: {
    value: {
      default: ``,
      type: [String, Number],
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
    items: {
      type: Array,
      default: [],
    },
    itemText: {
      type: String,
      default: `text`,
    },
    itemValue: {
      type: String,
      default: `value`,
    },
  },
  data() {
    return {
      hasJS: false,
    }
  },
  mounted() {
    this.hasJS = true
  },
  computed: {
    htmlFor() {
      return this.id || this.name
    },
  },
  methods: {
    onInput($event) {
      let { value } = $event.target
      this.$emit(`input`, value)
    },
  },
})
</script>

<template lang="pug">
.acount-select
  label.acount-select__label(:for="htmlFor" v-if="label") {{ label }}
  select.acount-select__input(
    :value="value"
    :id="htmlFor"
    :name="name"
    @input="onInput"
  )
    option(
      v-for="item in items"
      :value="item[itemValue]"
    ) {{ item[itemText] }}
</template>

<style lang="scss" scoped>
@import './form-mixins';
.acount-select {
  @include input-base();
  @include input-bottom-border();
  @include input-floating-label();

  &__input {
    appearance: none;
    border-radius: 0;
  }
}
</style>

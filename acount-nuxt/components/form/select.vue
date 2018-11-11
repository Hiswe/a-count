<script lang="ts">
import Vue from 'vue'

// needed to close all already opened select
const EventBus = new Vue()

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
    // https://stackoverflow.com/a/52613172
    items: {
      type: Array as () => any[],
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
      isOpen: false,
    }
  },
  mounted() {
    this.hasJS = true
    EventBus.$on(`close`, () => {
      this.isOpen = false
    })
  },
  computed: {
    htmlFor() {
      return this.id || this.name
    },
    optionsClasses() {
      return {
        'acount-select__options--open': this.isOpen,
      }
    },
  },
  methods: {
    onInput(value) {
      this.isOpen = false
      this.$emit(`input`, value)
    },
    onOpen() {
      EventBus.$emit(`close`)
      this.isOpen = true
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

  )
    option(
      v-for="item in items"
      :value="item[itemValue]"
    ) {{ item[itemText] }}
  //- prevent natural opening when JS
  .acount-select__click-handler(
    v-if="hasJS"
    @click="onOpen"
  )
  ul.acount-select__options(
    v-if="hasJS"
    :class="optionsClasses"
  )
    li.acount-select__option(
      v-for="item in items"
      :class="{'acount-select__option--selected': item[itemValue] === value}"
      @click="() => onInput(item[itemValue])"
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
  &__click-handler {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  &__options {
    background: white;
    position: absolute;
    list-style: none;
    padding: 0.5rem 0;
    top: 0.5rem;
    left: 0;
    width: 100%;
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
      0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
    opacity: 0;
    pointer-events: none;
    transition: opacity #{$input-transition};
    z-index: 2;

    &--open {
      opacity: 1;
      pointer-events: initial;
    }
  }
  &__option {
    padding: 0.5rem 1rem;
    background: rgba(0, 0, 0, 0);
    transition: background #{$input-transition};

    &:hover {
      background: rgba(0, 0, 0, 0.04);
    }
    &--selected {
      color: var(--v-primary-base);
    }
  }
}
</style>

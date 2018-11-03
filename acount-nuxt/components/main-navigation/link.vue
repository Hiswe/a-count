<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: `acount-nav-link`,
  props: {
    to: String,
  },
})
</script>

<template lang="pug">
nuxt-link.acount-navigation__item(:to="to")
  slot
</template>

<style lang="scss" scoped>
.acount-navigation__item {
  display: block;
  text-align: center;
  padding: 1rem;
  text-decoration: none;

  &:hover {
    color: var(--v-accent-base);
  }

  &.is-active {
    // color: var(--nav-main-link-color-selected);
    pointer-events: none;
    text-decoration: none;
    color: var(--v-accent-base);

    &::before,
    &::after {
      content: '•';
    }
    &::before {
      padding-right: 0.5em;
    }
    &::after {
      padding-left: 0.5em;
    }
  }
}
</style>

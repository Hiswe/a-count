<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: `acount-tabs`,
})
</script>

<template lang="pug">
.acount-tabs
  input.acount-tabs__input(type="radio" name="tabs" value="0" id="tabs-1" checked)
  input.acount-tabs__input(type="radio" name="tabs" value="1" id="tabs-2")
  header.acount-tabs__header
    label.acount-tabs__tab(for="tabs-1"): span one
    label.acount-tabs__tab(for="tabs-2"): span two
  section.acount-tabs__panel
    | ONE
  section.acount-tabs__panel
    | TWO
</template>

<style lang="scss" scoped>
.acount-tabs {
  $root: &;
  // --gutter: minmax(var(--s-gutter), calc(50% - var(--s-max-width) / 2));
  // --tab-selected-border-radius: var(--s-quarter-gutter);
  --tab-selected-border-radius: 0.25rem;
  --tab-selected-bg: white;

  --tab-header-bg: var(--v-primary-lighten6);

  // display: grid;
  // grid-template-rows: auto;

  @for $i from 1 through 10 {
    input:nth-of-type(#{$i}) {
      // don't use display: none
      // • we want textarea-auto-resize to be able to compute size :)
      &:not(:checked) ~ section:nth-of-type(#{$i}) {
        position: absolute;
        opacity: 0;
        pointer-events: none;
      }
      &:checked ~ #{$root}__header label:nth-of-type(#{$i}) {
        color: var(--v-primary-base);
        background: var(--tab-selected-bg);
        border-radius: var(--tab-selected-border-radius)
          var(--tab-selected-border-radius)
          0
          0;

        &::before,
        &::after {
          content: '';
        }
      }
    }
  }
  &__header {
    margin: 0;
    padding: 1rem 1rem 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    background: var(--tab-header-bg);
    border-radius: var(--tab-selected-border-radius) 0 0
      var(--tab-selected-border-radius);
  }

  &__tab {
    flex: 1 1;
    text-align: center;
    padding: 0.5rem 0;
    color: var(--c-primary);
    position: relative;

    &::before,
    &::after {
      position: absolute;
      bottom: 0;
      width: calc(var(--tab-selected-border-radius) * 1);
      height: calc(var(--tab-selected-border-radius) * 1);
    }
    &::before {
      right: 100%;
      background: radial-gradient(
        farthest-corner at top left,
        transparent 65%,
        var(--tab-selected-bg) 70%
      );
    }
    &::after {
      left: 100%;
      background: radial-gradient(
        farthest-corner at top right,
        transparent 65%,
        var(--tab-selected-bg) 70%
      );
    }
  }

  &__input {
    display: none;
  }
}
</style>

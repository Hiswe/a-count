<script lang="ts">
import Vue from 'vue'

const PARTY_TITLES = [`from`, `to`]

export default Vue.extend({
  name: `acount-paper-party`,
  props: {
    title: {
      type: String,
      default: `from`,
      validator(value?: string): boolean {
        if (!value) return false
        return PARTY_TITLES.indexOf(value) !== -1
      },
    },
    people: {
      type: Object,
      default: {},
    },
  },
  computed: {
    partyNameClass() {
      return {
        'acount-paper-party__name': this.people.name,
      }
    },
  },
})
</script>

<template lang="pug">
aside.acount-paper-party(:class="`acount-paper-party--${title}`")
  p.acount-paper-party__title {{ title }}
  h4.acount-paper-party__name(:class="partyNameClass")
    span(v-if="people.name") {{people.name}}
    span(v-else) #no-name
  acount-markdown(
    v-if="people.address"
    :source="people.address"
  )
  p.acount-paper-party__address.acount-paper-party__address--empty(v-else)
    | #no-address
</template>

<style lang="scss" scoped>
.acount-paper-party {
  &--to {
    text-align: right;
  }
  &__title {
    margin: 0 0 0.25em;
    font-style: italic;

    &::first-letter {
      text-transform: uppercase;
    }
  }
  &__name {
    margin: 0 0 var(--s-quarter-gutter);
    font-size: var(--sheet-big-font-size);
    font-weight: 700;

    &--empty {
      margin: 0;
      color: var(--c-text-lighter);
      font-style: italic;
      font-size: 1rem;
      text-transform: initial;

      @media #{$mq-print} {
        display: none;
      }
    }
  }
  // facing blocks description
  &__address {
    &--empty {
      color: var(--c-text-lighter);
      font-style: italic;

      @media #{$mq-print} {
        display: none;
      }
    }
    > * {
      margin: 0;
    }
  }
}
</style>


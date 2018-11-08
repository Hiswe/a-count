<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: `acount-main-content`,
  props: {
    title: String,
  },
  data() {
    return {
      showSentinel: false,
      isStuck: false,
      observer: false,
    }
  },
  mounted() {
    this.showSentinel = true
    Vue.nextTick(() => {
      this.observeIntersection()
    })
  },
  beforeDestroy() {
    this.unobserveIntersection()
  },
  computed: {
    stickyClasses() {
      return {
        'acount-main-content__sticky--sticky': this.showSentinel,
        'acount-main-content__sticky--is-stuck': this.isStuck,
      }
    },
  },
  methods: {
    observeIntersection() {
      if (!window.IntersectionObserver) return
      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
      )
      this.observer.observe(this.$refs.sentinel)
    },
    unobserveIntersection() {
      if (!window.IntersectionObserver) return
      this.observer.disconnect()
    },
    handleIntersection(entries) {
      const sentinelEntry = entries[0]
      const isStuck = sentinelEntry.intersectionRatio === 0
      this.isStuck = isStuck
    },
  },
})
</script>

<template lang="pug">
.acount-main-content
  header.acount-main-content__header
    .nav-secondary__sentinel(v-if="showSentinel" ref="sentinel")
    .acount-main-content__sticky(:class="stickyClasses")
      h2.acount-main-content__title(v-text="title")
      .acount-main-content__actions
        slot(name="actions")
  .acount-main-content__body
    slot
  .acount-main-content__body--centered(v-if="$slots.centered")
    slot(name="centered")
</template>

<style lang="scss" scoped>
.acount-main-content {
  --shadow-opacity: 0;

  &__header {
    height: var(--nav-secondary-height);
    @media #{$mq-print} {
      display: none;
    }
  }
  &__sticky {
    display: flex;
    align-items: center;
    height: var(--nav-secondary-height);
    color: var(--nav-secondary-color);
    background: var(--nav-secondary-bg);
    padding: 0 var(--s-gutter);
    position: fixed;
    left: var(--nav-main-width);
    right: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    transition: background-color 0.5s;

    &::after {
      position: absolute;
      content: '';
      top: 100%;
      left: 0;
      right: 0;
      pointer-events: none;
      height: 10px;
      background: radial-gradient(
        farthest-side at top,
        var(--nav-secondary-shadow),
        transparent
      );
      opacity: var(--shadow-opacity);
      transition: opacity 0.25s;
    }

    &--is-stuck {
      --shadow-opacity: 1;
    }
  }
  &__sentinel {
    position: absolute;
    width: 100%;
    top: 1px;
    pointer-events: none;
  }
  &__title {
    margin-right: auto;
  }
  &__body {
    &--centered {
      max-width: calc(var(--s-max-width) + var(--s-gutter) * 2);
      padding: 0 var(--s-gutter);
      margin: 0 auto;
    }
  }
}
</style>

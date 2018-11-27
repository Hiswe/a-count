<script>
import Vue from 'vue'
import shortid from 'shortid'

import filterVueComponents from '~/helpers/filter-vue-components'

const filterNodes = filterVueComponents(`acount-step`)

export default {
  name: `acount-stepper`,
  data() {
    return {
      id: shortid(),
    }
  },
  methods: {
    getSelectedIndex(vNodes) {
      let index = 0
      const hasOneMissingStep = vNodes.some((vNode, i) => {
        const { propsData } = vNode.componentOptions
        console.log(i, propsData.value)
        const hasNoValue = propsData.value == null || propsData.value === ``
        if (hasNoValue) index = i
        return hasNoValue
      })
      return hasOneMissingStep ? index : vNodes.length
    },
  },
  render(h) {
    // have to be done in render to avoid loosing ctx
    const steps = filterNodes(this.$slots.default)
    const selectedIndex = this.getSelectedIndex(steps)
    console.log({ selectedIndex })
    return (
      <div class="acount-stepper">
        {steps.map((vNode, index) => {
          const id = `${this.id}[${index}]`
          return [
            <input
              class="acount-stepper__input"
              type="radio"
              checked={selectedIndex === index}
              name={this.id}
              id={id}
            />,
            <div class="acount-stepper__step">
              <label class="acount-stepper__button" for={id}>
                {vNode.componentOptions.propsData.label}
              </label>
              <div class="acount-stepper__content">{vNode}</div>
            </div>,
          ]
        })}
      </div>
    )
  },
}
</script>

<style lang="scss" scoped>
.acount-stepper {
  $root: &;
  --stepper-bullet-size: 2rem;
  --stepper-bullet-size-half: calc(var(--stepper-bullet-size) / 2);
  --step-transition: background 0.5s, color 0.5s;
  --step-bg: var(--c-primary-lightest);
  // active color
  --step-color-active: var(--c-primary);
  --step-bar-bg-active: var(--c-primary);
  --step-bullet-bg-active: var(--step-bar-bg-active);
  --step-bullet-color-active: var(--c-text);
  // inactive color
  --step-color-inactive: var(--c-primary-lighter);
  --step-bar-bg-inactive: var(--c-primary-lighter);
  --step-bullet-bg-inactive: var(--step-bar-bg-inactive);
  --step-bullet-color-inactive: var(--step-bg);
  // all colors are define by default to the active state
  --step-content: '✓';
  --step-current-bullet-color: var(--c-accent-lighter);
  --step-color: var(--step-color-active);
  --step-bar-bg: var(--step-bar-bg-active);
  --step-bullet-bg: var(--step-bullet-bg-active);
  --step-bullet-color: var(--step-bg);

  counter-reset: current-step;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
  position: relative;
  // this to make the date picker show ok
  z-index: 2;
  // TODO: remove dev styles
  // background: yellow;
  // min-height: 3rem;
  margin-bottom: 1rem;

  &__input {
    counter-increment: steps;
    // display: none;
    // TODO: remove dev styles
    position: absolute;
    pointer-events: none;
    top: -1rem;

    &:nth-of-type(2) {
      left: 1rem;
    }
    &:nth-of-type(3) {
      left: 2rem;
    }
  }
  &__step {
    counter-increment: current-step;

    // everything beyond the current step is deactivated
    #{$root}__input:checked ~ & {
      --step-content: counter(current-step);
      --step-color: var(--step-color-inactive);
      --step-bar-bg: var(--step-bar-bg-inactive);
      --step-bullet-bg: var(--step-bullet-bg-inactive);
      --step-bullet-color: var(--step-bullet-color-inactive);

      #{$root}__content {
        opacity: 0;
        pointer-events: none;
        user-select: none;
      }
    }
    // This is the current step
    #{$root}__input:checked + & {
      --step-color: var(--step-color-active);
      // as a bridge between done & undone, its bar is inactive!
      --step-bar-bg: var(--step-bar-bg-inactive);
      --step-bullet-bg: var(--step-bg);
      --step-bullet-color: var(--step-bullet-color-active);

      #{$root}__button {
        &::before {
          box-shadow: 0 0 0 3px var(--step-bullet-bg-active);
        }
      }
      #{$root}__content {
        opacity: 1;
        pointer-events: auto;
        user-select: auto;
      }
    }
  }
  &__content {
    text-align: center;
    color: var(--step-color);
    transition: opacity 0.5s 0.05s;
    padding: 0.5rem 0.5rem 0;

    &::selection {
      color: black;
      background: var(--step-bullet-color);
    }
  }
  &__button {
    position: relative;
    text-align: center;
    color: var(--step-color);
    display: block;

    // bullet
    #{$root}--is-all-checked &::before,
    &::before {
      content: var(--step-content);
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto calc(var(--stepper-bullet-size) / 4);
      height: var(--stepper-bullet-size);
      width: var(--stepper-bullet-size);
      border-radius: var(--stepper-bullet-size);
      transition: var(--step-transition);
      background: var(--step-bullet-bg);
      color: var(--step-bullet-color);
    }

    // progress bar
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: calc(var(--stepper-bullet-size-half) / 2);
      background: var(--step-bar-bg);
      transition: var(--step-transition);
      top: var(--stepper-bullet-size-half);
      left: 50%;
      transform: translate(0, -50%);
      z-index: -1;

      // connecting lines are always steps.length - 1
      #{$root}__step:last-child & {
        display: none;
      }
    }
  }
}
</style>


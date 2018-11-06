<script>
// don't use typescript with JSX
//  • can't find a way to easily make it work with single file components
//    https://stackoverflow.com/a/50894195
//  • maybe see
//    https://www.npmjs.com/package/@hexeo/vue-typescript-jsx

export default {
  name: `acount-tabs`,
  data() {
    return {
      tabs: [],
      panels: [],
    }
  },
  methods: {
    updateTabs() {
      if (!this.$slots.default) return
      for (let panel of this.$slots.default) {
        const { tag, propsData } = panel.componentOptions
        if (tag !== `acount-tab`) return
        this.tabs.push(propsData)
        this.panels.push(panel)
      }
    },
  },
  render(h) {
    return (
      <div class="acount-tabs">
        {this.tabs.map((tab, index) => (
          <input
            class="acount-tabs__input"
            type="radio"
            name="tabs"
            value={index}
            id={`tabs-${index}`}
            checked={index === 0}
          />
        ))}
        <header class="acount-tabs__header">
          <div class="acount-tabs__header-in">
            {this.$slots.header && (
              <div class="acount-tabs__header-content">
                {this.$slots.header}
              </div>
            )}
            {this.tabs.map((tab, index) => (
              <label class="acount-tabs__tab" for={`tabs-${index}`}>
                <span>{tab.title}</span>
              </label>
            ))}
          </div>
        </header>
        {this.panels.map(panel => (
          <section class="acount-tabs__panel">{panel}</section>
        ))}
      </div>
    )
  },
  created() {
    this.updateTabs()
  },
}
</script>

<style lang="scss" scoped>
.acount-tabs {
  $root: &;
  // --gutter: minmax(var(--s-gutter), calc(50% - var(--s-max-width) / 2));
  // --tab-selected-border-radius: var(--s-quarter-gutter);
  --tab-selected-border-radius: var(--s-quarter-gutter);
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
  &__input {
    display: none;
  }
  &__header {
    margin: 0 0 var(--s-gutter);
    padding: var(--s-gutter) var(--s-gutter) 0;
    list-style: none;
    background: var(--tab-header-bg);
    border-radius: var(--tab-selected-border-radius) 0 0
      var(--tab-selected-border-radius);
  }
  &__header-in {
    display: flex;
    flex-wrap: wrap;
    max-width: var(--s-max-width);
    margin: 0 auto;
  }
  &__header-content {
    width: 100%;
  }
  &__tab {
    flex: 1 1;
    text-align: center;
    padding: 0.5rem 0;
    color: var(--v-primary-base);
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
  &__panel {
    max-width: calc(var(--s-max-width) + var(--s-gutter) * 2);
    padding: 0 var(--s-gutter);
    margin: 0 auto;
  }
}
</style>

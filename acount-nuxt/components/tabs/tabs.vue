<script>
// don't use typescript with JSX
//  • can't find a way to easily make it work with single file components
//  • may see
//    https://www.npmjs.com/package/@hexeo/vue-typescript-jsx

export default {
  name: `acount-tabs`,
  data() {
    return {
      tabs: [],
    }
  },
  methods: {
    updateTabs() {
      // Probe tabs
      // console.log(
      //   this.$slots.default.filter(child => child.componentInstance._isTab),
      // )
      // console.log(this.$slots.default)
      // this.$slots.default.filter(child => {
      //   console.log(child.componentInstance)
      //   // child.componentInstance._isTab
      // })
      this.tabs = this.$children.filter(child => child._isTab)
    },
  },
  render(h) {
    // if (this.$slots.default) {
    //   // May want to check here if the node is a myCp2,
    //   // otherwise, grab the data
    //   for (let node of this.$slots.default) {
    //     console.log(node)
    //     // workingList.push(node.componentOptions.propsData.myData)
    //   }
    // }

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
          {this.tabs.map((tab, index) => (
            <label class="acount-tabs__tab" for={`tabs-${index}`}>
              <span>{tab.title}</span>
            </label>
          ))}
        </header>
        {
          // this.tabs.map((tab, index) => tab.render())
        }
        {this.$slots.default}
      </div>
    )
  },
  // beforeMount() {
  //   this.updateTabs()
  //   // console.log(this.$slots.default)
  //   // console.log(this.tabs)
  // },
  mounted() {
    this.updateTabs()
    // console.log(this.$slots.default)
    // console.log(this.tabs)
  },
}
</script>

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

<script>
import Vue from 'vue'

import filterVueComponents from '~/helpers/filter-vue-components'

const filterNodes = filterVueComponents(`acount-key-presentation-item`)

export default {
  name: `account-key-presentation`,
  render(h) {
    // have to be done in render to avoid loosing ctx
    return (
      <div class="acount-key-presentation-wrapper">
        {filterNodes(this.$slots.default)}
      </div>
    )
  },
}
</script>

<style lang="scss" scoped>
.acount-key-presentation-wrapper {
  display: grid;
}
</style>


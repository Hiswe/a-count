<script>
import Vue from 'vue'

export default {
  name: `account-key-presentation`,
  data() {
    return {
      panels: [],
    }
  },
  methods: {
    updatePanels() {
      if (!this.$slots.default) return
      for (let panel of this.$slots.default) {
        const { tag } = panel.componentOptions
        if (tag !== `acount-key-presentation-item`) return
        this.panels.push(panel)
      }
    },
  },
  created() {
    this.updatePanels()
  },
  render(h) {
    return (
      <div class="acount-key-presentation-wrapper">
        {this.$slots.default}
        {
          // this loose informations somehow…
          // this.panels.map((panel, index) => panel)
        }
      </div>
    )
  },
}
</script>

<style lang="scss" scoped>
.acount-key-presentation-wrapper {
  display: grid;
  // grid-template-columns: auto;
  // grid-auto-rows: 1fr;
}
</style>


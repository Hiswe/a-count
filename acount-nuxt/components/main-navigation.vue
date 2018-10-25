<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: `acount-navigation`,
})
</script>

<template lang="pug">
v-navigation-drawer(app permanent)
  v-toolbar(flat)
    v-list
      v-list-tile
        v-list-tile-title.title
          | A-Count
  v-divider
  v-list
    v-list-tile
      v-list-tile-content
        v-list-tile-title
          nuxt-link.acount-menu__item(to="/") {{ $t(`home` )}}
    v-list-tile
      v-list-tile-content
        v-list-tile-title
          nuxt-link.acount-menu__item(to="/account/login")  {{ $t(`login` )}}
</template>

<style lang="scss" scoped>
</style>


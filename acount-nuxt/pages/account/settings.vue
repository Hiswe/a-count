<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: `page-settings`,
  data() {
    return {
      active: null,
    }
  },
  meta: {
    authRequired: true,
  },
})
</script>

<template lang="pug">
div
  //- acount-tabs
  v-tabs(
      v-model="active"
      color="cyan"
      dark
      slider-color="yellow"
    )
      v-tab(ripple) #from
      v-tab(ripple) #default product
      v-tab(ripple) #footer mentions
      v-tab(ripple) #reference

      v-tab-item
        | #FROM
      v-tab-item
        | #DEFAULT PRODUCT
      v-tab-item
        | #FOOTER MENTIONS
      v-tab-item
        | #REFERENCE

</template>

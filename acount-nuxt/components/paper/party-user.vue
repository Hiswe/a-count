<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { UserState } from '~/types/acount-store'

import AcountParty from './party.vue'

export default Vue.extend({
  name: `acount-party-user`,
  components: {
    AcountParty,
  },
  computed: {
    ...mapState<UserState>(`user`, {
      user: state => state.user,
    }),
  },
})
</script>

<template lang="pug">
acount-party(title="from" :people="user")
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { UserState } from '~/types/acount-store'

import AcountParty from './party.vue'

export default Vue.extend({
  name: `acount-paper-party-user`,
  components: {
    AcountParty,
  },
  computed: {
    ...mapState<UserState>(`user`, {
      user(state) {
        return state.user
      },
    }),
  },
})
</script>

<template lang="pug">
acount-party(title="from" :people="people")
</template>

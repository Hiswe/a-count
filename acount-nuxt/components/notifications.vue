<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: `acount-notifications`,
  data() {
    return {
      notifications: [],
    }
  },
  computed: {
    ...mapState(`notifications`, {
      storeNotifications: `list`,
    }),
  },
})
</script>

<template lang="pug">
.notifications
  v-alert(
    v-for="notification in storeNotifications"
    :key="notification.id"
    :value="true"
    :color="notification.type"
    :icon="notification.type"
  ) {{ $t(`notifications.${notification.message}` )}}
</template>


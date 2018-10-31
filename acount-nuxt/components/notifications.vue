<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import clonedeep from 'lodash.clonedeep'

import { FLUSH_NOTIFICATIONS } from '~/store/notifications'

export default Vue.extend({
  name: `acount-notifications`,
  data() {
    return {
      notifications: [],
    }
  },
  mounted() {
    this.showNotifications()
  },
  watch: {
    storeNotifications() {
      this.showNotifications()
    },
  },
  computed: {
    ...mapState(`notifications`, {
      storeNotifications: `list`,
    }),
  },
  methods: {
    showNotifications() {
      if (!this.storeNotifications.length) return
      this.notifications = clonedeep(this.storeNotifications)
      this.flush()
    },
    ...mapActions(`notifications`, {
      flush: FLUSH_NOTIFICATIONS,
    }),
  },
})
</script>

<template lang="pug">
.notifications
  v-alert(
    v-for="notification in notifications"
    :key="notification.id"
    :value="true"
    :dismissible="true"
    :color="notification.type"
    :icon="notification.type"
  ) {{ $t(`notifications.${notification.message}` )}}
</template>


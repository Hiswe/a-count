import shortId from 'shortid'
import Vue from 'vue'

const ADD = `ADD`
const FLUSH = `FLUSH`
export const ADD_NOTIFICATION = `ADD_NOTIFICATION`
export const FLUSH_NOTIFICATIONS = `FLUSH_NOTIFICATIONS`

export interface NotificationPayload {
  type: `success` | `info` | `warn` | `error`
  message: string
}
interface Notification extends NotificationPayload {
  id: string
}
interface NotificationState {
  list: Notification[]
}

export const state = () => {
  const currentState: NotificationState = {
    list: [],
  }
  return currentState
}

export const mutations = {
  [ADD](state: NotificationState, payload: NotificationPayload): void {
    const notification: Notification = {
      id: shortId.generate(),
      type: payload.type,
      message: payload.message,
    }
    state.list.push(notification)
  },
  [FLUSH](state: NotificationState): void {
    state.list = []
  },
}

export const actions = {
  [ADD_NOTIFICATION](vuexContext, payload: NotificationPayload): void {
    const { commit } = vuexContext
    commit(ADD, payload)
  },
  [FLUSH_NOTIFICATIONS](vuexContext): void {
    const { commit } = vuexContext
    commit(FLUSH)
  },
}

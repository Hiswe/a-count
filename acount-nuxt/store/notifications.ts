import shortId from 'shortId'
import Vue from 'vue'

const ADD = `ADD`
const FLUSH = `FLUSH`
export const ADD_NOTIFICATION = `ADD_NOTIFICATION`
export const FLUSH_NOTIFICATIONS = `FLUSH_NOTIFICATIONS`

interface Notification {
  id: string
  type: `success` | `info` | `warn` | `error`
  message: string
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
  [ADD](state, payload: Notification): void {
    payload.id = shortId.generate()
    state.list.push(payload)
  },
  [FLUSH](state): void {
    state.list = []
  },
}

export const actions = {
  [ADD_NOTIFICATION](vuexContext, payload: Notification): void {
    const { commit } = vuexContext
    commit(ADD, payload)
  },
  [FLUSH_NOTIFICATIONS](vuexContext): void {
    const { commit } = vuexContext
    commit(FLUSH)
  },
}

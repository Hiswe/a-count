import shortId from 'shortId'

export const ADD_NOTIFICATION = `ADD_NOTIFICATION`
export const RESET_NOTIFICATION = `RESET_NOTIFICATION`

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
  [ADD_NOTIFICATION](state, payload: Notification): void {
    payload.id = shortId.generate()
    state.list.push(payload)
  },
  [RESET_NOTIFICATION](state): void {
    state.list = []
  },
}

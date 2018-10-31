import Vue from 'vue'

const ADD = `ADD`
const REMOVE = `REMOVE`
const FLUSH = `FLUSH`

type FormErrorKey = string
export type FormErrorPayload = {
  key: FormErrorKey
  message: string
}
// vuetify <v-text-field> has prop "error-messages"  in format [messages, …]
type FormError = [string]
export interface FormErrorState {
  [Key: string]: FormError
}

export const state = () => {
  const currentState: FormErrorState = {}
  return currentState
}

export const mutations = {
  [ADD](state: FormErrorState, payload: FormErrorPayload): void {
    const { i18n } = this.app
    const formError: FormError = [i18n.t(`form-error.${payload.message}`)]
    Vue.set(state, payload.key, formError)
  },
  [REMOVE](state: FormErrorState, payload: FormErrorKey): void {
    Vue.delete(state, payload)
  },
  [FLUSH](state: FormErrorState): void {
    state = {}
  },
}

export const ADD_ERROR = `ADD_ERROR`
export const REMOVE_ERROR = `REMOVE_ERROR`
export const FLUSH_ERROR = `FLUSH_ERROR`
export const actions = {
  [ADD_ERROR](vuexContext, payload: FormErrorPayload): void {
    const { commit } = vuexContext
    commit(ADD, payload)
  },
  [REMOVE_ERROR](vuexContext, payload: FormErrorKey): void {
    const { commit } = vuexContext
    commit(REMOVE, payload)
  },
  [FLUSH_ERROR](vuexContext): void {
    const { commit } = vuexContext
    commit(FLUSH)
  },
}

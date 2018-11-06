import Vue from 'vue'
import { ActionTree, MutationTree } from 'vuex'

import {
  RootState,
  FormErrorState,
  FormError,
  FormErrorKey,
  FormErrorPayload,
} from '~/types/acount-store'

const ADD = `ADD`
const REMOVE = `REMOVE`
const FLUSH = `FLUSH`

// vuetify <v-text-field> has prop "error-messages"  in format [messages, …]

export const state = () => {
  const currentState: FormErrorState = {}
  return currentState
}

export const mutations: MutationTree<FormErrorState> = {
  [ADD](state, payload: FormErrorPayload): void {
    const { i18n } = this.app
    const formError: FormError = [i18n.t(`form-error.${payload.message}`)]
    Vue.set(state, payload.key, formError)
  },
  [REMOVE](state, payload: FormErrorKey): void {
    Vue.delete(state, payload)
  },
  [FLUSH](state): void {
    state = {}
  },
}

export const ADD_ERROR = `ADD_ERROR`
export const REMOVE_ERROR = `REMOVE_ERROR`
export const FLUSH_ERROR = `FLUSH_ERROR`
export const actions: ActionTree<FormErrorState, RootState> = {
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

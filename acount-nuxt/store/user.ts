import isNil from 'lodash.isnil'

const SET_USER = `SET_USER`
const REMOVE_USER = `REMOVE_USER`

export const state = () => ({
  user: null,
})

export const mutations = {
  [SET_USER](state, payload) {
    state.user = payload
  },
  [REMOVE_USER](state, payload) {
    state.user = null
  },
}

export const IS_CONNECTED = `IS_CONNECTED`

export const getters = {
  [IS_CONNECTED](state) {
    return !isNil(state.user)
  },
}

export const ME = `ME`
export const LOGIN = `LOGIN`
export const LOGOUT = `LOGOUT`
export const REGISTER = `REGISTER`
export const SET_PASSWORD = `SET_PASSWORD`

export const actions = {
  async [ME]({ commit }) {
    try {
      const response = await this.$axios.$get(`/account/auth`)
      commit(SET_USER, response.user)
    } catch (error) {
      commit(REMOVE_USER)
    }
  },
  async [LOGIN]({ commit }, payload) {
    try {
      const response = await this.$axios.$post(`/account/login`, payload)
      commit(SET_USER, response.user)
    } catch (error) {
      commit(REMOVE_USER)
    }
  },
  async [REGISTER]({ commit }, payload) {
    try {
      const response = await this.$axios.$post(`/account/register`, payload)
      commit(SET_USER, response.user)
    } catch (error) {
      commit(REMOVE_USER)
    }
  },
  async [SET_PASSWORD]({ commit }, payload) {
    try {
      const response = await this.$axios.$post(`/account/set-password`, payload)
      commit(SET_USER, response.user)
    } catch (error) {
      commit(REMOVE_USER)
    }
  },
  async [LOGOUT]({ commit }) {
    commit[REMOVE_USER]
  },
}

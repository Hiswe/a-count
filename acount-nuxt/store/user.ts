import isNil from 'lodash.isnil'
import { ADD_NOTIFICATION } from './notifications'

// TODO: should type all this
// https://github.com/HerringtonDarkholme/kilimanjaro
// https://github.com/vuejs/vuex/blob/dev/types/index.d.ts

// can't destructuring process.env
const COOKIE_NAME = process.env.COOKIE_NAME
const JWT_FORMAT = `Bearer`

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
  async [ME](vuexContext) {
    const { commit } = vuexContext
    try {
      const response = await this.$axios.$get(`/account/me`)
      commit(SET_USER, response.user)
    } catch (error) {
      commit(REMOVE_USER)
    }
  },
  async [LOGIN](vuexContext, payload) {
    const { commit, dispatch } = vuexContext
    const { $axios, $router, $cookies } = this

    try {
      const response = await $axios.$post(`/account/login`, payload)
      commit(SET_USER, response.user)
      $cookies.set(COOKIE_NAME, response.access_token)
      $axios.setToken(response.access_token, JWT_FORMAT)
      $router.push(`/`)
    } catch (error) {
      const { data } = error.response
      // wrong email address => not-found
      if (data.status === 404) {
        dispatch(
          `notifications/${ADD_NOTIFICATION}`,
          {
            type: `error`,
            message: data.message,
          },
          { root: true },
        )
      }
      commit(REMOVE_USER)
    }
  },
  async [REGISTER]({ commit }, payload) {
    const { $axios, $router } = this
    try {
      const response = await $axios.$post(`/account/register`, payload)
      $router.push(`/account/set-password`)
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
  // https://vuex.vuejs.org/api/#actions
  async [LOGOUT](vuexContext) {
    const { commit } = vuexContext
    const { $axios, $cookies, $router } = this
    try {
      await this.$axios.$get(`/account/logout`)
    } catch (error) {
      console.log(`something went wrong while disconnecting from API`)
    }
    $cookies.remove(COOKIE_NAME)
    $axios.setToken(false)
    commit(REMOVE_USER)
    this.$router.push(`/account/login`)
  },
}

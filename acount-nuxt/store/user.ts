import isNil from 'lodash.isnil'
import Vue from 'vue'
import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { AcountUser, UserResponse, LoginResponse } from '@acount/types'

import {
  RootState,
  UserState,
  NotificationPayload,
  FormErrorPayload,
} from '~/types/acount-store'
import { ADD_NOTIFICATION } from './notifications'
import { ADD_ERROR } from './form-errors'

// TODO: should type all this
// https://codeburst.io/vuex-and-typescript-3427ba78cfa8
// https://frontendsociety.com/writing-vuex-stores-in-typescript-b570ca34c2a
// https://github.com/mrcrowl/vuex-typex
// https://github.com/mrcrowl/vuex-typex/issues/8
// https://www.npmjs.com/package/vuex-type-safety
// https://github.com/HerringtonDarkholme/kilimanjaro
// https://github.com/vuejs/vuex/blob/dev/types/index.d.ts

// can't destructuring process.env
const COOKIE_NAME = process.env.COOKIE_NAME
const JWT_FORMAT = `Bearer`
const IS_ROOT = Object.freeze({ root: true })

const SET_USER = `SET_USER`
const REMOVE_USER = `REMOVE_USER`
const UPDATE_SETTINGS = `UPDATE_SETTINGS`

export const state = () => {
  const defaultState: UserState = {
    user: null,
  }
  return defaultState
}

export const mutations: MutationTree<UserState> = {
  [SET_USER](state, payload: AcountUser) {
    state.user = payload
  },
  [REMOVE_USER](state) {
    state.user = null
  },
  [UPDATE_SETTINGS](state, payload: AcountUser) {
    state.user = payload
  },
}

export const IS_CONNECTED = `IS_CONNECTED`
export const LOCALE = `LOCALE`

export const getters: GetterTree<UserState, RootState> = {
  [IS_CONNECTED](state) {
    return !isNil(state.user)
  },
  [LOCALE](state) {
    if (isNil(state.user)) return `en`
    return state.user.lang
  },
}

export const ME = `ME`
export const LOGIN = `LOGIN`
export const LOGOUT = `LOGOUT`
export const REGISTER = `REGISTER`
export const SET_PASSWORD = `SET_PASSWORD`
export const UPDATE_USER = `UPDATE_USER`

export const actions: ActionTree<UserState, RootState> = {
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
        const payload: NotificationPayload = {
          type: `error`,
          message: data.message,
        }
        dispatch(`notifications/${ADD_NOTIFICATION}`, payload, IS_ROOT)
      }
      // unauthorized => bad password
      if (data.status === 401) {
        const payload: FormErrorPayload = {
          key: `password`,
          message: data.message,
        }
        dispatch(`form-errors/${ADD_ERROR}`, payload, IS_ROOT)
      }
      commit(REMOVE_USER)
    }
  },
  async [REGISTER](vuexContext, payload) {
    const { commit } = vuexContext
    const { $axios, $router } = <Vue>this
    try {
      const response = await $axios.$post(`/account/register`, payload)
      $router.push(`/account/set-password`)
    } catch (error) {
      commit(REMOVE_USER)
    }
  },
  async [SET_PASSWORD](vuexContext, payload) {
    const { commit } = vuexContext
    const { $axios } = <Vue>this
    try {
      const response = await $axios.$post<LoginResponse>(
        `/account/set-password`,
        payload,
      )
      commit(SET_USER, response.user)
    } catch (error) {
      commit(REMOVE_USER)
    }
  },
  // https://vuex.vuejs.org/api/#actions
  async [LOGOUT](vuexContext) {
    const { commit } = vuexContext
    const { $axios, $cookies, $router } = <Vue>this
    try {
      await $axios.$get(`/account/logout`)
    } catch (error) {
      console.log(`something went wrong while disconnecting from API`)
    }
    $cookies.remove(COOKIE_NAME)
    $axios.setToken(false)
    commit(REMOVE_USER)
    this.$router.push(`/account/login`)
  },
  async [UPDATE_USER](vuexContext, payload) {
    const { commit } = vuexContext
    const { $axios } = <Vue>this
    try {
      const update = await $axios.$post<UserResponse>(
        `/account/settings`,
        payload,
      )
      commit(UPDATE_SETTINGS, update.user)
    } catch (error) {
      console.log(`something went wrong while updating the user`)
    }
  },
}

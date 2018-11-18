import Vue from 'vue'
import { ActionTree, MutationTree } from 'vuex'
import { Customer, GetAllCustomers } from '@acount/types'

import { RootState, CustomersState } from '~/types/acount-store'

export const state = () => {
  const currentState: CustomersState = {
    active: [],
    current: false,
  }
  return currentState
}

const SET_ALL = `SET_ALL`
const FLUSH_ACTIVE = `FLUSH_ACTIVE`
const SET_CURRENT = `SET_CURRENT`
const FLUSH_CURRENT = `FLUSH_CURRENT`
export const mutations: MutationTree<CustomersState> = {
  [SET_ALL](state, payload) {
    state.active = payload
  },
  [FLUSH_ACTIVE](state) {
    state.active = []
  },
  [SET_CURRENT](state, payload) {
    state.current = payload
  },
  [FLUSH_CURRENT](state) {
    state.current = false
  },
}

export const READ_CUSTOMER = `READ_CUSTOMER`
export const NEW_CUSTOMER = `NEW_CUSTOMER`
export const UPDATE_CUSTOMER = `UPDATE_CUSTOMER`
export const ALL_CUSTOMERS = `ALL_CUSTOMERS`
export const actions: ActionTree<CustomersState, RootState> = {
  async [ALL_CUSTOMERS](vuexContext) {
    const { commit } = vuexContext
    const { $axios } = <Vue>this
    commit(FLUSH_ACTIVE)
    try {
      const response = await $axios.$get<GetAllCustomers>(`/customers`)
      commit(SET_ALL, response.rows)
    } catch (error) {
      // console.log(`something went wrong while disconnecting from API`)
    }
  },
  async [READ_CUSTOMER](vuexContext, userId) {
    const { commit } = vuexContext
    const { $axios } = <Vue>this
    commit(FLUSH_CURRENT)
    try {
      const response = await $axios.$get<Customer>(`/customers/${userId}`)
      commit(SET_CURRENT, response)
    } catch (error) {
      console.error(`something went wrong while getting a user`)
    }
  },
  async [NEW_CUSTOMER](vuexContext) {
    const { commit } = vuexContext
    const { $axios } = <Vue>this
    commit(FLUSH_CURRENT)
    try {
      const response = await $axios.$get<Customer>(`/customers/new`)
      commit(SET_CURRENT, response)
    } catch (error) {
      console.error(`something went wrong while getting a user template`)
    }
  },
  async [UPDATE_CUSTOMER](vuexContext, payload) {
    const { commit } = vuexContext
    const { $axios } = <Vue>this
    try {
      const response = await $axios.$post<Customer>(
        `/customers/${payload.id}`,
        payload,
      )
      commit(SET_CURRENT, response)
    } catch (error) {
      console.error(`something went wrong while updating a customer`)
    }
  },
}

import Vue from 'vue'

import {
  Customer,
  CustomersState,
  GetAllCustomers,
} from '~/types/acount-customers'

export const state = () => {
  const currentState: CustomersState = {
    active: [],
  }
  return currentState
}

const SET_ALL = `SET_ALL`
export const mutations = {
  [SET_ALL](state: CustomersState, payload) {
    state.active = payload
  },
}

export const ALL_CUSTOMERS = `ALL_CUSTOMERS`
export const actions = {
  async [ALL_CUSTOMERS](vuexContext) {
    const { commit } = vuexContext
    const { $axios } = <Vue>this
    try {
      const response = await $axios.$get<GetAllCustomers>(`/customers`)
      commit(SET_ALL, response.rows)
    } catch (error) {
      // console.log(`something went wrong while disconnecting from API`)
    }
  },
}

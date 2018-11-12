import Vue from 'vue'
import { ActionTree, MutationTree } from 'vuex'
import { GetAllQuotations } from '@acount/types'

import { RootState, QuotationsState } from '~/types/acount-store'

const SET_ACTIVE = `SET_ACTIVE`
const FLUSH_ACTIVE = `FLUSH_ACTIVE`
const SET_CURRENT = `SET_CURRENT`
const FLUSH_CURRENT = `FLUSH_CURRENT`

export const state = () => {
  const currentState: QuotationsState = {
    active: [],
    current: false,
  }
  return currentState
}

export const mutations: MutationTree<QuotationsState> = {
  [SET_ACTIVE](state, payload) {
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
export const ALL_QUOTATIONS = `ALL_QUOTATIONS`
export const actions: ActionTree<QuotationsState, RootState> = {
  async [ALL_QUOTATIONS](vuexContext) {
    const { commit } = vuexContext
    const { $axios } = <Vue>this
    commit(FLUSH_ACTIVE)
    try {
      const response = await $axios.$get<GetAllQuotations>(`/quotations`)
      commit(SET_ACTIVE, response.rows)
    } catch (error) {
      // console.log(`something went wrong while disconnecting from API`)
    }
  },
  // async [READ_CUSTOMER](vuexContext, userId) {
  //   const { commit } = vuexContext
  //   const { $axios } = <Vue>this
  //   commit(FLUSH_CURRENT)
  //   try {
  //     const response = await $axios.$get<Customer>(`/customers/${userId}`)
  //     commit(SET_CURRENT, response)
  //   } catch (error) {
  //     console.error(`something went wrong while getting a user`)
  //   }
  // },
  // async [UPDATE_CUSTOMER](vuexContext, payload) {
  //   const { commit } = vuexContext
  //   const { $axios } = <Vue>this
  //   try {
  //     const response = await $axios.$post<Customer>(
  //       `/customers/${payload.id}`,
  //       payload,
  //     )
  //     commit(SET_CURRENT, response)
  //   } catch (error) {
  //     console.error(`something went wrong while updating a customer`)
  //   }
  // },
}

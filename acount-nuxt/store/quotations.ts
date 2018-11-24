import Vue from 'vue'
import { ActionTree, MutationTree } from 'vuex'
import { GetAllQuotations, Quotation } from '@acount/types'

import { RootState, QuotationsState } from '~/types/acount-store'

export const state = () => {
  const currentState: QuotationsState = {
    active: [],
    current: false,
  }
  return currentState
}

const SET_ACTIVE = `SET_ACTIVE`
const FLUSH_ACTIVE = `FLUSH_ACTIVE`
const SET_CURRENT = `SET_CURRENT`
const FLUSH_CURRENT = `FLUSH_CURRENT`
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

export const READ_QUOTATION = `READ_QUOTATION`
export const UPDATE_QUOTATION = `UPDATE_QUOTATION`
export const ALL_QUOTATIONS = `ALL_QUOTATIONS`
export const CUSTOMER_QUOTATIONS = `CUSTOMER_QUOTATIONS`
export const actions: ActionTree<QuotationsState, RootState> = {
  async [READ_QUOTATION](vuexContext, quotationId) {
    const { commit } = vuexContext
    const { $axios } = <Vue>this
    commit(FLUSH_CURRENT)
    try {
      const response = await $axios.$get<Quotation>(
        `/quotations/${quotationId}`,
      )
      commit(SET_CURRENT, response)
    } catch (error) {
      console.log(`can't retrieve quotation`)
    }
  },
  async [UPDATE_QUOTATION](vuexContext, payload) {
    const { commit } = vuexContext
    const { $axios } = <Vue>this
    try {
      const response = await $axios.$post<Quotation>(
        `/quotations/${payload.id}`,
        payload,
      )
      commit(SET_CURRENT, response)
    } catch (error) {
      console.error(`something went wrong while updating the quotation`)
    }
  },
  async [ALL_QUOTATIONS](vuexContext) {
    const { commit } = vuexContext
    const { $axios } = <Vue>this
    commit(FLUSH_ACTIVE)
    try {
      const response = await $axios.$get<GetAllQuotations>(`/quotations`)
      commit(SET_ACTIVE, response.rows)
    } catch (error) {}
  },
  async [CUSTOMER_QUOTATIONS](vuexContext, customerID) {
    const { commit } = vuexContext
    const { $axios } = <Vue>this
    commit(FLUSH_ACTIVE)
    try {
      const response = await $axios.$get<GetAllQuotations>(
        `/customers/${customerID}/quotations`,
      )
      commit(SET_ACTIVE, response.rows)
    } catch (error) {}
  },
}

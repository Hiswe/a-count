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

export const LOGIN = `LOGIN`
export const ME = `ME`

export const actions = {
  async [LOGIN]({ commit }, payload) {
    try {
      const response = await this.$axios.$post(`/account/login`, payload)
      commit(SET_USER, response.user)
    } catch (error) {
      commit(REMOVE_USER)
      console.log(error.response.data)
    }
  },
  async [ME]({ commit }) {
    try {
      const response = await this.$axios.$get(`/account/auth`)
      commit(SET_USER, response.user)
    } catch (error) {
      commit(REMOVE_USER)
      console.log(error.response.data)
    }
  },
}

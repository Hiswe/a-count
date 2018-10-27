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

export const actions = {
  async [LOGIN]({ commit }, payload) {
    try {
      const response = await this.$axios.$post(`/account/login`, payload)
      commit(SET_USER, response.user)
      console.log(response)
    } catch (error) {
      commit(REMOVE_USER)
      console.log(error.response.data)
    }
  },
}

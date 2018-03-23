import crio from 'crio'

import createActionNames from './helpers/create-action-names.js'
import fetchDispatch from './helpers/fetch-dispatch.js'

const NAME = `users`

export const AUTH     = createActionNames( NAME, `get`, `auth` )
export const LOGIN    = createActionNames( NAME, `post`, `login` )
export const LOGOUT   = createActionNames( NAME, `get`, `logout` )
export const REGISTER = createActionNames( NAME, `post`, `register` )
export const SAVE_ONE = createActionNames( NAME, `post`, `one` )

const initialState = crio({
  isAuthenticated: false,
  current: {},
})

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  switch ( type ) {

    case AUTH.SUCCESS:
      state = state.set( `isAuthenticated`, true )
      return state.set( `current`, payload )
    case AUTH.ERROR:
      state = state.set( `isAuthenticated`, false )
      return state.set( `current`, {} )

    case LOGIN.SUCCESS:
      state = state.set( `isAuthenticated`, true )
      return state.set( `current`, payload )

    case LOGOUT.SUCCESS:
      state = state.set( `isAuthenticated`, false )
      return state.set( `current`, {} )

    case REGISTER.SUCCESS:
      state = state.set( `isAuthenticated`, true )
      return state.set( `current`, payload )

    case SAVE_ONE.LOADING:
      return state.set( `current.isSaving`, true )
    case SAVE_ONE.DONE:
      return state.set( `current.isSaving`, false )
    case SAVE_ONE.SUCCESS:
      state = state.set( `isAuthenticated`, true )
      return state.set( `current`, payload )

    default:
      return state
  }
}

export const auth = ({params, cookie}) => async dispatch => {
  const options = {
    url: `/auth`,
  }
  await fetchDispatch({
    dispatch,
    actions:  AUTH,
    fetch:    { options, cookie },
  })
}

export const login = ({params, cookie}) => async dispatch => {
  const { body } = params
  const options = {
    url: `/login`,
    body,
  }
  await fetchDispatch({
    dispatch,
    actions:  LOGIN,
    fetch:    { options, cookie },
  })
}

export const logout = ({params, cookie}) => async dispatch => {
  const options = {
    url: `/logout`,
  }
  await fetchDispatch({
    dispatch,
    actions:  LOGOUT,
    fetch:    { options, cookie },
  })
}

export const register = ({params, cookie}) => async dispatch => {
  const { body } = params
  const options = {
    url: `/register`,
    body,
  }
  await fetchDispatch({
    dispatch,
    actions:  REGISTER,
    fetch:    { options, cookie },
  })
}

export const saveOne = ({params, cookie}) => async dispatch => {
  const { body } = params
  const options = {
    url: `${NAME}/${body.id}`,
    body,
  }
  await fetchDispatch({
    dispatch,
    actions:  SAVE_ONE,
    fetch:    { options, cookie },
  })
}

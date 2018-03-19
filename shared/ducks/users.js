import crio from 'crio'

import * as isoFetch from '../iso-fetch'
import fetchDispatch, { getFetchType } from './_fetch-dispatch.js'

const NAME = `users`

const initialState = {
  isAuthenticated: false,
  current: {},
}

export const AUTH     = `@concompte/${NAME}/auth`
export const LOGIN    = `@concompte/${NAME}/login`
export const LOGOUT   = `@concompte/${NAME}/logout`
export const REGISTER = `@concompte/${NAME}/register`
export const SAVE_ONE = `@concompte/${NAME}/save-one`

export default function reducer(state = initialState, action) {
  if ( !crio.isCrio(state) ) state = crio( state )
  const { type, payload } = action

  switch (type) {

    case AUTH:
      const isAuthenticated = !payload.error
      state = state.set( `isAuthenticated`, isAuthenticated )
      return state.set( `current`, isAuthenticated ? payload : {} )

    case LOGIN:
      state = state.set( `isAuthenticated`, true )
      return state.set( `current`, payload )

    case LOGOUT:
      state = state.set( `isAuthenticated`, false )
      return state.set( `current`, {} )

    case REGISTER:
      state = state.set( `isAuthenticated`, true )
      return state.set( `current`, payload )

    case SAVE_ONE:
      state = state.set( `isAuthenticated`, true )
      return state.set( `current`, payload )

    default:
      return state
  }
}

// don't use “fetchDispatch” here
// • a bad response isn't an error: it's just the auth status
const { fetchStart, fetchEnd } = getFetchType( AUTH, `get` )
export const auth = ({params, cookie}) => async dispatch => {
  const options = {
    url: `/auth`,
  }
  dispatch({
    type:     fetchStart,
    payload:  {}
  })
  const { payload } = await isoFetch.get( options, cookie )
  const type = AUTH
  dispatch( {type, payload} )
  dispatch({
    type:     fetchEnd,
    payload:  {}
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
    type:     LOGIN,
    fetch:    { method: `post`, options, cookie },
  })
}

export const logout = ({params, cookie}) => async dispatch => {
  const options = {
    url: `/logout`,
  }
  await fetchDispatch({
    dispatch,
    type:     LOGOUT,
    fetch:    { method: `get`, options, cookie },
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
    type:     REGISTER,
    fetch:    { method: `post`, options, cookie },
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
    type:     SAVE_ONE,
    fetch:    { method: `post`, options, cookie },
  })
}

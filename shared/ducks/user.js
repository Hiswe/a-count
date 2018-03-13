import crio from 'crio'

import * as isoFetch from '../iso-fetch'
import fetchDispatch from './_fetch-dispatch.js'

const NAME = `user`

const initialState = {
  isAuthenticated:  true,
  // isAuthenticated:  false,
  current: {},
}

export const AUTH  = `@concompte/${NAME}/auth`
export const LOGIN  = `@concompte/${NAME}/login`
export const LOGOUT  = `@concompte/${NAME}/logout`
export const REGISTER  = `@concompte/${NAME}/register`


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

    default:
      return state
  }
}

export const auth = ({params, cookie}) => async dispatch => {
  const fetchOptions = {
    url: `/auth`,
  }
  // don't use “fetchDispatch” here
  // • a bad response isn't an error: it's just the auth status
  const { payload } = await isoFetch.get( fetchOptions, cookie )
  const type = AUTH
  dispatch( {type, payload} )
}

export const login = ({params, cookie}) => async dispatch => {
  const { body } = params
  const fetchOptions = {
    url: `/login`,
    body,
  }
  await fetchDispatch({
    dispatch,
    type:     LOGIN,
    request:  isoFetch.post( fetchOptions, cookie ),
  })
}

export const logout = ({params, cookie}) => async dispatch => {
  const fetchOptions = {
    url: `/logout`,
  }
  await fetchDispatch({
    dispatch,
    type:     LOGOUT,
    request:  isoFetch.get( fetchOptions, cookie ),
  })
}

export const register = ({params, cookie}) => async dispatch => {
  const { body } = params
  const fetchOptions = {
    url: `/register`,
    body,
  }
  await fetchDispatch({
    dispatch,
    type:     REGISTER,
    request:  isoFetch.post( fetchOptions, cookie ),
  })
}

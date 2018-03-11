import crio from 'crio'

import * as isoFetch from '../iso-fetch'

const NAME = `user`

const initialState = {
  isAuthenticated:  false,
  current: {},
}

export const ERROR  = `@concompte/${NAME}/error`
export const GET  = `@concompte/${NAME}/get`
export const LOGIN  = `@concompte/${NAME}/login`
export const LOGOUT  = `@concompte/${NAME}/logout`
export const REGISTER  = `@concompte/${NAME}/register`

// determine current connection status
// • listen to every action
// • catch only the one containing /error
// • in case of 401, we assume the user isn't authenticated
export default function reducer(state = initialState, action) {
  if ( !crio.isCrio(state) ) state = crio( state )
  const { type, payload } = action
  // payload is tested mostly because @@INIT doesn't come with one
  if ( !payload ) return state
  const isUnauthorized = payload.status === 401
  state = state.set( `isAuthenticated`, !isUnauthorized )

  switch (type) {
    case GET:
      if ( isUnauthorized ) return state.set( `current`, {} )
      return state.set( `current`, payload )

    case ERROR: {
      state = state.set( `current`, {} )
      return state.set( `isAuthenticated`, false )
    }

    case LOGIN:
      return state.set( `current`, payload )

    case LOGOUT:
      state = state.set( `current`, {} )
      return state.set( `isAuthenticated`, false )

    case REGISTER:
      return state.set( `current`, payload )

    default:
      return state
  }
}

export const get = (params, cookie) => async dispatch => {
  const fetchOptions = {
    url: `/auth`,
  }
  const { payload } = await isoFetch.get( fetchOptions, cookie )
  const type = GET
  dispatch( {type, payload} )
}

export const login = ( params, cookie) => async dispatch => {
  const { body } = params
  const fetchOptions = {
    url: `/login`,
    body,
  }
  const { payload } = await isoFetch.post( fetchOptions, cookie )
  const type = payload.error ? ERROR : LOGIN
  dispatch( {type, payload} )
}

export const logout = (params, cookie) => async dispatch => {
  const fetchOptions = {
    url: `/logout`,
  }
  const { payload } = await isoFetch.get( fetchOptions, cookie )
  const type = payload.error ? ERROR : LOGOUT
  dispatch( {type, payload} )
}

export const register = ( params, cookie) => async dispatch => {
  const { body } = params
  const fetchOptions = {
    url: `/register`,
    body,
  }
  const { payload } = await isoFetch.post( fetchOptions, cookie )
  const type = payload.error ? ERROR : REGISTER
  dispatch( {type, payload} )
}
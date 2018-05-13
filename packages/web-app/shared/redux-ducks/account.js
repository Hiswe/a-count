import crio from 'crio'

import createActionNames from './utils/create-action-names'
import fetchDispatch from './utils/fetch-dispatch'

const NAME = `account`

export const AUTH         = createActionNames( NAME, `get`  , `auth`         )
export const STATISTICS   = createActionNames( NAME, `get`  , `statistics`   )
export const LOGIN        = createActionNames( NAME, `post` , `login`        )
export const FORGOT       = createActionNames( NAME, `post` , `forgot`       )
export const SET_PASSWORD = createActionNames( NAME, `post` , `set-password` )
export const RESET        = createActionNames( NAME, `post` , `reset`        )
export const LOGOUT       = createActionNames( NAME, `get`  , `logout`       )
export const REGISTER     = createActionNames( NAME, `post` , `register`     )
export const UPDATE       = createActionNames( NAME, `post` , `one`          )

const initialState = crio({
  isSaving        : false,
  isAuthenticated : false,
  user            : {}   ,
  statistics      : {}   ,
})

//////
// REDUCER
//////

export default function reducer( state = initialState, action ) {
  const { type, payload } = action

  switch ( type ) {

    case AUTH.SUCCESS:
    case LOGIN.SUCCESS:
    case SET_PASSWORD.SUCCESS:
    case RESET.SUCCESS:
      state = state.set( `isAuthenticated`, true )
      return state.set( `user`, payload.user )

    case AUTH.ERROR:
    case LOGOUT.SUCCESS:
      state = state.set( `isAuthenticated`, false )
      return state.set( `user`, {} )

    case STATISTICS.SUCCESS:
      return state.set( `statistics`, payload )

    case UPDATE.LOADING:
      return state.set( `isSaving`, true )
    case UPDATE.DONE:
      return state.set( `isSaving`, false )
    case UPDATE.SUCCESS:
      return state.set( `user`, payload.user )

    default:
      return state
  }
}

//////
// ACTION CREATORS
//////

export const auth = (params, jwt) => async dispatch => {
  const options = {
    url: `/${ NAME }/auth`,
  }
  await fetchDispatch({
    dispatch,
    actions:  AUTH,
    fetch:    { options, jwt },
  })
}

export const statistics = (params, jwt) => async dispatch => {
  const options = {
    url: `/${ NAME }/statistics`,
  }
  await fetchDispatch({
    dispatch,
    actions:  STATISTICS,
    fetch:    { options, jwt },
  })
}

export const login = (params, jwt) => async dispatch => {
  const { body } = params
  const options = {
    url: `/${ NAME }/login`,
    body,
  }
  await fetchDispatch({
    dispatch,
    actions:  LOGIN,
    fetch:    { options, jwt },
  })
}

export const logout = (params, jwt) => async dispatch => {
  const options = {
    url: `/${ NAME }/logout`,
  }
  await fetchDispatch({
    dispatch,
    actions:  LOGOUT,
    fetch:    { options, jwt },
  })
}

export const register = (params, jwt) => async dispatch => {
  const { body } = params
  const options = {
    url: `/${ NAME }/register`,
    body,
  }
  await fetchDispatch({
    dispatch,
    actions:  REGISTER,
    fetch:    { options, jwt },
  })
}

export const forgot = (params, jwt) => async dispatch => {
  const { body } = params
  const options = {
    url: `/${ NAME }/forgot`,
    body,
  }
  await fetchDispatch({
    dispatch,
    actions:  FORGOT,
    fetch:    { options, jwt },
  })
}

export const setPassword = (params, jwt) => async dispatch => {
  const { body } = params
  const options = {
    url: `/${ NAME }/set-password`,
    body,
  }
  await fetchDispatch({
    dispatch,
    actions:  SET_PASSWORD,
    fetch:    { options, jwt },
  })
}

export const reset = (params, jwt) => async dispatch => {
  const { body } = params
  const options = {
    url: `/${ NAME }/reset`,
    body,
  }
  await fetchDispatch({
    dispatch,
    actions:  RESET,
    fetch:    { options, jwt },
  })
}

export const updateSettings = (params, jwt) => async dispatch => {
  const { body } = params
  const options = {
    url: `${NAME}/settings`,
    body,
  }
  await fetchDispatch({
    dispatch,
    actions:  UPDATE,
    fetch:    { options, jwt },
  })
}

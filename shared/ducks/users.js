import crio from 'crio'

import createActionNames from './utils/create-action-names.js'
import fetchDispatch from './utils/fetch-dispatch.js'

const NAME = `users`

export const AUTH     = createActionNames( NAME, `get`,   `auth` )
export const LOGIN    = createActionNames( NAME, `post`,  `login` )
export const FORGOT   = createActionNames( NAME, `post`,  `forgot` )
export const RESET    = createActionNames( NAME, `post`,  `reset` )
export const LOGOUT   = createActionNames( NAME, `get`,   `logout` )
export const REGISTER = createActionNames( NAME, `post`,  `register` )
export const SAVE_ONE = createActionNames( NAME, `post`,  `one` )

const initialState = crio({
  isSaving       : false,
  isAuthenticated: false,
  current        : {}   ,
})

//////
// REDUCER
//////

export default function reducer( state = initialState, action ) {
  const { type, payload } = action

  switch ( type ) {

    case AUTH.SUCCESS:
    case LOGIN.SUCCESS:
    case REGISTER.SUCCESS:
    case RESET.SUCCESS:
      state = state.set( `isAuthenticated`, true )
      return state.set( `current`, payload.user )

    case AUTH.ERROR:
    case LOGOUT.SUCCESS:
      state = state.set( `isAuthenticated`, false )
      return state.set( `current`, {} )

    case SAVE_ONE.LOADING:
      return state.set( `isSaving`, true )
    case SAVE_ONE.DONE:
      return state.set( `isSaving`, false )
    case SAVE_ONE.SUCCESS:
      return state.set( `current`, payload.user )

    default:
      return state
  }
}

//////
// ACTION CREATORS
//////

export const auth = ({params, cookie}) => async dispatch => {
  const options = {
    url: `/account/auth`,
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
    url: `/account/login`,
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
    url: `/account/logout`,
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
    url: `/account/register`,
    body,
  }
  await fetchDispatch({
    dispatch,
    actions:  REGISTER,
    fetch:    { options, cookie },
  })
}

export const forgot = ({params, cookie}) => async dispatch => {
  const { body } = params
  const options = {
    url: `/account/forgot`,
    body,
  }
  await fetchDispatch({
    dispatch,
    actions:  FORGOT,
    fetch:    { options, cookie },
  })
}

export const reset = ({params, cookie}) => async dispatch => {
  const { body } = params
  const options = {
    url: `/account/reset`,
    body,
  }
  await fetchDispatch({
    dispatch,
    actions:  RESET,
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

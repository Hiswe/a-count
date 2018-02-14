import {get, post} from './helpers'

const NAME = `quotations`

export const GET_ALL = `@concompte/${NAME}/loaded`;
export const GET_ONE = `@concompte/${NAME}/loaded-one`;
export const SAVE_ONE = `@concompte/${NAME}/saved-one`;

const initialState = {
  list: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL:
      return Object.assign({}, state, {list: action.payload})

    case GET_ONE:
      return Object.assign({}, state, {current: action.payload})

    case SAVE_ONE:
      return Object.assign({}, state, {current: action.payload})

    default:
      return state
  }
}

export const getAll = () => dispatch => {
  return get(NAME)
    .then(payload => {
      dispatch({
        type: GET_ALL,
        payload,
      })
    })
}

export const fetchOne = ({id}) => dispatch => {
  id = id ? id : `new`
  return get(`${NAME}/${id}`)
    .then(payload => {
      dispatch({
        type: GET_ONE,
        payload,
      })
    })
}

export const saveOne = (body) => dispatch => {
  let {id} = body
  id = id ? id : `new`
  return post(`${NAME}/${id}`, body)
    .then(payload => {
      dispatch({
        type: SAVE_ONE,
        payload,
      })
    })
}

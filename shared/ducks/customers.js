import 'isomorphic-fetch'

export const CUSTOMERS_LOADED = `@concompte/customers/loaded`;

const initialState = {
  list: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CUSTOMERS_LOADED:
      console.log( state )
      return Object.assign({}, state, { list: action.customers })

    default:
      return state
  }
}

export const fetchCustomers = () => dispatch => {
  return fetch(`http://localhost:3000/api/v1/customers`)
    .then(res => res.json() )
    .then(customers => {
      dispatch({
        type: CUSTOMERS_LOADED,
        customers,
      })
    })
}

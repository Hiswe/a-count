import 'isomorphic-fetch'

export const CUSTOMERS_LOADED = `@concompte/customers/loaded`;
export const CUSTOMER_LOADED = `@concompte/customers/loaded-one`;
export const CUSTOMER_SAVED = `@concompte/customers/saved-one`;

const initialState = {
  list: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CUSTOMERS_LOADED:
      return Object.assign({}, state, {list: action.customers})

    case CUSTOMER_LOADED:
      return Object.assign({}, state, {current: action.customer})

    case CUSTOMER_SAVED:
      return Object.assign({}, state, {current: action.customer})

    default:
      return state
  }
}

export const fetchCustomers = () => dispatch => {
  return fetch(`http://localhost:3000/api/v1/customers`)
    .then(res => res.json() )
    .then(res => {
      dispatch({
        type:       CUSTOMERS_LOADED,
        customers:  res.payload,
      })
    })
}

export const fetchCustomer = ({id}) => dispatch => {
  id = id ? id : `new`
  return fetch(`http://localhost:3000/api/v1/customers/${id}`)
    .then(res => res.json() )
    .then(res => {
      dispatch({
        type:     CUSTOMER_LOADED,
        customer: res.payload,
      })
    })
}

export const createUpdateCustomer = (body) => dispatch => {
  let {id} = body
  console.log(`[createUpdateCustomer]`, id)
  id = id ? id : `new`
  return fetch(`http://localhost:3000/api/v1/customers/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( body )
  })
    .then(res => res.json() )
    .then(res => {
      dispatch({
        type:     CUSTOMER_SAVED,
        customer: res.payload,
      })
    })
}

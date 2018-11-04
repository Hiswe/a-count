import { Customer } from '@acount/types'

export interface CustomersState {
  active: Customer[]
  current: false | Customer
}

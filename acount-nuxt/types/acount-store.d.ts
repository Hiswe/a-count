import { AcountUser, Customer } from '@acount/types'

//----- NOTIFICATIONS

export interface NotificationPayload {
  type: `success` | `info` | `warning` | `error`
  message: string
}
export interface Notification extends NotificationPayload {
  id: string
}
export interface NotificationState {
  list: Notification[]
}

//----- FORM-ERRORS

export type FormErrorKey = string

export type FormErrorPayload = {
  key: FormErrorKey
  message: string
}
// vuetify <v-text-field> has prop "error-messages"  in format [messages, …]
export type FormError = [string]
export interface FormErrorState {
  [Key: string]: FormError
}

//----- USER

export interface UserState {
  user: null | AcountUser
}

//----- CUSTOMER

export interface CustomersState {
  active: Customer[]
  current: false | Customer
}

//----- ROOT STATE

export interface RootState {
  notifications: NotificationState
  user: UserState
  customers: CustomersState
  formErrors: FormErrorState
}

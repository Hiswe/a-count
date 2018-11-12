import { ListMeta } from './list'

export interface CustomerLight {
  id: string
  name: string
  address: string
}

export interface Customer extends CustomerLight {
  quotationsCount: number
  quotationsTotal: number
  invoicesCount: number
  invoicesTotal: number
  invoicesTotalPaid: number
  invoicesTotalLeft: number
}

export interface GetAllCustomers {
  rows: Customer[]
  meta: ListMeta
}

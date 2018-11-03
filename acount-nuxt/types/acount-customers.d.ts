export interface Customer {
  id: string
  name: string
  address: string
  quotationsCount: number
  quotationsTotal: number
  invoicesCount: number
  invoicesTotal: number
  invoicesTotalPaid: number
  invoicesTotalLeft: number
}

export interface CustomersState {
  active: Customer[]
}

export interface GetAllCustomers {
  rows: Customer[]
  meta: {}
}

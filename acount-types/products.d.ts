export interface ProductConfig {
  quantity: number
  price: number
}

export interface Product {
  _id?: string
  checked: boolean
  description: string
  quantity: number
  price: number
}

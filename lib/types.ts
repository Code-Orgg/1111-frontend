export type Availability = 'available' | 'low' | 'sold'

export interface Product {
  id: string
  title: string
  series: string
  year: number
  price: number
  image: string
  medium: string
  dimensions: string
  editionSize: number
  editionRemaining: number
  availability: Availability
  description: string
  arDurationSeconds: number
}

export interface CartLine {
  product: Product
  framing: string
  quantity: number
}

export interface User {
  id: string
  name: string
  email: string
}

export interface AuthResponse {
  token: string
  user: User
}

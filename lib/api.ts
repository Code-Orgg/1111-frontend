import type { AuthResponse, Product } from './types'
import { DEMO_PRODUCTS } from './demo-data'

const API_URL = process.env.NEXT_PUBLIC_API_URL
const TOKEN_KEY = 'ouverture_token'

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(TOKEN_KEY)
}

function authHeaders(): Record<string, string> {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is not configured')
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...(init?.headers ?? {}),
    },
  })
  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText)
    throw new Error(message || `Request failed: ${res.status}`)
  }
  return res.json() as Promise<T>
}

// GET /api/products — falls back to the demo catalogue when the API is offline.
export async function getProducts(): Promise<Product[]> {
  try {
    return await request<Product[]>('/api/products')
  } catch {
    return DEMO_PRODUCTS
  }
}

// GET /api/products/:id — falls back to the demo catalogue when the API is offline.
export async function getProduct(id: string): Promise<Product | null> {
  try {
    return await request<Product>(`/api/products/${id}`)
  } catch {
    return DEMO_PRODUCTS.find((p) => p.id === id) ?? null
  }
}

// POST /api/auth/login
export async function login(email: string, password: string): Promise<AuthResponse> {
  const data = await request<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  setToken(data.token)
  return data
}

// POST /api/auth/register
export async function register(
  name: string,
  email: string,
  password: string,
): Promise<AuthResponse> {
  const data = await request<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })
  setToken(data.token)
  return data
}

// POST /api/orders — order placement at checkout.
export async function placeOrder(payload: unknown): Promise<{ orderId: string }> {
  return request<{ orderId: string }>('/api/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

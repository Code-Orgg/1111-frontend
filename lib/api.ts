import type { AuthResponse, CartLine, Product, User } from './types'
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

// Thrown on any non-2xx API response. Carries the parsed backend message
// (`{ error: "..." }` or `{ message: "..." }`) so callers/forms can show it
// directly instead of a raw status code.
export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_URL) throw new ApiError('NEXT_PUBLIC_API_URL is not configured', 0)
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...(init?.headers ?? {}),
    },
  })

  if (!res.ok) {
    let message = res.statusText || `Request failed: ${res.status}`
    try {
      const body = await res.json()
      message = body?.error || body?.message || message
    } catch {
      // Non-JSON error body — fall back to statusText above.
    }
    throw new ApiError(message, res.status)
  }

  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
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

// POST /api/auth/signup
export async function register(
  name: string,
  email: string,
  password: string,
): Promise<AuthResponse> {
  const data = await request<AuthResponse>('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })
  setToken(data.token)
  return data
}

// POST /api/auth/logout
export async function logout(): Promise<void> {
  try {
    await request('/api/auth/logout', { method: 'POST' })
  } finally {
    clearToken()
  }
}

// GET /api/auth/me — used to restore a session from a stored token.
export async function getCurrentUser(): Promise<User> {
  const data = await request<{ user: User }>('/api/auth/me')
  return data.user
}

// POST /api/auth/forgot-password
export async function requestPasswordReset(email: string): Promise<{ message: string }> {
  return request('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) })
}

// POST /api/auth/verify-otp
export async function verifyResetOtp(email: string, otp: string): Promise<{ verified: boolean; recoveryToken: string }> {
  return request('/api/auth/verify-otp', { method: 'POST', body: JSON.stringify({ email, otp }) })
}

// POST /api/auth/reset-password
export async function resetPassword(email: string, otp: string, newPassword: string): Promise<{ message: string }> {
  return request('/api/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ email, otp, newPassword }),
  })
}

export async function getProducts(): Promise<Product[]> {
  if (!API_URL) return DEMO_PRODUCTS; // Fallback to demo data if API_URL isn't set yet

  try {
    const res = await fetch(`${API_URL}/api/products`, {
      signal: AbortSignal.timeout(5000), // Times out after 5s so build doesn't hang
      cache: 'no-store',
    });

    if (!res.ok) return DEMO_PRODUCTS;
    return await res.json();
  } catch (error) {
    console.warn("API request failed, falling back to demo data:", error);
    return DEMO_PRODUCTS;
  }
}

// POST /api/orders – order placement at checkout.
// `{ paid: true }` (wallet — order is already confirmed) or a `checkoutUrl`
// to redirect the buyer to the payment gateway's hosted checkout page.
export async function placeOrder(payload: PlaceOrderPayload): Promise<PlaceOrderResponse> {
  return request<PlaceOrderResponse>('/api/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

// GET /api/orders/payment-methods — which gateways are currently configured.
export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  try {
    const data = await request<{ methods: PaymentMethod[] }>('/api/orders/payment-methods')
    return data.methods
  } catch {
    return []
  }
}

// GET /api/cart — server-persisted cart, used to restore a collector's cart
// across devices once they're signed in.
export async function getServerCart(): Promise<CartLine[]> {
  const data = await request<{ items: CartLine[] }>('/api/cart')
  return data.items
}

// PUT /api/cart — replaces the signed-in collector's server-side cart wholesale.
export async function saveServerCart(lines: CartLine[]): Promise<void> {
  await request('/api/cart', {
    method: 'PUT',
    body: JSON.stringify({
      items: lines.map((l) => ({ productId: l.product.id, qty: l.quantity, framing: l.framing })),
    }),
  })
}

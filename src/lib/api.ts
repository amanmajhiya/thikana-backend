/**
 * THIKANA API Client
 * Connects frontend to backend server
 * Change VITE_API_URL in .env to point to your backend
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000/api';

// Helper to get auth token
function getToken(): string | null {
  return localStorage.getItem('thikana-token');
}

// Generic API call
async function api(endpoint: string, options?: RequestInit) {
  const token = getToken();

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

// ========== AUTH APIs ==========
export const authApi = {
  // Direct register/login with Name + Phone - NO OTP
  registerOrLogin: (data: { phone: string; name: string; referralCode?: string }) =>
    api('/auth/register', { method: 'POST', body: JSON.stringify(data) }),

  // Google OAuth login
  googleLogin: (data: { googleId: string; email: string; name?: string; photoUrl?: string }) =>
    api('/auth/google', { method: 'POST', body: JSON.stringify(data) }),

  me: () => api('/auth/me'),

  updateProfile: (data: { name?: string; email?: string; upiId?: string }) =>
    api('/auth/profile', { method: 'PUT', body: JSON.stringify(data) }),
};

// ========== PROPERTY APIs ==========
export const propertyApi = {
  list: (filters?: Record<string, string>) => {
    const qs = filters ? '?' + new URLSearchParams(filters) : '';
    return api('/properties' + qs);
  },

  get: (id: string) => api('/properties/' + id),

  create: (data: any) => api('/properties', { method: 'POST', body: JSON.stringify(data) }),

  update: (id: string, data: any) => api('/properties/' + id, { method: 'PUT', body: JSON.stringify(data) }),

  toggleSave: (id: string) => api('/properties/' + id + '/save', { method: 'POST' }),

  saved: () => api('/properties/saved'),

  myListings: () => api('/properties/user/my-listings'),

  search: (query: string) => api('/properties/search?q=' + encodeURIComponent(query)),
};

// ========== CHAT APIs ==========
export const chatApi = {
  getMessages: (propertyId: string) => api('/chats/' + propertyId),

  send: (data: { propertyId: string; message: string; receiverId: string }) =>
    api('/chats/send', { method: 'POST', body: JSON.stringify(data) }),

  conversations: () => api('/chats/conversations'),
};

// ========== REFERRAL APIs ==========
export const referralApi = {
  get: () => api('/referrals'),
  withdraw: (upiId: string) => api('/referrals/withdraw', { method: 'POST', body: JSON.stringify({ upiId }) }),
};

// ========== PAYMENT APIs ==========
export const paymentApi = {
  createOrder: (planType: string, amount: number) =>
    api('/payments/create-order', { method: 'POST', body: JSON.stringify({ planType, amount }) }),

  verify: (data: { orderId: string; paymentId: string; signature: string; propertyId?: string }) =>
    api('/payments/verify', { method: 'POST', body: JSON.stringify(data) }),
};

// ========== AUTH TOKEN MANAGEMENT ==========
export function setToken(token: string) {
  localStorage.setItem('thikana-token', token);
}

export function removeToken() {
  localStorage.removeItem('thikana-token');
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

export { API_URL };

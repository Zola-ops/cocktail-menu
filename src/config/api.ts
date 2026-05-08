const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
const API_KEY = import.meta.env.VITE_API_KEY || ''
const API_MODEL = import.meta.env.VITE_API_MODEL || 'doubao-seed-2.0-lite'
const API_TEMPERATURE = Number(import.meta.env.VITE_API_TEMPERATURE) || 1
const API_MAX_TOKENS = Number(import.meta.env.VITE_API_MAX_TOKENS) || 9128

export const apiConfig = {
  baseURL: API_BASE_URL,
  apiKey: API_KEY,
  model: API_MODEL,
  temperature: API_TEMPERATURE,
  maxTokens: API_MAX_TOKENS,
}

export function isApiConfigured(): boolean {
  return Boolean(API_BASE_URL && API_KEY)
}

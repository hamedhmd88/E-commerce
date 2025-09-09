import axios from "axios"

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem("authToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    console.log("[v0] API Request:", config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    console.error("[v0] Request Error:", error)
    return Promise.reject(error)
  },
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log("[v0] API Response:", response.status, response.config.url)
    return response
  },
  (error) => {
    console.error("[v0] Response Error:", error.response?.status, error.config?.url)

    // Handle common error cases
    if (error.response?.status === 401) {
      // Clear auth token and redirect to login
      localStorage.removeItem("authToken")
      window.location.href = "/login"
    }

    return Promise.reject(error)
  },
)

export default api

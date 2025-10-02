

// import axios from "axios"

// // Create axios instance with base configuration
// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "https://fakestoreapi.com",
//     timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//     // اضافه کردن User-Agent برای جلوگیری از مسدود شدن
//     "User-Agent": "Mozilla/5.0 (compatible; NextJS-App/1.0)",
//   },
// })

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     let token = null;
//     if (typeof window !== 'undefined') {
//       token = localStorage.getItem("authToken")
//     }
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }

//     console.log("API Request:", config.method?.toUpperCase(), config.url)
//     return config
//   },
//   (error) => {
//     console.error("Request Error:", error)
//     return Promise.reject(error)
//   },
// )

// // Response interceptor
// api.interceptors.response.use(
//   (response) => {
//     console.log("API Response:", response.status, response.config.url)
//     return response
//   },
//   (error) => {
//     console.error("Response Error:", error.response?.status, error.config?.url)

//     // Handle common error cases
//     if (error.response?.status === 401) {
//       // Clear auth token and redirect to login only in browser
//       if (typeof window !== 'undefined') {
//         localStorage.removeItem("authToken")
//         window.location.href = "/login"
//       }
//     }

//     // Handle 403 errors gracefully
//     if (error.response?.status === 403) {
//       console.warn("Access forbidden - API might be rate limited or blocked")
//     }

//     return Promise.reject(error)
//   },
// )

// export default api

import axios from "axios"

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://fakestoreapi.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (compatible; NextJS-App/1.0)",
  },
  // withCredentials: true, // فعلاً نیازی نیست - فقط در صورت نیاز به cookie-based auth
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    let token = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem("authToken")
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // فقط در development mode لاگ کنیم
    if (process.env.NODE_ENV === 'development') {
      console.log("API Request:", config.method?.toUpperCase(), config.url)
    }
    return config
  },
  (error) => {
    console.error("Request Error:", error)
    return Promise.reject(error)
  },
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // فقط در development mode لاگ کنیم
    if (process.env.NODE_ENV === 'development') {
      console.log("API Response:", response.status, response.config.url)
    }
    return response
  },
  (error) => {
    console.error("Response Error:", error.response?.status, error.config?.url)

    // Handle common error cases
    if (error.response?.status === 401) {
      // Clear auth token and redirect to login only in browser
      if (typeof window !== 'undefined') {
        localStorage.removeItem("authToken")
        // بهتر است از router.push استفاده کنیم به جای window.location
        if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
          window.location.href = "/login"
        }
      }
    }

    // Handle 403 errors gracefully
    if (error.response?.status === 403) {
      console.warn("Access forbidden - API might be rate limited or blocked")
    }

    // Handle network errors
    if (!error.response) {
      console.error("Network error - API might be unreachable")
    }

    return Promise.reject(error)
  },
)

export default api
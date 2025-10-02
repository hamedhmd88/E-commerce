// import api from "./api"

// export interface User {
//   id: number
//   email: string
//   username: string
//   password: string
//   name: {
//     firstname: string
//     lastname: string
//   }
//   address: {
//     city: string
//     street: string
//     number: number
//     zipcode: string
//     geolocation: {
//       lat: string
//       long: string
//     }
//   }
//   phone: string
// }

// export interface LoginCredentials {
//   username: string
//   password: string
// }

// export interface LoginResponse {
//   token: string
// }

// export const authService = {
//   // Login user
//   login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
//     const response = await api.post("/auth/login", credentials)
//     return response.data
//   },

//   // Get user profile
//   getUser: async (id: number): Promise<User> => {
//     const response = await api.get(`/users/${id}`)
//     return response.data
//   },

//   // Get all users (for admin)
//   getUsers: async (): Promise<User[]> => {
//     const response = await api.get("/users")
//     return response.data
//   },

//   // Update user
//   updateUser: async (id: number, userData: Partial<User>): Promise<User> => {
//     const response = await api.put(`/users/${id}`, userData)
//     return response.data
//   },
// }


import api from "./api"

export interface User {
  id: number
  email: string
  username: string
  password: string
  name: {
    firstname: string
    lastname: string
  }
  address: {
    city: string
    street: string
    number: number
    zipcode: string
    geolocation: {
      lat: string
      long: string
    }
  }
  phone: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
}

export const authService = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await api.post("/auth/login", credentials)
      return response.data
    } catch (error) {
      console.error('Login error:', error)
      throw error // برای login بهتر است error را throw کنیم تا UI بتواند آن را handle کند
    }
  },

  // Get user profile
  getUser: async (id: number): Promise<User> => {
    try {
      const response = await api.get(`/users/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error)
      throw error
    }
  },

  // Get all users (for admin)
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await api.get("/users")
      return response.data
    } catch (error) {
      console.error('Error fetching users:', error)
      return [] // برای لیست کاربران، آرایه خالی برمی‌گردانیم
    }
  },

  // Update user
  updateUser: async (id: number, userData: Partial<User>): Promise<User> => {
    try {
      const response = await api.put(`/users/${id}`, userData)
      return response.data
    } catch (error) {
      console.error(`Error updating user ${id}:`, error)
      throw error // برای update بهتر است error را throw کنیم
    }
  },
}
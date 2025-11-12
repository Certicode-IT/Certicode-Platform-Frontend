import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  username: string
  password: string
  email?: string
}

interface AuthState {
  user: User | null
  users: User[] 
  login: (username: string, password: string) => boolean
  register: (username: string, email: string, password: string) => boolean
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],

      login: (username, password) => {
        const users = get().users
        const foundUser = users.find(
          (u) => u.username === username && u.password === password
        )

        if (foundUser) {
          set({ user: foundUser })
          return true
        }
        return false
      },

      register: (username, email, password) => {
        const users = get().users
        const existing = users.find((u) => u.username === username)

        if (existing) return false 

        const newUser = { username, email, password }
        set({
          users: [...users, newUser],
          user: newUser,
        })
        return true
      },

      logout: () => set({ user: null }),
    }),
    { name: "auth-storage" } 
  )
)

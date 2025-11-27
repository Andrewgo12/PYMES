import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { USERS, type User } from '@/lib/constants'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
  updateProfile: (data: Partial<Pick<User, 'name' | 'avatar'>>) => void
  changePassword: (currentPassword: string, newPassword: string) => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string, password: string) => {
        const user = USERS.find(
          (u: User) => u.email === email && u.password === password
        )
        if (user) {
          set({ user, isAuthenticated: true })
          return true
        }
        return false
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      updateProfile: (data) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...data } })
        }
      },
      changePassword: (currentPassword, newPassword) => {
        const currentUser = get().user
        if (currentUser && currentUser.password === currentPassword) {
          set({ user: { ...currentUser, password: newPassword } })
          return true
        }
        return false
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)

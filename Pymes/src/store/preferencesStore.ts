import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface NotificationPreferences {
  lowStockAlerts: boolean
  weeklySummary: boolean
}

interface PreferencesState {
  notifications: NotificationPreferences
  updateNotifications: (preferences: Partial<NotificationPreferences>) => void
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      notifications: {
        lowStockAlerts: true,
        weeklySummary: false,
      },
      updateNotifications: (preferences) =>
        set((state) => ({
          notifications: { ...state.notifications, ...preferences },
        })),
    }),
    {
      name: 'preferences-storage',
    }
  )
)

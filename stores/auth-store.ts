import { authClient } from "@/lib/auth"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { MMKV } from "react-native-mmkv"

export type UserState = {
  userId: string
  email: string
  emailVerified: boolean
  name: string
  sessionId: string
  expiresAtInEpochMiliSeconds: number
}

export type UserActions = {
  removeUserSession: () => void
  setUserSession: (user: UserState) => void
  fetchUserSession: () => void
}

export type UserStore = UserState & { actions: UserActions }

const storeName = "user-session-storage"
const userMmkvStorage = new MMKV({ id: storeName })

const userStorage = {
  getItem: (name: string) => {
    try {
      const value = userMmkvStorage.getString(name)
      return value ? JSON.parse(value) : null
    } catch (_) {
      return null
    }
  },
  setItem: (name: string, value: any) => {
    try {
      userMmkvStorage.set(name, JSON.stringify(value))
    } catch (_) {
      return
    }
  },
  removeItem: (name: string) => {
    userMmkvStorage.delete(name)
  },
}

export const initialUserState: UserState = {
  userId: "",
  email: "",
  emailVerified: false,
  name: "",
  sessionId: "",
  expiresAtInEpochMiliSeconds: 0,
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...initialUserState,
      actions: {
        removeUserSession: () => set(initialUserState),
        setUserSession: (user: UserState) => set(user),
        fetchUserSession: async () => {
          const { data, error } = await authClient.getSession()

          if (!data) {
            if (error?.code === "SESSION_EXPIRED") set(initialUserState)
            return
          }

          const {
            user: { id: userId, name, email, emailVerified },
            session: { id: sessionId, expiresAt },
          } = data

          set(() => ({
            userId,
            email,
            emailVerified,
            name,
            sessionId,
            expiresAtInEpochMiliSeconds: expiresAt.getTime(),
          }))
        },
      },
    }),
    {
      name: storeName,
      storage: userStorage,
    }
  )
)

useUserStore.getState().actions.fetchUserSession()

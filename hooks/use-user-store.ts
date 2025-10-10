import { useUserStore } from "@/stores/user-store"

export const useUserName = () => useUserStore((state) => state.name)
export const useUserEmail = () => useUserStore((state) => state.email)
export const useIsUserEmailVerified = () =>
  useUserStore((state) => state.emailVerified)
export const useUserId = () => useUserStore((state) => state.userId)
export const useUserSessionId = () => useUserStore((state) => state.sessionId)
export const useUserExpiresAt = () =>
  useUserStore((state) => state.expiresAtInEpochMiliSeconds)
export const useUserStoreActions = () => useUserStore((state) => state.actions)

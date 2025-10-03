import { PropsWithChildren, useEffect } from "react"
import { AppState, Platform } from "react-native"
import type { AppStateStatus } from "react-native"
import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"

import * as Network from "expo-network"

export function TanstackQueryProvider({ children }: PropsWithChildren) {
  const queryClient = new QueryClient()

  onlineManager.setEventListener((setOnline) => {
    const eventSubscription = Network.addNetworkStateListener((state) => {
      setOnline(!!state.isConnected)
    })
    return eventSubscription.remove
  })

  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active")
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange)

    return () => subscription.remove()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

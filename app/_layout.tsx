import { TanstackQueryProvider } from "@/providers/tanstack-query-provider"
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"
import { PortalHost } from "@rn-primitives/portal"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { KeyboardProvider } from "react-native-keyboard-controller"

import { useColorScheme } from "@/hooks/use-color-scheme"
import {
  useIsUserEmailVerified,
  useUserEmail,
  useUserExpiresAt,
} from "@/hooks/use-user-store"

import { useUserStore } from "@/stores/user-store"
import { useEffect } from "react"
import "react-native-reanimated"
import "./../global.css"

export const unstable_settings = {
  initialRouteName: "index",
  anchor: "(tabs)",
}

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()

  const expiresAtEpochMiliseconds = useUserExpiresAt()
  const isSessionExpired = expiresAtEpochMiliseconds < new Date().getTime()
  const isEmailVerified = useIsUserEmailVerified()
  const isAuthenticated = isEmailVerified && !isSessionExpired
  const email = useUserEmail()

  useEffect(() => {
    if (useUserStore.persist.hasHydrated()) {
      SplashScreen.hideAsync()
    }
  }, [])

  return (
    <KeyboardProvider>
      <TanstackQueryProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Protected guard={isAuthenticated}>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="sign-up" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
            </Stack.Protected>
            <Stack.Protected guard={!isAuthenticated}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack.Protected>
            <Stack.Screen name="otp" options={{ headerShown: false }} />

            {/* <Stack.Screen */}
            {/*   name="modal" */}
            {/*   options={{ presentation: "modal", title: "Modal" }} */}
            {/* /> */}
          </Stack>
          <StatusBar style="auto" />
          <PortalHost />
        </ThemeProvider>
      </TanstackQueryProvider>
    </KeyboardProvider>
  )
}

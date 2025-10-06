import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"
import { PortalHost } from "@rn-primitives/portal"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { TanstackQueryProvider } from "@/providers/tanstack-query-provider"
import { KeyboardProvider } from "react-native-keyboard-controller"

import { useColorScheme } from "@/hooks/use-color-scheme"

import "react-native-reanimated"
import "./../global.css"

export const unstable_settings = {
  // initialRouteName: "welcome",
  // anchor: "(tabs)",
}

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <KeyboardProvider>
      <TanstackQueryProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="otp" options={{ headerShown: false }} />
            {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
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

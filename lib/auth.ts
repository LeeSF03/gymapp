import { createAuthClient } from "better-auth/react"
import { expoClient } from "@better-auth/expo/client"
import { emailOTPClient } from "better-auth/client/plugins"
import * as SecureStore from "expo-secure-store"
import { Platform } from "react-native"

const baseURL =
  Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000"

export const authClient = createAuthClient({
  baseURL,
  plugins: [
    expoClient({
      scheme: "gymapp",
      storagePrefix: "myapp",
      storage: SecureStore,
    }),
    emailOTPClient(),
  ],
})

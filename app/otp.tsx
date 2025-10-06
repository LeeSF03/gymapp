import { Image } from "expo-image"
import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { Link, useLocalSearchParams } from "expo-router"
import { KeyboardAvoidingView } from "react-native-keyboard-controller"
import { OtpInput } from "@/components/otp-input"
import { useState } from "react"
import { authClient } from "@/lib/auth"

export default function LoginPage() {
  const [otp, setOtp] = useState("")
  const { email, type } = useLocalSearchParams<{
    email: string
    type: "sign-in" | "email-verification " | "forget-password"
  }>()

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 items-center justify-center gap-y-8 bg-black px-8"
    >
      <Image
        className="flex w-full flex-row items-center justify-center "
        source={require("@/assets/images/dumbbell.svg")}
        style={{ width: 40, height: 40 }}
      />
      <View className="gap-y-2">
        <Text variant="h3" className="text-center">
          Enter Verification Code
        </Text>
        <Text variant="muted" className="text-center">
          A 6-digit verification code has been sent to your registered email
          address.
        </Text>
      </View>
      <View className="w-full gap-y-4">
        <OtpInput otp={otp} handleOtpChange={setOtp} />
      </View>
      <View className="flex flex-row items-center justify-center">
        <Text variant="muted">{"Didn't receive the code? "}</Text>
        <Link href="/sign-up" asChild>
          <Text variant="small" className="py-0.5 text-center text-primary">
            Resend
          </Text>
        </Link>
      </View>
      <Button size="full" variant="default">
        <Text>Verify</Text>
      </Button>
    </KeyboardAvoidingView>
  )
}

import { Image } from "expo-image"
import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { Link, useLocalSearchParams } from "expo-router"
import { KeyboardAvoidingView } from "react-native-keyboard-controller"
import { OtpInput } from "@/components/otp-input"
import { useState } from "react"
import { otpScheme } from "@/lib/schema"
import { $ZodIssue } from "better-auth"
import { OtpHeader } from "@/components/otp/otp-header"

type OtpPageQueryParam =
  | {
      email: string
      type: "sign-in" | "email-verification"
      password: string
    }
  | {
      email: string
      type: "forget-password"
      password: undefined
    }

export default function OtpPage() {
  const [otp, setOtp] = useState("")
  const [otpError, setOtpError] = useState<$ZodIssue[]>([])

  const handleOtpChange = (value: string) => {
    setOtp(value)
  }
  const handleSubmit = () => {
    const { success, error, data } = otpScheme.safeParse(otp)
    if (success) {
      // ... submit otp
      setOtpError([])
      console.log({ data })
    } else {
      setOtpError(error.issues)
    }
  }

  // const { email, type, password } = useLocalSearchParams<OtpPageQueryParam>()

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 items-center justify-center gap-y-8 bg-black px-8"
    >
      <OtpHeader />
      <View className="w-full">
        <OtpInput otp={otp} handleOtpChange={handleOtpChange} />
        {otpError.length > 0 &&
          otpError.map(({ message }, index) => (
            <Text
              key={index}
              variant="xs"
              className="mt-0.5 pl-2 text-destructive"
            >
              {message}
            </Text>
          ))}
      </View>
      <View className="flex flex-row items-center justify-center">
        <Text variant="muted">{"Didn't receive the code? "}</Text>
        <Link href="/sign-up" asChild>
          <Text variant="small" className="py-0.5 text-center text-primary">
            Resend
          </Text>
        </Link>
      </View>
      <Button size="full" variant="default" onPress={handleSubmit}>
        <Text>Verify</Text>
      </Button>
    </KeyboardAvoidingView>
  )
}

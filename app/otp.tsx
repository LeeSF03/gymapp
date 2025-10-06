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
      <View className="w-full gap-y-1.5">
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

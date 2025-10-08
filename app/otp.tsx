import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { Link, useLocalSearchParams, useRouter } from "expo-router"
import { KeyboardAvoidingView } from "react-native-keyboard-controller"
import { OtpInput } from "@/components/otp-input"
import { useState } from "react"
import {
  otpInputSchema,
  OtpPageQueryParam,
  otpPageQueryParamSchema,
} from "@/lib/schema"
import { $ZodIssue } from "better-auth"
import { OtpHeader } from "@/components/otp/otp-header"
import { authClient } from "@/lib/auth"

export default function OtpPage() {
  const [otp, setOtp] = useState("")
  const [otpError, setOtpError] = useState<$ZodIssue[]>([])

  const router = useRouter()
  const queryParams = useLocalSearchParams<OtpPageQueryParam>()

  const {
    success,
    error,
    data: parsedQueryParams,
  } = otpPageQueryParamSchema.safeParse(queryParams)
  if (!success) {
    console.log({ error }) // replace with toast
    router.back()
    return <></>
  }
  const { email, type } = parsedQueryParams

  const handleOtpChange = (value: string) => {
    setOtp(value)
  }
  const handleSubmit = async () => {
    const { success, error, data: parsedOtp } = otpInputSchema.safeParse(otp)
    if (success) {
      if (type === "email-verification") {
        const { data: signUpData, error: signUpError } =
          await authClient.signUp.email({
            email,
            password: parsedQueryParams.password,
            name: parsedQueryParams.name,
          })

        if (signUpData) {
          const result = await authClient.emailOtp.checkVerificationOtp({
            email,
            type,
            otp: parsedOtp,
          })
          console.log({ result })
        } else {
          console.log({ signUpError })
        }
      }
      setOtpError([])
    } else {
      setOtpError(error.issues)
    }
  }

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

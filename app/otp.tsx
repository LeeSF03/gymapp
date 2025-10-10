import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { Link, Redirect, useLocalSearchParams, useRouter } from "expo-router"
import { KeyboardAvoidingView } from "react-native-keyboard-controller"
import { OtpInput } from "@/components/otp-input"
import { useState } from "react"
import {
  otpInputSchema,
  OtpPageQueryParam,
  otpPageQueryParamSchema,
} from "@/lib/schema"
import { OtpHeader } from "@/components/otp/otp-header"
import { authClient } from "@/lib/auth"
import { useUserStoreActions } from "@/hooks/use-user-store"

export default function OtpPage() {
  const [otp, setOtp] = useState("")
  const [otpError, setOtpError] = useState<string[]>([])

  const queryParams = useLocalSearchParams<OtpPageQueryParam>()

  const router = useRouter()
  const { setUserSession } = useUserStoreActions()
  const { success, data: parsedQueryParams } =
    otpPageQueryParamSchema.safeParse(queryParams)

  if (!success) {
    return <Redirect href="/" />
  }

  const handleOtpChange = (value: string) => {
    setOtp(value)
  }

  const sendOtp = async (data: typeof parsedQueryParams & { otp: string }) => {
    const { email, type, otp } = data

    if (type === "email-verification") {
      const { data: verficationData, error: verificationError } =
        await authClient.emailOtp.verifyEmail({
          email,
          otp,
        })
      const { data: sessionData, error: sessionError } =
        await authClient.getSession()

      if (verficationData && sessionData) {
        setUserSession({
          userId: sessionData.user.id,
          email: sessionData.user.email,
          emailVerified: sessionData.user.emailVerified,
          name: sessionData.user.name,
          sessionId: sessionData.session.id,
          expiresAtInEpochMiliSeconds: sessionData.session.expiresAt.getTime(),
        })
      }

      return verificationError ?? sessionError
    } else if (type === "sign-in") {
      const { data: signInData, error: signInError } =
        await authClient.signIn.emailOtp({
          email,
          otp,
        })
      const { data: sessionData, error: sessionError } =
        await authClient.getSession()

      if (signInData && sessionData) {
        setUserSession({
          userId: sessionData.user.id,
          email: sessionData.user.email,
          emailVerified: sessionData.user.emailVerified,
          name: sessionData.user.name,
          sessionId: sessionData.session.id,
          expiresAtInEpochMiliSeconds: sessionData.session.expiresAt.getTime(),
        })
      }

      return signInError ?? sessionError
    } else if (type === "forget-password") {
      const { error } = await authClient.emailOtp.resetPassword({
        email,
        otp,
        password: data.password,
      })

      return error
    }

    return null
  }

  const handleSubmit = async () => {
    setOtpError([])

    const { data: parsedOtp, error: parsedOtpError } =
      otpInputSchema.safeParse(otp)

    if (parsedOtpError) {
      setOtpError(parsedOtpError.issues.map(({ message }) => message))
      return
    }

    let otpError = await sendOtp({ ...parsedQueryParams, otp: parsedOtp })

    if (otpError?.message) {
      setOtpError([otpError.message])
      return
    }

    router.dismissTo("/(tabs)")
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
          otpError.map((errorMessage, index) => (
            <Text
              key={index}
              variant="xs"
              className="mt-0.5 pl-2 text-destructive"
            >
              {errorMessage}
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

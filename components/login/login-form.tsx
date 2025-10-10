import { Image } from "expo-image"
import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useRouter } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import { LoginFormScheme, loginSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { PasswordInput } from "@/components/ui/password-input"
import { authClient } from "@/lib/auth"

export function LoginForm() {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginFormScheme>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const router = useRouter()

  const onSubmit = async (data: LoginFormScheme) => {
    clearErrors()

    const { email, password } = data

    const { error } = await authClient.signIn.credentialVerifier({
      email,
      password,
    })

    if (error) {
      setError("root", { message: error.message })
      return
    }

    const { error: sendVerificationOtpError } =
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
      })

    if (
      sendVerificationOtpError &&
      sendVerificationOtpError.statusText === "INTERNAL_SERVER_ERROR"
    ) {
      setError("root", { message: "Something went wrong. Please try again." })
      return
    }

    router.push(`/otp?email=${email}&type=sign-in`)
  }
  return (
    <View className="w-full gap-y-4">
      <View className="w-full gap-y-4">
        <Controller
          control={control}
          name="email"
          render={({
            field: { onChange, onBlur, value },
            formState: { errors },
          }) => (
            <View className={cn({ "-mb-1.5": errors.email })}>
              <Input
                className={cn({ "border-destructive": errors.email })}
                placeholder="Email"
                placeholderClassName="text-muted-foreground"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.email && (
                <Text variant="xs" className="mt-0.5 pl-2 text-destructive">
                  {errors.email.message}
                </Text>
              )}
            </View>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({
            field: { onChange, onBlur, value },
            formState: { errors },
          }) => (
            <View className={cn({ "-mb-1.5": errors.password })}>
              <PasswordInput
                className={cn({ "border-destructive": errors.email })}
                placeholder="Password"
                placeholderClassName="text-muted-foreground"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.password && (
                <Text variant="xs" className="mt-0.5 pl-2 text-destructive">
                  {errors.password.message}
                </Text>
              )}
            </View>
          )}
        />
      </View>
      {errors.root?.message && (
        <Text variant="xs" className="mt-0.5 pl-2 text-destructive">
          {errors.root.message}
        </Text>
      )}
      <Link href="/sign-up" asChild>
        <Text variant="small" className="py-0.5 text-right text-primary">
          Forgot Password?
        </Text>
      </Link>
      <Button size="full" variant="default" onPress={handleSubmit(onSubmit)}>
        <Text>Login</Text>
      </Button>
    </View>
  )
}

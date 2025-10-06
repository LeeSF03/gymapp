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

export function LoginForm() {
  const { control, handleSubmit } = useForm<LoginFormScheme>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const router = useRouter()

  const onSubmit = (data: LoginFormScheme) => {
    router.push(
      `/otp?email=${data.email}&type=sign-in&password=${data.password}`
    )
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

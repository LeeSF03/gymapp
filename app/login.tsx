import { Image } from "expo-image"
import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "expo-router"
import { HorizontalDividerWithChildren } from "@/components/horizontal-divider-with-children"
import { KeyboardAvoidingView } from "react-native-keyboard-controller"
import { Controller, useForm } from "react-hook-form"
import { LoginForm, loginSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { PasswordInput } from "@/components/ui/password-input"

export default function LoginPage() {
  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: LoginForm) => {
    console.log({ data })
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 items-center justify-center gap-y-6 bg-black px-8"
    >
      <View className="flex w-full flex-row items-center justify-center gap-x-2">
        <Image
          source={require("@/assets/images/dumbbell.svg")}
          style={{ width: 40, height: 40 }}
        />
        <Text variant="h4">Gym Life</Text>
      </View>
      <View className="gap-y-2">
        <Text variant="h3" className="text-center">
          Welcome Back
        </Text>
        <Text variant="muted" className="text-center">
          Login to continue your fitness journey
        </Text>
      </View>
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
      <HorizontalDividerWithChildren>
        <Text variant="muted">Or continue with</Text>
      </HorizontalDividerWithChildren>
      <View className="flex flex-row items-center justify-center gap-x-2">
        <Button variant="outline" size="lg" className="flex-1 flex-shrink">
          <Image
            source={require("@/assets/images/google-sso.svg")}
            style={{ width: 20, height: 20 }}
          />
          <Text className="font-bold">Google</Text>
        </Button>
        <Button variant="outline" size="lg" className="flex-1 flex-shrink">
          <Image
            source={require("@/assets/images/facebook-sso.svg")}
            style={{ width: 20, height: 20 }}
          />
          <Text className="font-bold">Facebook</Text>
        </Button>
      </View>
    </KeyboardAvoidingView>
  )
}

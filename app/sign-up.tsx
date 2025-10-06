import { View } from "react-native"
import { KeyboardAvoidingView } from "react-native-keyboard-controller"
import { Text } from "@/components/ui/text"
import { Input } from "@/components/ui/input"
import { Link, useRouter } from "expo-router"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useForm, Controller } from "react-hook-form"
import { signUpSchema, SignUpForm } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { TriangleAlert } from "lucide-react-native"
import { PasswordInput } from "@/components/ui/password-input"

export default function SignUpPage() {
  const { control, handleSubmit } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAndConditionsCheck: undefined,
    },
  })
  const router = useRouter()

  const onSubmit = (data: SignUpForm) => {
    console.log({ data })
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 items-center justify-center  bg-black px-8"
    >
      <Text variant="h3" className="mb-8 text-center">
        Create Account
      </Text>
      <View className="w-full gap-y-4">
        <Controller
          control={control}
          name="name"
          render={({
            field: { onChange, onBlur, value },
            formState: { errors },
          }) => (
            <View className={cn({ "-mb-1.5": errors.name })}>
              <Input
                className={cn({ "border-destructive": errors.name })}
                placeholder="Name"
                placeholderClassName="text-muted-foreground"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.name && (
                <Text variant="xs" className="mt-0.5 pl-2 text-destructive">
                  {errors.name.message}
                </Text>
              )}
            </View>
          )}
        />
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
        <Controller
          control={control}
          name="confirmPassword"
          render={({
            field: { onChange, onBlur, value },
            formState: { errors },
          }) => (
            <View className={cn({ "-mb-1.5": errors.confirmPassword })}>
              <Input
                className={cn({ "border-destructive": errors.confirmPassword })}
                placeholder="Confirm Password"
                placeholderClassName="text-muted-foreground"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.confirmPassword && (
                <Text variant="xs" className="mt-0.5 pl-2 text-destructive">
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>
          )}
        />
      </View>
      <Controller
        control={control}
        name="termsAndConditionsCheck"
        render={({
          field: { onChange, onBlur, value },
          formState: { errors },
        }) => (
          <View
            className={cn("mt-6 flex w-full items-center", {
              "-mb-2 mt-4": errors.termsAndConditionsCheck,
            })}
          >
            <View className="flex w-full flex-row items-center gap-x-2">
              <Checkbox
                id="terms"
                className={cn({
                  "border-destructive": errors.termsAndConditionsCheck,
                })}
                checked={value}
                onCheckedChange={onChange}
                onBlur={onBlur}
              />
              <Label onPress={() => {}} htmlFor="terms">
                I accept the{" "}
                <Link href="/sign-up" className="text-primary">
                  Terms and Conditions
                </Link>{" "}
              </Label>
            </View>
            {errors.termsAndConditionsCheck && (
              <View className="mt-1.5 flex w-full flex-row justify-start gap-x-2 rounded-md bg-primary/20 p-3">
                <TriangleAlert
                  className="color-primary"
                  color="hsl(48,100%,67%)"
                  size={16}
                  strokeWidth={2}
                />
                <Text variant="small">
                  {errors.termsAndConditionsCheck.message}
                </Text>
              </View>
            )}
          </View>
        )}
      />
      <Link href="/sign-up" asChild>
        <Button
          size="full"
          variant="default"
          className="mt-8"
          onPress={handleSubmit(onSubmit)}
        >
          <Text>Sign Up</Text>
        </Button>
      </Link>
    </KeyboardAvoidingView>
  )
}

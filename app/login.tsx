import { Image } from "expo-image"
import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "expo-router"
import { HorizontalDividerWithChildren } from "@/components/horizontal-divider-with-children"
import { KeyboardAvoidingView } from "react-native-keyboard-controller"

export default function LoginPage() {
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
          <Input
            placeholder="Email"
            placeholderClassName="text-muted-foreground"
          />
          <Input
            placeholder="Password"
            placeholderClassName="text-muted-foreground"
          />
        </View>
        <Link href="/sign-up" asChild>
          <Text
            variant="small"
            className="py-0.5 text-right text-primary underline"
          >
            Forgot Password?
          </Text>
        </Link>
        <Link href="/login" asChild>
          <Button size="full" variant="default">
            <Text>Login</Text>
          </Button>
        </Link>
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

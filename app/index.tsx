import { View } from "react-native"
import { Image } from "expo-image"
import { Link } from "expo-router"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"

export default function WelcomePage() {
  return (
    <View className="flex-1 items-center justify-center bg-black px-8 py-6">
      <View className="flex w-full flex-1 items-center justify-center">
        <Image
          source={require("@/assets/images/dumbbell.svg")}
          style={{ width: 80, height: 80 }}
        />
        <View className="mt-3 gap-y-2">
          <Text variant="h1" className="text-center text-white">
            {" Welcome To\nGym Life "}
          </Text>
          <Text className="text-center" variant="muted">
            lorum asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdfasdfas
            asdfasdfas asdfasdf
          </Text>
        </View>
      </View>
      <View className="mb-4 flex w-full items-center gap-y-4">
        <Link href="/login" asChild>
          <Button size="full" variant="default">
            <Text>Login</Text>
          </Button>
        </Link>
        <Link href="/sign-up" asChild>
          <Button size="full" variant="secondary">
            <Text>Sign Up</Text>
          </Button>
        </Link>
      </View>
    </View>
  )
}

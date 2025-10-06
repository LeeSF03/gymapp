import { Image } from "expo-image"
import { View } from "react-native"
import { Text } from "@/components/ui/text"

export function LoginHeader() {
  return (
    <>
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
    </>
  )
}

import { Image } from "expo-image"
import { View } from "react-native"
import { Text } from "@/components/ui/text"

export function OtpHeader() {
  return (
    <>
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
    </>
  )
}

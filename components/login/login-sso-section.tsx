import { Image } from "expo-image"
import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"

export function LoginSsoSection() {
  return (
    <>
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
    </>
  )
}

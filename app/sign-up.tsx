import { View } from "react-native"
import { KeyboardAvoidingView } from "react-native-keyboard-controller"
import { Text } from "@/components/ui/text"
import { Input } from "@/components/ui/input"
import { Link } from "expo-router"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function SignUpPage() {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 items-center justify-center  bg-black px-8"
    >
      <Text variant="h2" className="mb-8 text-center">
        Create Account
      </Text>
      <View className="w-full gap-y-4">
        <Input
          placeholder="Name"
          placeholderClassName="text-muted-foreground"
        />
        <Input
          placeholder="Email"
          placeholderClassName="text-muted-foreground"
        />

        <Input
          placeholder="Password"
          placeholderClassName="text-muted-foreground"
          secureTextEntry
        />
        <Input
          placeholder="Confirm Password"
          placeholderClassName="text-muted-foreground"
          secureTextEntry
        />
      </View>
      <View className="mt-6 flex w-full flex-row items-center gap-3">
        <Checkbox id="terms" checked={true} onCheckedChange={() => {}} />
        <Label onPress={() => {}} htmlFor="terms">
          I accept to the{" "}
          <Link href="/sign-up" className="text-primary">
            Terms and Conditions
          </Link>{" "}
        </Label>
      </View>
      <Link href="/sign-up" asChild>
        <Button size="full" variant="default" className="mt-8">
          <Text>Sign Up</Text>
        </Button>
      </Link>
    </KeyboardAvoidingView>
  )
}

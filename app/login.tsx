import { KeyboardAvoidingView } from "react-native-keyboard-controller"
import { LoginForm } from "@/components/login/login-form"
import { LoginHeader } from "@/components/login/login-header"
import { HorizontalDividerWithChildren } from "@/components/horizontal-divider-with-children"
import { Text } from "@/components/ui/text"
import { LoginSsoSection } from "@/components/login/login-sso-section"

export default function LoginPage() {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 items-center justify-center gap-y-6 bg-black px-8"
    >
      <LoginHeader />
      <LoginForm />
      <HorizontalDividerWithChildren>
        <Text variant="muted">Or continue with</Text>
      </HorizontalDividerWithChildren>
      <LoginSsoSection />
    </KeyboardAvoidingView>
  )
}

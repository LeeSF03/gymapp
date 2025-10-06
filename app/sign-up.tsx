import { KeyboardAvoidingView } from "react-native-keyboard-controller"
import { SignUpHeader } from "@/components/sign-up/sign-up-header"
import { SignUpForm } from "@/components/sign-up/sign-up-form"

export default function SignUpPage() {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 justify-center  bg-black px-8"
    >
      <SignUpHeader />
      <SignUpForm />
    </KeyboardAvoidingView>
  )
}

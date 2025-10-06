import { TextInput, TextInputKeyPressEvent, View } from "react-native"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"
import { useRef, useState } from "react"

type OtpInputProps = {
  otp: string
  handleOtpChange: (otp: string) => void
  length?: number
}

function OtpInput({ otp, handleOtpChange, length = 6 }: OtpInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const otpHiddenInput = useRef<TextInput>(null)

  const onBlur = () => {
    setIsFocused(false)
  }
  const onFocus = () => {
    otpHiddenInput.current?.focus()
    setIsFocused(true)
  }
  const onChangeText = (otpInput: string) => {
    if (otpInput.length <= length) handleOtpChange(otpInput)
  }

  return (
    <View>
      {/* To hide text input without affecting layout */}
      <View className="h-0 w-0">
        <TextInput
          onBlur={onBlur}
          ref={(node) => {
            if (node) otpHiddenInput.current = node
          }}
          onChangeText={onChangeText}
          value={otp}
          keyboardType="number-pad"
        />
      </View>
      <View className="flex flex-row gap-x-2">
        {Array.from({ length }).map((_, index) => (
          <Input
            className={cn("aspect-square flex-1 text-center", {
              "border-primary":
                (isFocused && otp.length === index) || otp.length === length,
            })}
            onFocus={onFocus}
            value={otp[index] ?? ""}
            key={index}
            caretHidden
            keyboardType="number-pad"
          />
        ))}
      </View>
    </View>
  )
}

export { OtpInput, type OtpInputProps }

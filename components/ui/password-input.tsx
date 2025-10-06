import React, { useState } from "react"
import {
  View,
  TextInput,
  type TextInputProps,
  TouchableOpacity,
} from "react-native"
import { Eye, EyeOff } from "lucide-react-native"
import { cn } from "@/lib/utils"

export type PasswordInputProps = TextInputProps & React.RefAttributes<TextInput>

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false)

  return (
    <View
      className={cn(
        "flex h-14 w-full flex-row items-center rounded-xl border border-input bg-background px-3 py-1 shadow-sm shadow-black/5 dark:bg-input/30 sm:h-9",
        props.editable === false && "opacity-50",
        className
      )}
    >
      <TextInput
        secureTextEntry={!visible}
        className="flex-1 text-base leading-5 text-foreground"
        placeholderTextColor="#9ca3af"
        {...props}
      />
      <TouchableOpacity
        onPress={() => setVisible(!visible)}
        className="pl-2 pr-1"
        accessibilityLabel={visible ? "Hide password" : "Show password"}
      >
        {visible ? (
          <EyeOff size={20} color="#9ca3af" />
        ) : (
          <Eye size={20} color="#9ca3af" />
        )}
      </TouchableOpacity>
    </View>
  )
}

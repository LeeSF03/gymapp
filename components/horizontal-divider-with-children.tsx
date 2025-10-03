import { Divider, DividerProps } from "@/components/ui/divider"
import { cn } from "@/lib/utils"
import { View, type ViewProps } from "react-native"

type HorizontalDividerWithChildrenProps = ViewProps & {
  dividerProps?: DividerProps
}

export function HorizontalDividerWithChildren({
  dividerProps,
  children,
  ...props
}: HorizontalDividerWithChildrenProps) {
  return (
    <View
      className={cn("flex w-full flex-row items-center justify-center gap-x-2")}
      {...props}
    >
      <Divider className="flex-1" {...dividerProps} />
      {children}
      <Divider className="flex-1" {...dividerProps} />
    </View>
  )
}

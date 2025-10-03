import React from "react"
import { View, type ViewProps } from "react-native"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const dividerVariant = cva("bg-secondary", {
  variants: {
    orientation: {
      vertical: "w-px h-full",
      horizontal: "h-px w-full",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
})

type DividerProps = ViewProps &
  VariantProps<typeof dividerVariant> & {
    className?: string
  }

const Divider = React.forwardRef<View, DividerProps>(
  ({ className, orientation, ...props }, ref) => {
    return (
      <View
        ref={ref}
        {...props}
        className={cn(dividerVariant({ orientation }), className)}
      />
    )
  }
)

Divider.displayName = "Divider"

export { Divider, type DividerProps }

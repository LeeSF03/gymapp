import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"
import * as CheckboxPrimitive from "@rn-primitives/checkbox"
import { Check } from "lucide-react-native"

const DEFAULT_HIT_SLOP = 24

function Checkbox({
  className,
  checkedClassName,
  indicatorClassName,
  iconClassName,
  ...props
}: CheckboxPrimitive.RootProps &
  React.RefAttributes<CheckboxPrimitive.RootRef> & {
    checkedClassName?: string
    indicatorClassName?: string
    iconClassName?: string
  }) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "size-4 shrink-0 rounded-[4px] border border-input shadow-sm shadow-black/5 dark:bg-input/30",
        props.checked && cn("border-primary", checkedClassName),
        props.disabled && "opacity-50",
        className
      )}
      hitSlop={DEFAULT_HIT_SLOP}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn(
          "h-full w-full items-center justify-center bg-primary",
          indicatorClassName
        )}
      >
        <Icon
          as={Check}
          size={12}
          strokeWidth={3.5}
          className={cn("text-primary-foreground", iconClassName)}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }

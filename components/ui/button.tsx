import { TextClassContext } from "@/components/ui/text"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Pressable } from "react-native"

const buttonVariants = cva(
  "group shrink-0 flex-row items-center justify-center gap-2 rounded-xl shadow-none",
  {
    variants: {
      variant: {
        default: "bg-primary active:bg-primary/90 shadow-sm shadow-black/5",
        destructive:
          "bg-destructive active:bg-destructive/90 dark:bg-destructive/60 shadow-sm shadow-black/5",
        outline:
          "border-border bg-background active:bg-accent dark:bg-input/30 dark:border-input dark:active:bg-input/50 border shadow-sm shadow-black/5",
        secondary:
          "bg-secondary active:bg-secondary/80 shadow-sm shadow-black/5",
        ghost: "active:bg-accent dark:active:bg-accent/50",
        link: "",
      },
      size: {
        default: "h-10 px-4 py-2 sm:h-9",
        sm: "h-9 gap-1.5 rounded-md px-3 sm:h-8",
        lg: "h-11 rounded-md px-6 sm:h-10",
        icon: "h-10 w-10 sm:h-9 sm:w-9",
        full: "h-14 w-full rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const buttonTextVariants = cva("text-foreground ", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      destructive: "text-white",
      outline: "",
      secondary: "text-secondary-foreground",
      ghost: "group-active:text-accent-foreground",
      link: "text-primary group-active:underline",
    },
    size: {
      default: "text-sm font-medium",
      sm: "",
      lg: "",
      icon: "",
      full: "text-lg font-bold",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

type ButtonProps = React.ComponentProps<typeof Pressable> &
  React.RefAttributes<typeof Pressable> &
  VariantProps<typeof buttonVariants>

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
      <Pressable
        className={cn(
          props.disabled && "opacity-50",
          buttonVariants({ variant, size }),
          className
        )}
        role="button"
        {...props}
      />
    </TextClassContext.Provider>
  )
}

export { Button, buttonTextVariants, buttonVariants }
export type { ButtonProps }

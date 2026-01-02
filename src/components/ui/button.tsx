import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover shadow-elegant hover:shadow-lg hover:scale-105",
        growth: "bg-growth text-growth-foreground hover:bg-growth-hover shadow-feature hover:shadow-lg hover:scale-105",
        hero: "bg-biz-navy text-white shadow-elegant hover:bg-primary-hover hover:shadow-lg hover:scale-105 font-semibold",
        trust: "bg-trust text-trust-foreground hover:opacity-90 shadow-card hover:shadow-lg",
        teal: "bg-biz-teal text-white hover:opacity-90 shadow-hub-teal hover:shadow-lg hover:scale-105",
        copper: "bg-biz-copper text-white hover:opacity-90 shadow-hub-copper hover:shadow-lg hover:scale-105", 
        lime: "bg-biz-lime text-white hover:opacity-90 shadow-hub-lime hover:shadow-lg hover:scale-105",
        citrine: "bg-biz-citrine text-biz-navy hover:opacity-90 shadow-hub-citrine hover:shadow-lg hover:scale-105",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type CtaType = "primary" | "secondary" | "diagnostic-bridge" | "related-resource";
export type HubName = "BizHealth.ai" | "BizGrowth" | "BizGuides" | "BizTools" | "BizLeaDeR";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  "data-hub"?: HubName;
  "data-cta-type"?: CtaType;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, "data-hub": dataHub, "data-cta-type": dataCtaType, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        data-hub={dataHub}
        data-cta-type={dataCtaType}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const hubBadgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300",
  {
    variants: {
      hub: {
        "BizHealth.ai": "bg-biz-navy text-white",
        BizGrowth: "bg-biz-gold text-biz-navy",
        BizGuides: "bg-biz-teal text-white",
        BizTools: "bg-biz-copper text-white",
        BizLeaDeR: "bg-biz-magenta text-white",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base",
      },
    },
    defaultVariants: {
      hub: "BizHealth.ai",
      size: "default",
    },
  }
);

export type HubType = "BizHealth.ai" | "BizGrowth" | "BizGuides" | "BizTools" | "BizLeaDeR";

export interface HubBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof hubBadgeVariants> {
  hub: HubType;
  "data-hub"?: string;
  "data-cta-type"?: "primary" | "secondary" | "diagnostic-bridge" | "related-resource";
}

const HubBadge = ({ className, hub, size, ...props }: HubBadgeProps) => {
  return (
    <span
      className={cn(hubBadgeVariants({ hub, size, className }))}
      data-hub={hub}
      {...props}
    >
      {hub}
    </span>
  );
};

export { HubBadge, hubBadgeVariants };

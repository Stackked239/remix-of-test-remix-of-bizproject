import { cn } from "@/lib/utils";

type GradientVariant = 
  | "green-gold" 
  | "navy-green" 
  | "gold-copper"
  | "teal-navy"
  | "magenta-navy";

interface GradientDividerProps {
  /** Preset gradient color combination */
  variant?: GradientVariant;
  /** Height of the divider in Tailwind sizing (default: "h-1") */
  height?: "h-0.5" | "h-1" | "h-1.5" | "h-2" | "h-3" | "h-4";
  /** Additional Tailwind classes */
  className?: string;
}

const gradientVariants: Record<GradientVariant, string> = {
  "green-gold": "from-biz-green via-biz-gold to-biz-green",
  "navy-green": "from-biz-navy via-biz-green to-biz-navy",
  "gold-copper": "from-biz-gold via-biz-copper to-biz-gold",
  "teal-navy": "from-biz-teal via-biz-navy to-biz-teal",
  "magenta-navy": "from-biz-magenta via-biz-navy to-biz-magenta",
};

/**
 * A reusable gradient stripe divider for visual separation between sections.
 * Commonly used before the GlobalFooter for consistent branding.
 * 
 * @example
 * // Default usage (green to gold gradient, h-1 height)
 * <GradientDivider />
 * 
 * @example
 * // Custom variant and height
 * <GradientDivider variant="navy-green" height="h-2" />
 */
const GradientDivider = ({ 
  variant = "green-gold", 
  height = "h-1",
  className 
}: GradientDividerProps) => {
  return (
    <div 
      className={cn(
        "w-full bg-gradient-to-r",
        height,
        gradientVariants[variant],
        className
      )}
      role="presentation"
      aria-hidden="true"
    />
  );
};

export default GradientDivider;

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline"
}

export function GradientButton({
  className,
  variant = "solid",
  ...props
}: GradientButtonProps) {
  return (
    <Button
      className={cn(
        "rounded-full",
        variant === "solid"
          ? "bg-gradient-to-r from-[#710F11] to-[#D7671C] text-white"
          : "border-[#710F11] gradient-heading",
        className
      )}
      {...props}
    />
  )
}

export function GradientHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("gradient-heading", className)}
      {...props}
    />
  )
} 
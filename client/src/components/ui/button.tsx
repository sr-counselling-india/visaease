import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Note: I'm not installing radix-ui/react-slot just for this if not needed, 
// but it's standard. I'll stick to a simpler button for now to avoid extra deps if user didn't ask,
// but the plan said "premium". Let's use a nice custom one.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95";
    
    const variants = {
      primary: "bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-lg hover:shadow-primary/30 border border-transparent",
      secondary: "bg-white text-primary hover:bg-gray-50 border border-gray-200 shadow-sm",
      outline: "border-2 border-primary text-primary hover:bg-primary/5",
      ghost: "hover:bg-gray-100 text-gray-700",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs",
      md: "h-11 px-6 text-sm",
      lg: "h-14 px-8 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };

import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Badge = forwardRef(({ 
  children, 
  className, 
  variant = "default",
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-colors"
  
  const variants = {
    default: "bg-white/10 text-white border border-white/20",
    primary: "bg-primary/20 text-primary border border-primary/30",
    secondary: "bg-secondary/20 text-secondary border border-secondary/30",
    success: "bg-success/20 text-success border border-success/30",
    warning: "bg-warning/20 text-warning border border-warning/30",
    error: "bg-error/20 text-error border border-error/30"
  }

  return (
    <span
      ref={ref}
      className={cn(baseClasses, variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge
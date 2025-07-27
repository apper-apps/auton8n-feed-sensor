import React, { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"

const Button = forwardRef(({ 
  children, 
  className, 
  variant = "primary", 
  size = "default",
  disabled = false,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-blue-500 text-black hover:shadow-lg hover:shadow-primary/30 focus:ring-primary",
    secondary: "bg-transparent border-2 border-white/30 text-white hover:border-primary hover:bg-primary/10 focus:ring-primary",
    accent: "bg-gradient-to-r from-secondary to-accent text-black hover:shadow-lg hover:shadow-secondary/30 focus:ring-secondary",
    ghost: "bg-transparent text-white hover:bg-white/10 focus:ring-white/50"
  }
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl"
  }

  return (
    <motion.button
      ref={ref}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      disabled={disabled}
      {...props}
    >
      {variant === "primary" || variant === "accent" ? (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 transition-opacity duration-300"
          whileHover={{ opacity: 1 }}
        />
      ) : null}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
})

Button.displayName = "Button"

export default Button
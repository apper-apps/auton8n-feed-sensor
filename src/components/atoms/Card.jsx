import React, { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"

const Card = forwardRef(({ 
  children, 
  className, 
  variant = "default",
  hover = true,
  ...props 
}, ref) => {
  const baseClasses = "relative rounded-2xl backdrop-blur-xl border transition-all duration-300"
  
  const variants = {
    default: "bg-surface/50 border-white/10 hover:border-primary/50",
    glass: "bg-white/5 border-white/20 hover:bg-white/10",
    glow: "bg-surface/80 border-primary/30 shadow-lg shadow-primary/20",
    dark: "bg-black/80 border-white/5 hover:border-white/20"
  }

  const hoverEffects = hover ? "hover:shadow-2xl hover:-translate-y-1" : ""

  const cardContent = (
    <div
      ref={ref}
      className={cn(baseClasses, variants[variant], hoverEffects, className)}
      {...props}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full transition-transform duration-700 group-hover:translate-x-full" />
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )

  return hover ? (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      {cardContent}
    </motion.div>
  ) : cardContent
})

Card.displayName = "Card"

export default Card
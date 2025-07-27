import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Textarea = forwardRef(({ 
  className, 
  label,
  error,
  rows = 4,
  ...props 
}, ref) => {
  const baseClasses = "w-full px-4 py-3 bg-surface/50 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 backdrop-blur-sm resize-none"
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-white/80">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={cn(baseClasses, error && "border-error focus:ring-error", className)}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  )
})

Textarea.displayName = "Textarea"

export default Textarea
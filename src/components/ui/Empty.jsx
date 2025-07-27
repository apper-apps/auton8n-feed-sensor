import React from "react"
import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  message = "No data available", 
  action,
  actionLabel = "Get Started",
  icon = "Inbox"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-[400px] text-center max-w-md mx-auto"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10"
      >
        <ApperIcon name={icon} className="w-8 h-8 text-gray-400" />
      </motion.div>
      
      <h3 className="text-xl font-semibold text-white mb-3">Nothing here yet</h3>
      
      <p className="text-gray-400 mb-8 leading-relaxed">
        {message}
      </p>
      
      {action && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button onClick={action} variant="primary">
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            {actionLabel}
          </Button>
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 flex items-center space-x-6 text-sm text-gray-500"
      >
        <div className="flex items-center space-x-2">
          <ApperIcon name="Lightbulb" className="w-4 h-4" />
          <span>Try our templates</span>
        </div>
        <div className="flex items-center space-x-2">
          <ApperIcon name="Sparkles" className="w-4 h-4" />
          <span>Create from scratch</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Empty
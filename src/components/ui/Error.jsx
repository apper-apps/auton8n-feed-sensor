import React from "react"
import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  title = "Oops!" 
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
        className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center mb-6 border border-error/30"
      >
        <ApperIcon name="AlertTriangle" className="w-8 h-8 text-error" />
      </motion.div>
      
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      
      <p className="text-gray-400 mb-8 leading-relaxed">
        {message}
      </p>
      
      {onRetry && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button onClick={onRetry} variant="primary">
            <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-sm text-gray-500"
      >
        If the problem persists, please check your connection and try again.
      </motion.div>
    </motion.div>
  )
}

export default Error
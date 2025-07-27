import React from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full mb-6"
      />
      
      <motion.h3 
        className="text-xl font-semibold text-white mb-2"
        animate={{ opacity: [1, 0.7, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {message}
      </motion.h3>
      
      <motion.p 
        className="text-gray-400"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        Please wait while we process your request...
      </motion.p>

      {/* Loading dots animation */}
      <div className="flex space-x-1 mt-6">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-primary rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              delay: i * 0.2 
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Loading
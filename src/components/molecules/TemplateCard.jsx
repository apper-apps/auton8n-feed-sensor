import React from "react"
import { motion } from "framer-motion"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const TemplateCard = ({ template, onUse, index = 0 }) => {
  const handleUse = () => {
    onUse(template.basePrompt)
  }

  const getCategoryColor = (category) => {
    const colorMap = {
      communication: "primary",
      productivity: "secondary",
      marketing: "accent",
      development: "success",
      social: "warning",
      finance: "error",
      default: "default"
    }
    return colorMap[category.toLowerCase()] || colorMap.default
  }

  const getCategoryIcon = (category) => {
    const iconMap = {
      communication: "MessageSquare",
      productivity: "Zap",
      marketing: "Megaphone",
      development: "Code",
      social: "Share2",
      finance: "DollarSign",
      default: "Star"
    }
    return iconMap[category.toLowerCase()] || iconMap.default
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card 
        variant="glass" 
        className="p-6 h-full flex flex-col group cursor-pointer hover:shadow-2xl hover:shadow-primary/10"
        onClick={handleUse}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${getCategoryColor(template.category)}/20 to-${getCategoryColor(template.category)}/40 flex items-center justify-center border border-${getCategoryColor(template.category)}/30`}>
              <ApperIcon 
                name={getCategoryIcon(template.category)} 
                className={`w-5 h-5 text-${getCategoryColor(template.category)}`} 
              />
            </div>
            <Badge variant={getCategoryColor(template.category)}>
              {template.category}
            </Badge>
          </div>
          
          <ApperIcon 
            name="ArrowUpRight" 
            className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" 
          />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
            {template.name}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-3">
            {template.description}
          </p>
        </div>

        <div className="pt-4 border-t border-white/10">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-center group-hover:bg-primary/10 group-hover:text-primary"
          >
            <ApperIcon name="Play" className="w-4 h-4 mr-2" />
            Use Template
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

export default TemplateCard
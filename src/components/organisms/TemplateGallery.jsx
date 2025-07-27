import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import TemplateCard from "@/components/molecules/TemplateCard"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import { templateService } from "@/services/api/templateService"

const TemplateGallery = ({ onTemplateSelect }) => {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { value: "all", label: "All Templates", icon: "Grid3X3" },
    { value: "communication", label: "Communication", icon: "MessageSquare" },
    { value: "productivity", label: "Productivity", icon: "Zap" },
    { value: "marketing", label: "Marketing", icon: "Megaphone" },
    { value: "development", label: "Development", icon: "Code" },
    { value: "social", label: "Social Media", icon: "Share2" }
  ]

  useEffect(() => {
    loadTemplates()
  }, [])

  const loadTemplates = async () => {
    try {
      setError("")
      setLoading(true)
      const data = await templateService.getAll()
      setTemplates(data)
    } catch (err) {
      setError("Failed to load templates. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const filteredTemplates = selectedCategory === "all" 
    ? templates 
    : templates.filter(template => template.category === selectedCategory)

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadTemplates} />
  if (templates.length === 0) return <Empty message="No templates available" />

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-7xl mx-auto"
      id="templates"
    >
      <div className="text-center mb-12">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Workflow Templates
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-400 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Get started quickly with pre-built automation templates for common use cases
        </motion.p>
      </div>

      {/* Category Filter */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={selectedCategory === category.value ? "primary" : "ghost"}
            size="sm"
            onClick={() => setSelectedCategory(category.value)}
            className="flex items-center space-x-2"
          >
            <ApperIcon name={category.icon} className="w-4 h-4" />
            <span>{category.label}</span>
          </Button>
        ))}
      </motion.div>

      {/* Templates Grid */}
      {filteredTemplates.length === 0 ? (
        <Empty message={`No templates found in ${selectedCategory} category`} />
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTemplates.map((template, index) => (
            <TemplateCard
              key={template.Id}
              template={template}
              onUse={onTemplateSelect}
              index={index}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

export default TemplateGallery
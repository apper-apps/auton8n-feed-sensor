import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"
import WorkflowInput from "@/components/molecules/WorkflowInput"
import WorkflowVisualization from "@/components/molecules/WorkflowVisualization"
import JsonViewer from "@/components/molecules/JsonViewer"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { workflowService } from "@/services/api/workflowService"

const WorkflowGenerator = ({ initialPrompt = "" }) => {
  const [currentStep, setCurrentStep] = useState("input") // input, generating, visualization, json
  const [generatedWorkflow, setGeneratedWorkflow] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async (description) => {
    try {
      setIsGenerating(true)
      setCurrentStep("generating")
      
      const workflow = await workflowService.generateWorkflow(description)
      setGeneratedWorkflow(workflow)
      setCurrentStep("visualization")
      
      toast.success("Workflow generated successfully!")
    } catch (error) {
      toast.error("Failed to generate workflow. Please try again.")
      setCurrentStep("input")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleViewJson = () => {
    setCurrentStep("json")
  }

  const handleStartOver = () => {
    setCurrentStep("input")
    setGeneratedWorkflow(null)
  }

  const handleBackToVisualization = () => {
    setCurrentStep("visualization")
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {currentStep === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <WorkflowInput 
                onGenerate={handleGenerate} 
                isGenerating={isGenerating}
                initialValue={initialPrompt}
              />
            </motion.div>
          )}

          {currentStep === "generating" && (
            <motion.div
              key="generating"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full mb-8"
              />
              
              <motion.h2 
                className="text-3xl font-bold text-white mb-4"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Generating Your Workflow
              </motion.h2>
              
              <motion.p 
                className="text-gray-400 text-lg max-w-md"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                Our AI is analyzing your requirements and creating the perfect n8n automation workflow...
              </motion.p>

              <div className="mt-8 flex space-x-4 text-sm text-gray-500">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                  className="flex items-center space-x-2"
                >
                  <ApperIcon name="Brain" className="w-4 h-4" />
                  <span>Analyzing requirements</span>
                </motion.div>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  className="flex items-center space-x-2"
                >
                  <ApperIcon name="Workflow" className="w-4 h-4" />
                  <span>Building workflow</span>
                </motion.div>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                  className="flex items-center space-x-2"
                >
                  <ApperIcon name="CheckCircle" className="w-4 h-4" />
                  <span>Optimizing nodes</span>
                </motion.div>
              </div>
            </motion.div>
          )}

          {currentStep === "visualization" && generatedWorkflow && (
            <motion.div
              key="visualization"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <WorkflowVisualization workflow={generatedWorkflow} />
              
              <div className="flex justify-center space-x-4">
                <Button onClick={handleViewJson} variant="primary">
                  <ApperIcon name="FileCode" className="w-5 h-5 mr-2" />
                  View JSON
                </Button>
                <Button onClick={handleStartOver} variant="secondary">
                  <ApperIcon name="RotateCcw" className="w-5 h-5 mr-2" />
                  Create New
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === "json" && generatedWorkflow && (
            <motion.div
              key="json"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <JsonViewer workflow={generatedWorkflow} />
              
              <div className="flex justify-center space-x-4">
                <Button onClick={handleBackToVisualization} variant="secondary">
                  <ApperIcon name="ArrowLeft" className="w-5 h-5 mr-2" />
                  Back to Visualization
                </Button>
                <Button onClick={handleStartOver} variant="ghost">
                  <ApperIcon name="RotateCcw" className="w-5 h-5 mr-2" />
                  Create New Workflow
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default WorkflowGenerator
import React, { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const JsonViewer = ({ workflow }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      const jsonString = JSON.stringify(workflow, null, 2)
      await navigator.clipboard.writeText(jsonString)
      setCopied(true)
      toast.success("Workflow JSON copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error("Failed to copy to clipboard")
    }
  }

  const handleDownload = () => {
    const jsonString = JSON.stringify(workflow, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${workflow.name || "workflow"}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Workflow downloaded!")
  }

  if (!workflow) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">n8n Workflow JSON</h3>
        <p className="text-gray-400">Ready to import into your n8n instance</p>
      </div>

      <Card variant="dark" className="overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <ApperIcon name="FileCode" className="w-5 h-5 text-primary" />
            <span className="font-medium text-white">
              {workflow.name || "workflow"}.json
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleCopy}
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2"
            >
              <ApperIcon 
                name={copied ? "Check" : "Copy"} 
                className={`w-4 h-4 ${copied ? "text-success" : "text-white"}`} 
              />
              <span>{copied ? "Copied!" : "Copy"}</span>
            </Button>
            
            <Button
              onClick={handleDownload}
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Download" className="w-4 h-4 text-white" />
              <span>Download</span>
            </Button>
          </div>
        </div>

        <div className="p-4">
          <pre className="text-sm text-gray-300 overflow-x-auto max-h-96 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">
            <code>{JSON.stringify(workflow, null, 2)}</code>
          </pre>
        </div>
      </Card>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 p-4 bg-info/10 border border-info/30 rounded-xl"
      >
        <div className="flex items-start space-x-3">
          <ApperIcon name="Info" className="w-5 h-5 text-info mt-0.5" />
          <div>
            <h4 className="font-semibold text-info mb-1">How to use this workflow:</h4>
            <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
              <li>Copy the JSON above or download the file</li>
              <li>Open your n8n instance</li>
              <li>Click "Import from File" or "Import from Clipboard"</li>
              <li>Paste or upload the workflow JSON</li>
              <li>Configure your credentials and test the workflow</li>
            </ol>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default JsonViewer
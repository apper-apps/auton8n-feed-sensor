import React, { useState } from "react"
import { motion } from "framer-motion"
import Textarea from "@/components/atoms/Textarea"
import Button from "@/components/atoms/Button"
import ApperIcon from "@@/components/ApperIcon"

const WorkflowInput = ({ onGenerate, isGenerating }) => {
  const [description, setDescription] = useState("")
  const [charCount, setCharCount] = useState(0)
  const maxChars = 500

  const handleChange = (e) => {
    const value = e.target.value
    if (value.length <= maxChars) {
      setDescription(value)
      setCharCount(value.length)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (description.trim() && !isGenerating) {
      onGenerate(description.trim())
    }
  }

  const examples = [
    "Send a Slack message when a new GitHub issue is created",
    "Save Gmail attachments to Google Drive and notify via Discord",
    "Create a calendar event from new Trello cards",
    "Post Twitter mentions to a spreadsheet"
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <motion.h1 
          className="text-6xl md:text-8xl font-black font-space mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-none"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          Auton8n
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          AI-Powered n8n Workflow Builder
        </motion.p>
        <motion.p 
          className="text-lg text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Transform your automation ideas into ready-to-use n8n workflows in seconds. Just describe what you want to automate.
        </motion.p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <Textarea
            value={description}
            onChange={handleChange}
            placeholder="Describe your automation workflow... (e.g., 'Send a Slack notification when someone submits a contact form on my website')"
            rows={6}
            className="text-lg bg-surface/30 border-white/10 focus:border-primary/50 focus:bg-surface/50 resize-none"
          />
          
          <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
            <span>Be specific about triggers, actions, and services you want to connect</span>
            <span className={`${charCount > maxChars * 0.9 ? "text-warning" : ""}`}>
              {charCount}/{maxChars}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <Button
            type="submit"
            size="xl"
            disabled={!description.trim() || isGenerating}
            className="min-w-[200px] group"
          >
            {isGenerating ? (
              <>
                <ApperIcon name="Loader2" className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <ApperIcon name="Sparkles" className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Generate Workflow
              </>
            )}
          </Button>
        </motion.div>
      </form>

      {/* Example prompts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12"
      >
        <h3 className="text-center text-lg font-semibold text-white/80 mb-6">
          Try these examples:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {examples.map((example, index) => (
            <motion.button
              key={index}
              onClick={() => setDescription(example)}
              className="p-4 bg-surface/30 border border-white/10 rounded-xl text-left hover:border-primary/50 hover:bg-surface/50 transition-all duration-300 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start space-x-3">
                <ApperIcon name="Lightbulb" className="w-5 h-5 text-accent mt-0.5 group-hover:text-primary transition-colors" />
                <p className="text-white/90 group-hover:text-white transition-colors">
                  {example}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default WorkflowInput
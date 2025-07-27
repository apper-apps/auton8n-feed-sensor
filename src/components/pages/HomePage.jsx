import React, { useState } from "react"
import { motion } from "framer-motion"
import WorkflowGenerator from "@/components/organisms/WorkflowGenerator"
import TemplateGallery from "@/components/organisms/TemplateGallery"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const HomePage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [showGenerator, setShowGenerator] = useState(true)

  const handleTemplateSelect = (templatePrompt) => {
    setSelectedTemplate(templatePrompt)
    setShowGenerator(true)
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const toggleView = () => {
    setShowGenerator(!showGenerator)
    if (!showGenerator) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Main Generator Section */}
      {showGenerator && (
        <WorkflowGenerator initialPrompt={selectedTemplate} />
      )}

      {/* View Toggle */}
      <div className="fixed bottom-8 right-8 z-40">
        <Button
          onClick={toggleView}
          variant="primary"
          className="shadow-2xl shadow-primary/30"
        >
          <ApperIcon 
            name={showGenerator ? "Library" : "Sparkles"} 
            className="w-5 h-5 mr-2" 
          />
          {showGenerator ? "Browse Templates" : "Create Workflow"}
        </Button>
      </div>

      {/* Templates Section */}
      {!showGenerator && (
        <div className="pt-20 pb-12 px-4">
          <TemplateGallery onTemplateSelect={handleTemplateSelect} />
        </div>
      )}

      {/* How It Works Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-4"
        id="how-it-works"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Transform your automation ideas into working n8n workflows in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Describe Your Automation",
                description: "Simply tell us what you want to automate in plain English. Be as specific as possible about triggers, actions, and services.",
                icon: "MessageSquare",
                color: "primary"
              },
              {
                step: "02", 
                title: "AI Generates Workflow",
                description: "Our AI analyzes your description and creates a complete n8n workflow with all the necessary nodes and connections.",
                icon: "Brain",
                color: "secondary"
              },
              {
                step: "03",
                title: "Copy & Import",
                description: "Copy the generated JSON and import it directly into your n8n instance. Configure credentials and you're ready to go!",
                icon: "Download",
                color: "accent"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-${item.color}/20 to-${item.color}/40 flex items-center justify-center border border-${item.color}/30 group-hover:shadow-lg group-hover:shadow-${item.color}/20 transition-all duration-300`}>
                  <ApperIcon name={item.icon} className={`w-8 h-8 text-${item.color}`} />
                </div>
                
                <div className={`text-6xl font-black text-${item.color}/20 mb-4`}>
                  {item.step}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Examples Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-4 bg-surface/20"
        id="examples"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Popular Automations
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See what others are building with Auton8n
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Slack Notifications",
                description: "Get notified in Slack when someone fills out your contact form",
                prompt: "Send a Slack message to #leads channel when a new contact form is submitted on my website",
                icon: "MessageSquare",
                gradient: "from-primary to-blue-500"
              },
              {
                title: "Email to Database",
                description: "Automatically save email attachments to your database",
                prompt: "Save Gmail attachments to Google Drive and add a record to Airtable with file details",
                icon: "Database",
                gradient: "from-secondary to-purple-500"
              },
              {
                title: "Social Media Automation",
                description: "Cross-post your content across multiple platforms",
                prompt: "When I post a new blog article, share it on Twitter, LinkedIn, and Facebook automatically",
                icon: "Share2",
                gradient: "from-accent to-orange-500"
              },
              {
                title: "Customer Support",
                description: "Route support tickets based on priority and type",
                prompt: "When a support ticket is created in Zendesk, categorize it and assign to the right team member",
                icon: "Headphones",
                gradient: "from-success to-green-500"
              }
            ].map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => handleTemplateSelect(example.prompt)}
              >
                <div className="p-6 bg-surface/50 border border-white/10 rounded-2xl hover:border-primary/50 hover:bg-surface/70 transition-all duration-300 h-full">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${example.gradient} flex items-center justify-center group-hover:shadow-lg transition-all duration-300`}>
                      <ApperIcon name={example.icon} className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                        {example.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        {example.description}
                      </p>
                      <div className="text-xs text-gray-500 bg-black/30 p-3 rounded-lg border border-white/5">
                        "{example.prompt}"
                      </div>
                    </div>
                    
                    <ApperIcon 
                      name="ArrowUpRight" 
                      className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" 
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default HomePage
import React from "react"
import { motion } from "framer-motion"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const WorkflowVisualization = ({ workflow }) => {
  if (!workflow || !workflow.nodes) return null

  const getNodeIcon = (type) => {
    const iconMap = {
      trigger: "Zap",
      webhook: "Globe",
      email: "Mail",
      slack: "MessageSquare",
      discord: "MessageCircle",
      database: "Database",
      api: "Link",
      condition: "GitBranch",
      transform: "Shuffle",
      schedule: "Clock",
      file: "FileText",
      default: "Circle"
    }
    return iconMap[type.toLowerCase()] || iconMap.default
  }

  const getNodeColor = (type) => {
    const colorMap = {
      trigger: "primary",
      webhook: "secondary",
      email: "success",
      slack: "warning",
      discord: "secondary",
      database: "primary",
      api: "accent",
      condition: "warning",
      transform: "secondary",
      schedule: "primary",
      file: "success",
      default: "default"
    }
    return colorMap[type.toLowerCase()] || colorMap.default
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Generated Workflow</h2>
        <p className="text-gray-400">Visual representation of your n8n automation</p>
      </div>

      <Card variant="glass" className="p-8">
        <div className="relative">
          {/* Workflow title */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-white mb-2">
              {workflow.name || "Custom Automation Workflow"}
            </h3>
            <p className="text-gray-300">{workflow.description}</p>
          </div>

          {/* Nodes visualization */}
          <div className="relative">
            <div className="flex flex-wrap justify-center items-center gap-8">
              {workflow.nodes.map((node, index) => (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Connection line to next node */}
                  {index < workflow.nodes.length - 1 && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: (index + 1) * 0.2, duration: 0.5 }}
                      className="absolute top-1/2 left-full w-8 h-0.5 bg-gradient-to-r from-primary to-secondary transform -translate-y-1/2 z-0"
                    >
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                        <ApperIcon name="ChevronRight" className="w-4 h-4 text-primary" />
                      </div>
                    </motion.div>
                  )}

                  {/* Node card */}
                  <Card 
                    variant="glow" 
                    className="p-6 min-w-[200px] text-center bg-surface/80 border-white/20 hover:border-primary/50"
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-${getNodeColor(node.type)}/20 to-${getNodeColor(node.type)}/40 flex items-center justify-center border border-${getNodeColor(node.type)}/30`}>
                        <ApperIcon 
                          name={getNodeIcon(node.type)} 
                          className={`w-6 h-6 text-${getNodeColor(node.type)}`} 
                        />
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-white mb-1">{node.name}</h4>
                        <Badge variant={getNodeColor(node.type)} className="text-xs">
                          {node.type}
                        </Badge>
                      </div>
                      
                      {node.parameters && Object.keys(node.parameters).length > 0 && (
                        <div className="text-xs text-gray-400 space-y-1">
                          {Object.entries(node.parameters).slice(0, 2).map(([key, value]) => (
                            <div key={key} className="truncate max-w-[150px]">
                              <span className="font-medium">{key}:</span> {String(value)}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Workflow stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: workflow.nodes.length * 0.2 + 0.5 }}
            className="flex justify-center mt-8 space-x-6"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{workflow.nodes.length}</div>
              <div className="text-sm text-gray-400">Nodes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{workflow.connections?.length || workflow.nodes.length - 1}</div>
              <div className="text-sm text-gray-400">Connections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                {new Set(workflow.nodes.map(n => n.type)).size}
              </div>
              <div className="text-sm text-gray-400">Services</div>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}

export default WorkflowVisualization
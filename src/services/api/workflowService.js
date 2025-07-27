import mockWorkflows from "@/services/mockData/workflows.json"

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const generateMockWorkflow = (description) => {
  // Simple keyword-based workflow generation
  const keywords = description.toLowerCase()
  let nodes = []
  let nodeId = 1

  // Start with a trigger node
  if (keywords.includes("webhook") || keywords.includes("form")) {
    nodes.push({
      id: `node_${nodeId++}`,
      name: "Webhook Trigger",
      type: "webhook",
      position: { x: 100, y: 100 },
      parameters: {
        httpMethod: "POST",
        path: "/webhook"
      },
      connections: []
    })
  } else if (keywords.includes("email") || keywords.includes("gmail")) {
    nodes.push({
      id: `node_${nodeId++}`,
      name: "Gmail Trigger",
      type: "email",
      position: { x: 100, y: 100 },
      parameters: {
        trigger: "new_email",
        folder: "INBOX"
      },
      connections: []
    })
  } else if (keywords.includes("schedule") || keywords.includes("daily")) {
    nodes.push({
      id: `node_${nodeId++}`,
      name: "Schedule Trigger",
      type: "schedule",
      position: { x: 100, y: 100 },
      parameters: {
        rule: "0 9 * * *",
        timezone: "UTC"
      },
      connections: []
    })
  } else {
    nodes.push({
      id: `node_${nodeId++}`,
      name: "Manual Trigger",
      type: "trigger",
      position: { x: 100, y: 100 },
      parameters: {},
      connections: []
    })
  }

  // Add processing nodes based on keywords
  if (keywords.includes("transform") || keywords.includes("process")) {
    nodes.push({
      id: `node_${nodeId++}`,
      name: "Data Transform",
      type: "transform",
      position: { x: 300, y: 100 },
      parameters: {
        operation: "map",
        fields: ["name", "email", "message"]
      },
      connections: []
    })
  }

  if (keywords.includes("condition") || keywords.includes("if")) {
    nodes.push({
      id: `node_${nodeId++}`,
      name: "Condition Check",
      type: "condition",
      position: { x: 500, y: 100 },
      parameters: {
        field: "priority",
        operator: "equals",
        value: "high"
      },
      connections: []
    })
  }

  // Add action nodes based on services mentioned
  if (keywords.includes("slack")) {
    nodes.push({
      id: `node_${nodeId++}`,
      name: "Send Slack Message",
      type: "slack",
      position: { x: 700, y: 100 },
      parameters: {
        channel: "#general",
        text: "New notification: {{$json.message}}"
      },
      connections: []
    })
  }

  if (keywords.includes("discord")) {
    nodes.push({
      id: `node_${nodeId++}`,
      name: "Send Discord Message",
      type: "discord",
      position: { x: 700, y: 200 },
      parameters: {
        webhook: "https://discord.com/api/webhooks/...",
        content: "Alert: {{$json.message}}"
      },
      connections: []
    })
  }

  if (keywords.includes("database") || keywords.includes("airtable")) {
    nodes.push({
      id: `node_${nodeId++}`,
      name: "Save to Database",
      type: "database",
      position: { x: 700, y: 300 },
      parameters: {
        table: "contacts",
        operation: "insert",
        data: {
          name: "{{$json.name}}",
          email: "{{$json.email}}",
          created_at: "{{$now}}"
        }
      },
      connections: []
    })
  }

  if (keywords.includes("google drive") || keywords.includes("file")) {
    nodes.push({
      id: `node_${nodeId++}`,
      name: "Save to Drive",
      type: "file",
      position: { x: 700, y: 400 },
      parameters: {
        folder: "Automations",
        filename: "{{$json.filename}}",
        content: "{{$json.content}}"
      },
      connections: []
    })
  }

  // Set up connections between nodes
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].connections = [{ node: nodes[i + 1].id, type: "main", index: 0 }]
  }

  return {
    id: `workflow_${Date.now()}`,
    name: `Generated Workflow - ${new Date().toLocaleDateString()}`,
    description: description,
    nodes: nodes,
    connections: nodes.slice(0, -1).map((node, index) => ({
      source: node.id,
      target: nodes[index + 1].id,
      type: "main"
    })),
    createdAt: new Date().toISOString(),
    version: "1.0.0",
    meta: {
      generator: "Auton8n AI",
      generatedFrom: description
    }
  }
}

export const workflowService = {
  async generateWorkflow(description) {
    await delay(2000) // Simulate AI processing time
    
    const workflow = generateMockWorkflow(description)
    
    // Save to mock storage
    const existingWorkflows = JSON.parse(localStorage.getItem("generatedWorkflows") || "[]")
    existingWorkflows.push(workflow)
    localStorage.setItem("generatedWorkflows", JSON.stringify(existingWorkflows))
    
    return workflow
  },

  async getGeneratedWorkflows() {
    await delay(300)
    const workflows = JSON.parse(localStorage.getItem("generatedWorkflows") || "[]")
    return workflows
  },

  async getWorkflowById(id) {
    await delay(200)
    const workflows = JSON.parse(localStorage.getItem("generatedWorkflows") || "[]")
    const workflow = workflows.find(w => w.id === id)
    if (!workflow) {
      throw new Error("Workflow not found")
    }
    return workflow
  },

  async deleteWorkflow(id) {
    await delay(200)
    const workflows = JSON.parse(localStorage.getItem("generatedWorkflows") || "[]")
    const filteredWorkflows = workflows.filter(w => w.id !== id)
    localStorage.setItem("generatedWorkflows", JSON.stringify(filteredWorkflows))
    return true
  }
}
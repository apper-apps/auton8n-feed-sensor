import mockTemplates from "@/services/mockData/templates.json"

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const templateService = {
  async getAll() {
    await delay(400)
    return [...mockTemplates]
  },

  async getById(id) {
    await delay(200)
    const template = mockTemplates.find(t => t.Id === parseInt(id))
    if (!template) {
      throw new Error("Template not found")
    }
    return { ...template }
  },

  async getByCategory(category) {
    await delay(300)
    return mockTemplates.filter(t => t.category === category)
  }
}
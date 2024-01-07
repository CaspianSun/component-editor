import { defineStore } from 'pinia'
import { usePageStore } from './page'

export const useDataStore = defineStore('data-store', {
  state(): {
    components: ComponentConfig[]
    activeComponentIndex: number | null
    activeComponentId: string | null
  } {
    return {
      components: [],
      activeComponentIndex: null,
      activeComponentId: null,
    }
  },
  getters: {
    length(): number {
      return this.components.length
    },
    activeComponent(): ComponentConfig | null {
      if (this.activeComponentId === null) return null
      return this.components.find((item) => item.id === this.activeComponentId) || null
    },
  },
  actions: {
    fetchData() {},
    setComponents(components: ComponentConfig[]) {
      this.components = components
    },
    setActiveComponentId(id: string | undefined | null) {
      this.activeComponentId = id || null
      this.activeComponentIndex = id === null ? null : this.components.findIndex((item) => item.id === id)
    },
    deleteComponent(index: number) {
      this.components.splice(index, 1)
      this.setActiveComponentId(null)
    },
    adjustComponentOrder(direction: 'up' | 'down') {
      if (this.activeComponentIndex === null) return
      const index = this.activeComponentIndex
      if (direction === 'up') {
        if (index === 0) return
        const temp = this.components[index - 1]
        this.components[index - 1] = this.components[index]
        this.components[index] = temp
        this.setActiveComponentId(this.components[index].id)
      } else {
        if (index === this.components.length - 1) return
        const temp = this.components[index + 1]
        this.components[index + 1] = this.components[index]
        this.components[index] = temp
        this.setActiveComponentId(this.components[index].id)
      }
    },
    reset() {
      const pageStore = usePageStore()
      this.components = []
      this.activeComponentIndex = null
      pageStore.setDefaultComponents()
    },
  },
  undo: {
    enable: true,
    omit: ['activeComponentIndex', 'activeComponentId'],
  },
})

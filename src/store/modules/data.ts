import { defineStore } from 'pinia'
export type PageSetup = {
  title: string
  detail: string
  tabbarStyle: number // 1: 标准 2: 沉浸式
  color: string
  pageBg: string
  tabbarBg: string
}

export default defineStore('backstageUser', {
  state() {
    return {
      components: [] as ComponentType[],
      activeComponentIndex: null as number | null,
      pageSetup: {
        title: '页面名称',
        detail: '',
        tabbarStyle: 1,
        color: '#ffffff',
        pageBg: '#F9F9F9',
        tabbarBg: '#ffffff'
      } as PageSetup
    }
  },
  actions: {
    setActiveComponentIndex(index: number | null) {
      this.activeComponentIndex = index
    },
    deleteComponent(index: number) {
      this.components.splice(index, 1)
      this.setActiveComponentIndex(null)
    },
    adjustComponentOrder(direction: 'up' | 'down') {
      if (this.activeComponentIndex === null) return
      const index = this.activeComponentIndex
      if (direction === 'up') {
        if (index === 0) return
        const temp = this.components[index - 1]
        this.components[index - 1] = this.components[index]
        this.components[index] = temp
        this.setActiveComponentIndex(index - 1)
      } else {
        if (index === this.components.length - 1) return
        const temp = this.components[index + 1]
        this.components[index + 1] = this.components[index]
        this.components[index] = temp
        this.setActiveComponentIndex(index + 1)
      }
    }
  },
  getters: {}
})

import { defineStore } from 'pinia'

export type PageSetup = {
  title: string
  detail: string
  tabbarStyle: number // 1: 标准 2: 沉浸式
  color: string
  pageBg: string
  tabbarBg: string
}

export const useDataStore = defineStore('dataStore', {
  state(): {
    components: ComponentProperty[]
    activeComponentIndex: number | null
    pageSetup: PageSetup
    pageId: string
    templateId: string
    templateInfo: {
      name: string
      introduction: string
    } | null
  } {
    return {
      components: [],
      activeComponentIndex: null,
      pageSetup: {
        title: '页面名称',
        detail: '',
        tabbarStyle: 1,
        color: '#000000',
        pageBg: '#F9F9F9',
        tabbarBg: '#ffffff',
      },
      pageId: '',
      templateId: '',
      templateInfo: null,
    }
  },
  actions: {
    setPageId(id: string) {
      this.pageId = id
    },
    setTemplateId(id: string) {
      this.templateId = id
    },
    setTemplateInfo(info: { name: string; introduction: string } | null) {
      this.templateInfo = info
    },
    setComponents(components: ComponentProperty[]) {
      this.components = components
    },
    setPageSetup(pageSetup: PageSetup) {
      this.pageSetup = pageSetup
    },
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
    },
    reset() {
      //
    },
  },
  undo: {
    enable: true,
    omit: ['activeComponentIndex'],
  },
})

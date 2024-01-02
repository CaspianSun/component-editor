import { defineStore } from 'pinia'

const defaultPageSetup = () => {
  return {
    title: '页面名称',
    detail: '',
    tabbarStyle: 1,
    color: '#000000',
    pageBg: '#F9F9F9',
    tabbarBg: '#ffffff',
  }
}
export type PageSetup = ReturnType<typeof defaultPageSetup>

export const useDataStore = defineStore('dataStore', {
  state(): {
    components: ComponentProperty[]
    activeComponentIndex: number | null
    activeId: string | null
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
      activeId: null,
      pageSetup: defaultPageSetup(),
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
      this.activeId = index === null ? null : this.components[index].id || null
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
      this.components = []
      this.activeComponentIndex = null
      this.pageSetup = defaultPageSetup()
      this.pageId = ''
      this.templateId = ''
      this.templateInfo = null
      this.resetStack()
    },
  },
  undo: {
    enable: true,
    omit: ['activeComponentIndex', 'activeId'],
  },
})

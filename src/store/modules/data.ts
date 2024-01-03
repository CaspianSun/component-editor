import { defineStore } from 'pinia'
import { Page } from '../../enum/page'

type PageSetup = {
  type: Page
  title?: string
  pageBg?: string
  options?: {
    defaultComponents: ComponentProperty[]
  }
}

const defaultPageSetup = () => {
  return {
    title: '登陆页',
    type: Page.Login,
    pageBg: '#F9F9F9',
  }
}

const defaultPage = [Page.Login]
const pageList = (): PageSetup[] => {
  return [
    {
      type: Page.Login,
    },
  ]
}
export const useDataStore = defineStore('dataStore', {
  state(): {
    components: ComponentProperty[]
    activeComponentIndex: number | null
    activeId: string | null
    pageSetup: PageSetup
    pageId: string
    pageList: PageSetup[]
  } {
    return {
      components: [],
      activeComponentIndex: null,
      activeId: null,
      pageSetup: defaultPageSetup(),
      pageId: '',
      pageList: pageList(),
    }
  },
  getters: {
    length(): number {
      return this.components.length
    },
  },
  actions: {
    setPageId(id: string) {
      this.pageId = id
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
      this.resetStack()
    },
  },
  undo: {
    enable: true,
    omit: ['activeComponentIndex', 'activeId'],
  },
})

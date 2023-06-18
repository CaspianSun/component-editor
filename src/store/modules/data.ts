import { defineStore } from 'pinia'
export type PageSetup = {
  title: string,
  detail: string,
  tabbarStyle: number, // 1: 标准 2: 沉浸式
  color: string,
  pageBg: string,
  tabbarBg: string,
}

export default defineStore('backstageUser', {
  state() {
    return {
      pageComponents: [] as Array<ComponentType>,
      activeComponentIndex: null as number | null,
      pageSetup: {
        title: '页面名称',
        detail: '',
        tabbarStyle: 1,
        color: '#ffffff',
        pageBg: '#F9F9F9',
        tabbarBg: '#ffffff',
      } as PageSetup
    }
  },
  actions: {
    addPageComponent(data: any) {
      this.pageComponents.push(data)
    },
    setPageComponents(data: PageSetup) {
      this.pageSetup = data
    },
    setActiveComponentIndex(index: number | null) {
      this.activeComponentIndex = index
    }
  },
  getters: {}
})

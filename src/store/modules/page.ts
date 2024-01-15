import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'
import { componentConfigMap } from '../../common'
import { Page, pageNameMap } from '../../enum/page'
import { useDataStore } from './data'
import { createPageModuleApi, deletePageModuleApi, getPageModulesApi, showPageModuleApi } from '../../api'

export const pageList = (): PageSetup[] => {
  return [
    {
      id: '1',
      title: pageNameMap[Page.Custom],
      type: Page.Custom,
      pageBg: 'linear-gradient(0deg, rgb(252, 192, 46) 0%, rgb(31, 135, 232) 100%)',
      isDefault: true,
    },
  ]
}

export const usePageStore = defineStore('page-store', {
  state(): {
    pageList: PageSetup[]
    activePageId: string | number | null | undefined
  } {
    return {
      pageList: pageList(),
      activePageId: '1',
    }
  },
  getters: {
    activePage(state) {
      return state.pageList.find((item) => item.id === state.activePageId)
    },
  },
  actions: {
    async getPages() {
      try {
        const dataStore = useDataStore()
        const { result } = await getPageModulesApi()
        if (result.rows.length > 0) {
          this.setPages(
            // TODO 临时处理
            result.rows.map((item: any) => {
              return {
                ...((item.jsonPage as unknown as PageSetup) || {}),
                id: `${item.id}`,
              }
            }),
          )
          // TODO 临时处理
          const components = result.rows.find((item: any) => item.id == this.activePageId)
          if (components) {
            dataStore.setComponents((components.jsonData as unknown as ComponentConfig<AllProperty>[]) || [])
            dataStore.resetStack()
          }
        } else {
          return Promise.resolve('first')
        }
      } catch (error) {
        return Promise.resolve('first')
      }
    },
    setPages(pages: PageSetup[]) {
      const defaultPageList = pageList()
      const order = defaultPageList.map((item) => item.type)
      this.pageList = pages.sort((a, b) => {
        if (a.isDefault && b.isDefault) return order.indexOf(a.type) - order.indexOf(b.type)
        if (a.isDefault) return -1
        if (b.isDefault) return 1
        return -1
      })
      this.activePageId = this.pageList[0].id
    },
    async changeActivePage(id?: string | number) {
      const page = this.pageList.find((item) => item.id === id)
      if (page?.id) {
        const { result } = await showPageModuleApi(page.id)
        if (result?.jsonData) {
          const dataStore = useDataStore()
          this.activePageId = id
          dataStore.setComponents(result.jsonData as unknown as ComponentConfig[])
          dataStore.resetStack()
        }
      }
    },
    async getDefaultComponents(pageType: Page | null | undefined, defaultComponents: string[] = []) {
      if (!pageType) return []
      if (defaultComponents.length == 0) return []
      const components: ComponentConfig[] = []
      for (const i of defaultComponents) {
        const component = componentConfigMap.get(i)
        if (component) {
          const cloneComponent = cloneDeep(component)
          cloneComponent.id = uuid()
          const res = await this.processComponent(pageType, cloneComponent)
          components.push(res)
        }
      }
      return components
    },
    /** 删除页面 */
    async deletePage(id?: string) {
      if (id) {
        const { result } = await deletePageModuleApi(id)
        if (result) {
          ElMessage.success('删除成功')
          const index = this.pageList.findIndex((item) => item.id === id)
          if (id == this.activePageId) this.changeActivePage(Page.Login)
          if (index !== -1) this.pageList.splice(index, 1)
        } else ElMessage.error('删除失败')
      }
    },
    /** 处理组件默认数据 */
    async processComponent(pageType: Page, cloneComponent: ComponentConfig<AllProperty>) {
      switch (cloneComponent.component) {
        case 'base-title':
          break
        case 'base-form':
          break
        case 'hot-picture':
          break
      }
      return cloneComponent
    },
    /** 添加页面 */
    async addPage(page: Omit<PageSetup, 'id'>) {
      const pageObject: PageSetup = {
        ...page,
        pageBg: '#F9F9F9',
      }
      switch (page.type) {
        default:
          break
      }
      const data = await this.getDefaultComponents(pageObject.type, pageObject.options?.defaultComponents)
      // TODO 临时处理
      // const { result } = await createPageModuleApi({
      //   jsonData: data as unknown as string,
      //   jsonPage: pageObject as unknown as string,
      //   type: pageObject.type,
      // })
      this.pageList.push({
        ...pageObject,
        // id: result.id,
      })
    },
    /** 重置 */
    reset() {
      this.pageList = []
      this.activePageId = null
    },
  },
})

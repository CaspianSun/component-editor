import { defineStore } from 'pinia'
import { Page, pageNameMap } from '../../enum/page'
import { useDataStore } from './data'
import { componentConfigMap } from '../../common'
import { cloneDeep } from 'lodash-es'
import { v4 as uuid } from 'uuid'
import { showPageModuleApi, deletePageModuleApi } from '../../api'
import { ElMessage } from 'element-plus'

const pageList = (): PageSetup[] => {
  return [
    {
      title: pageNameMap[Page.Custom],
      type: Page.Custom,
      pageBg: '#F9F9F9',
      isDefault: true,
    },
    {
      title: pageNameMap[Page.Login],
      type: Page.Login,
      pageBg: '#F9F9F9',
      isDefault: true,
      options: {
        disableAdd: true,
      },
    },
  ]
}

export const usePageStore = defineStore('page-store', {
  state(): {
    pageList: PageSetup[]
    activePageType: Page
  } {
    return {
      pageList: pageList(),
      activePageType: Page.Custom,
    }
  },
  getters: {
    activePage(state) {
      return (
        state.pageList.find((item) => item.type === state.activePageType) || {
          type: Page.Login,
          pageBg: '#F9F9F9',
        }
      )
    },
  },
  actions: {
    setPages(pages: PageSetup[]) {
      const defaultPageList = pageList()
      defaultPageList.forEach((item) => {
        const existsInFetched = pages.some((page) => {
          return page.type === item.type
        })

        if (!existsInFetched) {
          pages.push(item)
        }
      })
      const order = defaultPageList.map((item) => item.type)
      this.pageList = pages.sort((a, b) => {
        if (a.isDefault && b.isDefault) {
          return order.indexOf(a.type) - order.indexOf(b.type)
        }
        if (a.isDefault) {
          return -1
        }
        if (b.isDefault) {
          return 1
        }
        return -0
      })
      this.activePageType = this.pageList[0].type
    },
    async changeActivePageType(type: Page) {
      const page = this.pageList.find((item) => item.type === type)
      if (page?.id) {
        const { result } = await showPageModuleApi(page.id)
        if (result?.jsonData) {
          const dataStore = useDataStore()
          this.handleChangeActivePageType(page.type)
          dataStore.setComponents(result.jsonData as unknown as ComponentConfig[])
          dataStore.resetStack()
          return
        }
      } else {
        this.handleChangeActivePageType(type, true)
      }
    },
    async handleChangeActivePageType(type: Page, setDefaultComponents = false) {
      this.activePageType = type
      if (setDefaultComponents) {
        const dataStore = useDataStore()
        this.setDefaultComponents()
        dataStore.resetStack()
      }
    },
    setDefaultComponents() {
      const dataStore = useDataStore()
      const defaultComponents = this.activePage?.options?.defaultComponents || []
      const components: ComponentConfig[] = []
      defaultComponents.forEach((componentKey) => {
        const component = componentConfigMap.get(componentKey)
        if (component) {
          const cloneComponent = cloneDeep(component)
          cloneComponent.id = uuid()
          components.push(cloneComponent)
        }
      })
      dataStore.setComponents(components)
      dataStore.resetStack()
    },
    addPage(page: PageSetup) {
      this.pageList.push(page)
    },
    async deletePage(page: PageSetup) {
      if (page.id) {
        const { result } = await deletePageModuleApi(page.id)
        if (result) {
          ElMessage.success('删除成功')
          const index = this.pageList.findIndex((item) => item.type === page.type)
          if (page.type == this.activePageType) {
            this.changeActivePageType(Page.Login)
          }
          if (index !== -1) {
            this.pageList.splice(index, 1)
          }
        } else {
          ElMessage.error('删除失败')
        }
      }
    },
  },
})

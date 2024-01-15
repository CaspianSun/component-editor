import { inject, onMounted, defineComponent } from 'vue'
import { Plus } from '@icon-park/vue-next'
import { ElButton, ElMessageBox, ElPopover } from 'element-plus'
import { storeToRefs } from 'pinia'
import { pageNameMap } from '../enum/page'
import { useDataStore, usePageStore } from '../store'
import { handleSave } from './Header'

export const Footer = defineComponent({
  setup() {
    const pageStore = usePageStore()
    const dataStore = useDataStore()
    const { pageList } = storeToRefs(pageStore)
    const handleChangeActivePage = async (page: PageSetup) => {
      if (page.id == pageStore.activePage?.id) return
      pageStore.changeActivePage(page.id)
    }
    const changeActivePage = async (page: PageSetup) => {
      if (dataStore.stackLength > 1) {
        ElMessageBox.confirm('是否保存当前页面？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            handleSave().then(() => {
              handleChangeActivePage(page)
            })
          })
          .catch(() => {})
      } else {
        handleChangeActivePage(page)
      }
    }
    const handleDeletePage = async (page: PageSetup) => {
      ElMessageBox.confirm(`是否删除${pageNameMap[page.type]}页面？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          pageStore.deletePage(page.id)
        })
        .catch(() => {})
    }

    onMounted(() => {})
    const openAddPage = inject<() => void>('openAddPage')

    return () => {
      return (
        <div class={'w-full h-50px bg-#fff flex items-center b-t-1px b-t-solid b-t-#ebeef5 select-none'}>
          <div class={'h-full flex-center px-10px b-r-1px b-r-solid b-r-#ccc cursor-pointer'} onClick={openAddPage}>
            <Plus size={20}></Plus>
          </div>
          <div class={'overflow-x-auto full'}>
            <div class={'flex mt-15px mb-5px'}>
              {pageList.value.map((page) => {
                return (
                  <ElPopover disabled={page.isDefault} placement='top-start' width={80} popper-style={'min-width:80px;'}>
                    {{
                      reference: () => (
                        <div
                          class={'flex-center px-10px cursor-pointer b-r-1px b-r-solid b-r-#ccc h-full'}
                          style={{
                            color: page.id == pageStore.activePage?.id ? '#409eff' : '#606266',
                          }}
                          onClick={() => changeActivePage(page)}
                        >
                          <div class={'text-nowrap white-space-nowrap'}>{pageNameMap[page.type]}</div>
                        </div>
                      ),
                      default: () => (
                        <div>
                          <ElButton plain type='danger' size='small' onClick={() => handleDeletePage(page)}>
                            删除
                          </ElButton>
                        </div>
                      ),
                    }}
                  </ElPopover>
                )
              })}
            </div>
          </div>
        </div>
      )
    }
  },
})
export default Footer

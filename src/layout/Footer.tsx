import { defineComponent, ref } from 'vue'
import { AddPage } from '../components/AddPage'
import { Plus } from '@icon-park/vue-next'
import { storeToRefs } from 'pinia'
import { pageNameMap } from '../enum/page'
import { useDataStore, usePageStore } from '../store'
import { ElMessageBox, ElPopover, ElButton } from 'element-plus'
import { handleSave } from './Header'

export const Footer = defineComponent({
  setup() {
    const pageStore = usePageStore()
    const dataStore = useDataStore()
    const { pageList } = storeToRefs(pageStore)
    const addPageRef = ref<InstanceType<typeof AddPage> | null>(null)
    const handleChangeActivePage = async (page: PageSetup) => {
      if (page.type == pageStore.activePage.type) return
      pageStore.changeActivePageType(page.type)
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
      if (page.id) {
        ElMessageBox.confirm(`是否删除${pageNameMap[page.type]}页面？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            pageStore.deletePage(page)
          })
          .catch(() => {})
      }
    }
    return () => {
      return (
        <div class={'w-full h-35px bg-#fff flex items-center b-t-1px b-t-solid b-t-#ebeef5 select-none'}>
          <div class={'h-full flex-center px-10px b-r-1px b-r-solid b-r-#ccc cursor-pointer'} onClick={addPageRef.value?.open}>
            <Plus size={20}></Plus>
          </div>
          <div class={'flex'}>
            {pageList.value.map((page) => {
              return (
                <ElPopover disabled={page.isDefault} placement='top-start' width={80} popper-style={'min-width:80px;'}>
                  {{
                    reference: () => (
                      <div
                        class={'flex-center px-10px cursor-pointer b-r-1px b-r-solid b-r-#ccc h-full'}
                        style={{
                          color: page.type == pageStore.activePage.type ? '#409eff' : '#606266',
                        }}
                        onClick={() => changeActivePage(page)}
                      >
                        <div class={'text-ellipsis'}>{pageNameMap[page.type]}</div>
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
          <AddPage ref={addPageRef}></AddPage>
        </div>
      )
    }
  },
})
export default Footer

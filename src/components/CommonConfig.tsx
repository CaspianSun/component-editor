import { toRefs, ref } from 'vue'
import { PropType, defineComponent } from 'vue'
import { ElTabs, ElTabPane, ElForm, ElFormItem, ElScrollbar } from 'element-plus'
import { SliderNumber } from './SliderNumber'

export type CommonNumberKeys = {
  [K in keyof CommonStyle]: CommonStyle[K] extends number ? K : never
}[keyof CommonStyle] extends infer U
  ? Exclude<U, undefined>
  : never

interface CommonNumbers {
  label: string
  prop: CommonNumberKeys
  range?: [number, number]
  show?: boolean
}

export const CommonConfig = defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    tabPaneTitle: {
      type: String,
      default: '内容设置',
    },
    showCommon: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Object as PropType<Exclude<AllProperty, PageSetup>>,
      required: false,
    },
    commonList: {
      type: Array as PropType<CommonNumberKeys[]>,
      required: false,
    },
  },
  setup(props, { slots }) {
    const activeTab = ref('1')
    const { data, commonList } = toRefs(props)
    const commonNumbers: CommonNumbers[] = [
      {
        label: '上圆角',
        prop: 'radiusT',
        range: data.value?.radiusTRange,
        show: commonList.value ? commonList.value.includes('radiusT') : true,
      },
      {
        label: '下圆角',
        prop: 'radiusB',
        range: data.value?.radiusBRange,
        show: commonList.value ? commonList.value.includes('radiusB') : true,
      },
      {
        label: '上边距',
        prop: 'marginT',
        range: data.value?.marginTRange,
        show: commonList.value ? commonList.value.includes('marginT') : true,
      },
      {
        label: '下边距',
        prop: 'marginB',
        range: data.value?.marginBRange,
        show: commonList.value ? commonList.value.includes('marginB') : true,
      },
      {
        label: '左边距',
        prop: 'marginL',
        range: data.value?.marginLRange,
        show: commonList.value ? commonList.value.includes('marginL') : true,
      },
      {
        label: '右边距',
        prop: 'marginR',
        range: data.value?.marginRRange,
        show: commonList.value ? commonList.value.includes('marginR') : true,
      },
    ]
    return () => {
      return (
        <div class='h-full flex flex-col py-14px'>
          <h3 class={'px-14px'}>{props.title}</h3>
          {props.showCommon && props.data ? (
            <div class={'px-14px overflow-hidden'}>
              <ElTabs v-model={[activeTab.value]} stretch class={'h-full'}>
                <ElTabPane label={props.tabPaneTitle} name='1'>
                  <ElScrollbar class={'px-8px'}>{slots.default?.()}</ElScrollbar>
                </ElTabPane>
                <ElTabPane label='样式设置' name='2'>
                  <ElForm class={'px-8px'}>
                    {commonNumbers.map((item) => {
                      return (
                        props.data && (
                          <ElFormItem label={item.label} v-show={item.show}>
                            <SliderNumber v-model:number={[props.data[item.prop]]} max={item.range?.[1] || 50} min={item.range?.[0] || 0} />
                          </ElFormItem>
                        )
                      )
                    })}
                    {slots.common?.()}
                  </ElForm>
                </ElTabPane>
              </ElTabs>
            </div>
          ) : (
            <ElScrollbar class={'px-14px'}>{slots.default?.()}</ElScrollbar>
          )}
        </div>
      )
    }
  },
})
export default CommonConfig

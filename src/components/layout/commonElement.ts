import { h } from 'vue'
import CommonNumber from '@/components/common/commonNumber/index.vue'

type CommonNumberKeys = {
  [K in keyof CommonStyleType]: CommonStyleType[K] extends number ? K : never
}[keyof CommonStyleType] extends infer U
  ? Exclude<U, undefined>
  : never

type CommonNumbersType = Array<{
  label: string
  prop: CommonNumberKeys
  range?: [number, number]
  show?: boolean
}>

export function createCommonElement(data: AllComponentType, list?: CommonNumberKeys[]) {
  const commonNumbers: CommonNumbersType = [
    {
      label: '上圆角',
      prop: 'radiusT',
      range: data?.radiusTRange,
      show: list ? list.includes('radiusT') : true
    },
    {
      label: '下圆角',
      prop: 'radiusB',
      range: data?.radiusBRange,
      show: list ? list.includes('radiusB') : true
    },
    {
      label: '上边距',
      prop: 'marginT',
      range: data?.marginTRange,
      show: list ? list.includes('marginT') : true
    },
    {
      label: '下边距',
      prop: 'marginB',
      range: data?.marginBRange,
      show: list ? list.includes('marginB') : true
    },
    {
      label: '左右边距',
      prop: 'marginLR',
      range: data?.marginLRRange,
      show: list ? list.includes('marginLR') : true
    }
  ]
  const node = commonNumbers.map(({ label, prop, range, show }) => {
    if (show) {
      return h(CommonNumber, {
        max: range?.[1] || 50,
        min: range?.[0] || 0,
        number: data[prop],
        label,
        'onUpdate:number': (val: number) => {
          data[prop] = val
        }
      })
    }
  })

  return h('div', node)
}

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
}>

export function createCommonElement(data: SetStyleType) {
  const commonNumbers: CommonNumbersType = [
    { label: '上圆角', prop: 'radiusT', range: data?.radiusTRange },
    { label: '下圆角', prop: 'radiusB', range: data?.radiusBRange },
    { label: '上边距', prop: 'marginT', range: data?.marginTRange },
    { label: '下边距', prop: 'marginB', range: data?.marginBRange },
    { label: '左右边距', prop: 'marginLR', range: data?.marginLRRange }
  ]
  const node = commonNumbers.map(({ label, prop, range }) =>
    h(CommonNumber, {
      max: range?.[1] || 50,
      min: range?.[0] || 0,
      number: data[prop],
      label,
      'onUpdate:number': (val: number) => {
        data[prop] = val
      }
    })
  )

  return h('div', node)
}

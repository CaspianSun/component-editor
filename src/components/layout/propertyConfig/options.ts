import { ListType, ControlShowItemMethod, ControlShowMethod } from '@/components/layout/listToElement'

export const list: ListType<PropertyType>[] = [
  {
    label: '组件设置',
    item: [
      { label: '背景颜色', type: 'color', prop: 'bgColor' }
    ]
  },
  // {
  //   label: '设置',
  //   item: [
  //   ]
  // }
]

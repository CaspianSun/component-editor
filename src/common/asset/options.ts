import { Schema } from '../../utils/listToElement'

export const schema: Schema<Asset>[] = [
  {
    label: '组件设置',
    item: [{ label: '背景颜色', type: 'ElColor', prop: 'bgColor' }],
  },
]

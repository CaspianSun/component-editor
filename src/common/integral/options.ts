import { List, ControlShowItemMethod } from '/@/utils/listToElement'

export const list: List<Integral>[] = [
  {
    label: '组件设置',
    item: [
      {
        label: '样式',
        type: 'ElRadio',
        prop: 'type',
        config: [
          { label: '样式一', value: 1 },
          { label: '样式二', value: 2 },
        ],
      },
      {
        label: '背景颜色',
        type: 'ElColor',
        prop: 'bgColor',
      },
      {
        label: '图标',
        type: 'ElRadio',
        prop: 'isShowIcon',
        config: [
          { label: '显示', value: true },
          { label: '不显示', value: false },
        ],
      },
      {
        label: '选择图标',
        type: 'CSelectImg',
        prop: 'icon',
        control: { method: ControlShowItemMethod.equality, value: ['isShowIcon', true] },
      },
      {
        label: '标题',
        type: 'ElInput',
        prop: 'title',
        config: { maxlength: 8 },
      },
      {
        label: '标题文字颜色',
        type: 'ElColor',
        prop: 'titleColor',
      },
    ],
  },
  {
    label: '样式设置',
    item: [
      {
        label: '文字颜色',
        type: 'ElColor',
        prop: 'textColor',
      },
      {
        label: '箭头图标颜色',
        type: 'ElColor',
        prop: 'rightIconColor',
      },
      {
        label: '按钮文字',
        type: 'ElInput',
        prop: 'buttonText',
        config: { maxlength: 4 },
        control: { method: ControlShowItemMethod.equality, value: ['type', 1] },
      },
      {
        label: '按钮文字颜色',
        type: 'ElColor',
        prop: 'btnTextColor',
        control: { method: ControlShowItemMethod.equality, value: ['type', 1] },
      },
      {
        label: '按钮背景颜色',
        type: 'ElColor',
        prop: 'btnBgColor',
        control: { method: ControlShowItemMethod.equality, value: ['type', 1] },
      },
    ],
  },
]

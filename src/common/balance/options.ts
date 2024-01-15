import { Schema, CompareMethod } from '../../utils/listToElement'

export const schema: Schema<Balance>[] = [
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
        type: 'ColorPicker',
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
        type: 'SelectImage',
        prop: 'icon',
        control: { method: CompareMethod.equality, value: ['isShowIcon', true] },
      },
      {
        label: '标题',
        type: 'ElInput',
        prop: 'title',
        config: { maxLength: 8 },
      },
      {
        label: '标题文字颜色',
        type: 'ColorPicker',
        prop: 'titleColor',
      },
    ],
  },
  {
    label: '样式设置',
    item: [
      {
        label: '文字颜色',
        type: 'ColorPicker',
        prop: 'textColor',
      },
      {
        label: '箭头图标颜色',
        type: 'ColorPicker',
        prop: 'rightIconColor',
      },
      {
        label: '按钮文字',
        type: 'ElInput',
        prop: 'buttonText',
        config: { maxLength: 4 },
        control: { method: CompareMethod.equality, value: ['type', 1] },
      },
      {
        label: '按钮文字颜色',
        type: 'ColorPicker',
        prop: 'btnTextColor',
        control: { method: CompareMethod.equality, value: ['type', 1] },
      },
      {
        label: '按钮背景颜色',
        type: 'ColorPicker',
        prop: 'btnBgColor',
        control: { method: CompareMethod.equality, value: ['type', 1] },
      },
    ],
  },
]

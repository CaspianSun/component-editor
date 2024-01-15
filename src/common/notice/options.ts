import { Schema, CompareMethod } from '../../utils/listToElement'

export const schema: Schema<Notice>[] = [
  {
    label: '组件设置',
    item: [
      {
        label: '滚动方向',
        type: 'ElRadio',
        prop: 'type',
        config: [{ label: '垂直', value: 1 }],
      },
      {
        label: '滚动间隔',
        type: 'SliderNumber',
        prop: 'delay',
        config: { min: 1, max: 10 },
      },
      {
        label: '文字颜色',
        type: 'ColorPicker',
        prop: 'textColor',
      },
      {
        label: '背景颜色',
        type: 'ColorPicker',
        prop: 'bgColor',
      },
    ],
  },
  {
    label: '图标设置',
    item: [
      {
        label: '样式',
        type: 'ElRadio',
        prop: 'leftType',
        config: [
          { label: '文字', value: 1 },
          { label: '图标', value: 2 },
        ],
      },
      {
        label: '文字',
        type: 'ElInput',
        prop: 'leftText',
        config: { maxLength: 4 },
        control: { method: CompareMethod.equality, value: ['leftType', 1] },
      },
      {
        label: '文字颜色',
        type: 'ColorPicker',
        prop: 'leftTextColor',
        control: { method: CompareMethod.equality, value: ['leftType', 1] },
      },
      {
        label: '文字背景颜色',
        type: 'ColorPicker',
        prop: 'leftBgColor',
        control: { method: CompareMethod.equality, value: ['leftType', 1] },
      },
      {
        label: '图标',
        type: 'SelectImage',
        prop: 'leftIcon',
        control: { method: CompareMethod.equality, value: ['leftType', 2] },
      },
    ],
  },
]

import {List, ControlShowItemMethod} from '@/property/listToElement'

export const list: List<Notice>[] = [
  {
    label: '组件设置',
    item: [
      {
        label: '滚动方向',
        type: 'ElRadio',
        prop: 'type',
        config: [{label: '垂直', value: 1}]
      },
      {
        label: '滚动间隔',
        type: 'ElNumber',
        prop: 'delay',
        config: {min: 1, max: 10}
      },
      {
        label: '文字颜色',
        type: 'ElColor',
        prop: 'textColor'
      },
      {
        label: '背景颜色',
        type: 'ElColor',
        prop: 'bgColor'
      }
    ]
  },
  {
    label: '图标设置',
    item: [
      {
        label: '样式',
        type: 'ElRadio',
        prop: 'leftType',
        config: [
          {label: '文字', value: 1},
          {label: '图标', value: 2}
        ]
      },
      {
        label: '文字',
        type: 'ElInput',
        prop: 'leftText',
        config: {maxlength: 4},
        control: {method: ControlShowItemMethod.equality, value: ['leftType', 1]}
      },
      {
        label: '文字颜色',
        type: 'ElColor',
        prop: 'leftTextColor',
        control: {method: ControlShowItemMethod.equality, value: ['leftType', 1]}
      },
      {
        label: '文字背景颜色',
        type: 'ElColor',
        prop: 'leftBgColor',
        control: {method: ControlShowItemMethod.equality, value: ['leftType', 1]}
      },
      {
        label: '图标',
        type: 'CSelectImg',
        prop: 'leftIcon',
        control: {method: ControlShowItemMethod.equality, value: ['leftType', 2]}
      }
    ]
  }
]

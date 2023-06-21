import {ListType, ControlShowItemMethod, ControlShowMethod} from '@/components/layout/listToElement'

export const list: ListType<NoticeType>[] = [
  {
    label: '组件设置',
    item: [
      {
        label: '滚动方向',
        type: 'radio',
        prop: 'type',
        radio: [{label: '垂直', value: 1}]
      },
      {
        label: '滚动间隔',
        type: 'number',
        prop: 'delay',
        commonNumber: {min: 1, max: 10}
      },
      {
        label: '文字颜色',
        type: 'color',
        prop: 'textColor'
      },
      {
        label: '背景颜色',
        type: 'color',
        prop: 'bgColor'
      }
    ]
  },
  {
    label: '图标设置',
    item: [
      {
        label: '样式',
        type: 'radio',
        prop: 'leftType',
        radio: [
          {label: '文字', value: 1},
          {label: '图标', value: 2}
        ]
      },
      {
        label: '文字',
        type: 'input',
        prop: 'leftText',
        input: {maxlength: 4},
        control: {method: ControlShowItemMethod.equality, value: ['leftType', 1]}
      },
      {
        label: '文字颜色',
        type: 'color',
        prop: 'leftTextColor',
        control: {method: ControlShowItemMethod.equality, value: ['leftType', 1]}
      },
      {
        label: '文字背景颜色',
        type: 'color',
        prop: 'leftBgColor',
        control: {method: ControlShowItemMethod.equality, value: ['leftType', 1]}
      },
      {
        label: '图标',
        type: 'cSelectImg',
        prop: 'leftIcon',
        control: {method: ControlShowItemMethod.equality, value: ['leftType', 2]}
      }
    ]
  }
]

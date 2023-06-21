import {ListType, ControlShowItemMethod, ControlShowMethod} from '@/components/layout/listToElement'

export const list: ListType<NavigationType>[] = [
  {
    label: '组件设置',
    item: [
      {
        label: '标题',
        type: 'radio',
        prop: 'isShowTitle',
        radio: [
          {label: '显示', value: true},
          {label: '不显示', value: false}
        ]
      },
      {label: '标题文字', type: 'input', prop: 'title', input: {maxlength: 6}, control: {method: ControlShowItemMethod.exist, value: 'isShowTitle'}},
      {label: '标题字号', type: 'cNumber', prop: 'titleSize', commonNumber: {min: 10, max: 30}, control: {method: ControlShowItemMethod.exist, value: 'isShowTitle'}},
      {label: '标题文字颜色', type: 'color', prop: 'titleColor', control: {method: ControlShowItemMethod.exist, value: 'isShowTitle'}},
      {label: '背景颜色', type: 'color', prop: 'bgColor'}
    ]
  },
  {
    label: '导航设置',
    item: [
      {
        label: '样式',
        type: 'radio',
        prop: 'type',
        radio: [
          {label: '横向', value: 1},
          {label: '纵向', value: 2}
        ]
      },
      {
        label: '图标',
        type: 'radio',
        prop: 'isShowIcon',
        radio: [
          {label: '显示', value: true},
          {label: '不显示', value: false}
        ],
        control: {method: ControlShowItemMethod.equality, value: ['type', 2]}
      },
      {
        label: '下边框',
        type: 'radio',
        prop: 'isShowBorderBottom',
        radio: [
          {label: '显示', value: true},
          {label: '不显示', value: false}
        ],
        control: {method: ControlShowItemMethod.equality, value: ['type', 2]}
      },
      {
        label: '图标圆角',
        type: 'cNumber',
        prop: 'iconRadius',
        commonNumber: {min: 0, max: 50},
        control: {
          method: ControlShowMethod.or,
          item: [
            {method: ControlShowItemMethod.inequality, value: ['type', 2]},
            {method: ControlShowItemMethod.exist, value: 'isShowIcon'}
          ]
        }
      },
      {
        label: '图标大小',
        type: 'cNumber',
        prop: 'iconSize',
        commonNumber: {min: 25, max: 45},
        control: {
          method: ControlShowMethod.or,
          item: [
            {method: ControlShowItemMethod.inequality, value: ['type', 2]},
            {method: ControlShowItemMethod.exist, value: 'isShowIcon'}
          ]
        }
      },
      {
        label: '列数',
        type: 'radio',
        prop: 'colNum',
        radio: [
          {label: '3列', value: 3},
          {label: '4列', value: 4},
          {label: '5列', value: 5}
        ],
        control: {method: ControlShowItemMethod.equality, value: ['type', 1]}
      },
      {label: '文字字号', type: 'cNumber', prop: 'fontSize', commonNumber: {min: 10, max: 20}},
      {
        label: '文字加粗',
        type: 'radio',
        prop: 'isFontBold',
        radio: [
          {label: '是', value: true},
          {label: '否', value: false}
        ]
      },
      {label: '文字颜色', type: 'color', prop: 'fontColor'}
    ]
  }
]

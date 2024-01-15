import { Schema, CompareMethod, JudgeMethod } from '../../utils/listToElement'

export const schema: Schema<Navigation>[] = [
  {
    label: '组件设置',
    item: [
      {
        label: '标题',
        type: 'ElRadio',
        prop: 'isShowTitle',
        config: [
          { label: '显示', value: true },
          { label: '不显示', value: false },
        ],
      },
      {
        label: '标题文字',
        type: 'ElInput',
        prop: 'title',
        config: { maxLength: 6 },
        control: { method: CompareMethod.exist, value: 'isShowTitle' },
      },
      {
        label: '标题字号',
        type: 'SliderNumber',
        prop: 'titleSize',
        config: { min: 10, max: 30 },
        control: { method: CompareMethod.exist, value: 'isShowTitle' },
      },
      {
        label: '标题文字颜色',
        type: 'ColorPicker',
        prop: 'titleColor',
        control: { method: CompareMethod.exist, value: 'isShowTitle' },
      },
      { label: '背景颜色', type: 'ColorPicker', prop: 'bgColor' },
    ],
  },
  {
    label: '导航设置',
    item: [
      {
        label: '样式',
        type: 'ElRadio',
        prop: 'type',
        config: [
          { label: '横向', value: 1 },
          { label: '纵向', value: 2 },
        ],
      },
      {
        label: '图标',
        type: 'ElRadio',
        prop: 'isShowIcon',
        config: [
          { label: '显示', value: true },
          { label: '不显示', value: false },
        ],
        control: { method: CompareMethod.equality, value: ['type', 2] },
      },
      {
        label: '下边框',
        type: 'ElRadio',
        prop: 'isShowBorderBottom',
        config: [
          { label: '显示', value: true },
          { label: '不显示', value: false },
        ],
        control: { method: CompareMethod.equality, value: ['type', 2] },
      },
      {
        label: '图标圆角',
        type: 'SliderNumber',
        prop: 'iconRadius',
        config: { min: 0, max: 50 },
        control: {
          method: JudgeMethod.or,
          item: [
            { method: CompareMethod.inequality, value: ['type', 2] },
            { method: CompareMethod.exist, value: 'isShowIcon' },
          ],
        },
      },
      {
        label: '图标大小',
        type: 'SliderNumber',
        prop: 'iconSize',
        config: { min: 25, max: 45 },
        control: {
          method: JudgeMethod.or,
          item: [
            { method: CompareMethod.inequality, value: ['type', 2] },
            { method: CompareMethod.exist, value: 'isShowIcon' },
          ],
        },
      },
      {
        label: '列数',
        type: 'ElRadio',
        prop: 'colNum',
        config: [
          { label: '3列', value: 3 },
          { label: '4列', value: 4 },
          { label: '5列', value: 5 },
        ],
        control: { method: CompareMethod.equality, value: ['type', 1] },
      },
      { label: '文字字号', type: 'SliderNumber', prop: 'fontSize', config: { min: 10, max: 20 } },
      {
        label: '文字加粗',
        type: 'ElRadio',
        prop: 'isFontBold',
        config: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
      },
      { label: '文字颜色', type: 'ColorPicker', prop: 'fontColor' },
    ],
  },
]

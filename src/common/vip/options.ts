import { Schema } from '../../utils/listToElement'

export const schema: Schema<Vip>[] = [
  {
    label: '未登录背景设置',
    item: [
      { label: '欢迎语', type: 'ElInput', prop: 'welcomeText', config: { maxLength: 10 } },
      { label: '欢迎语颜色', type: 'ColorPicker', prop: 'welcomeColor' },
      { label: '副标题', type: 'ElInput', prop: 'subTitleText', config: { maxLength: 15 } },
      { label: '副标题颜色', type: 'ColorPicker', prop: 'subTitleColor' },
      { label: '按钮文字', type: 'ElInput', prop: 'loginBtnText', config: { maxLength: 4 } },
      { label: '按钮文字颜色', type: 'ColorPicker', prop: 'btnTextColor' },
      { label: '按钮背景颜色', type: 'ColorPicker', prop: 'btnBgColor' },
    ],
  },
]

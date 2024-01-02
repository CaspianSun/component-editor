import { List } from '/@/utils/listToElement'

export const list: List<Vip>[] = [
  {
    label: '未登录背景设置',
    item: [
      { label: '欢迎语', type: 'ElInput', prop: 'welcomeText', config: { maxlength: 10 } },
      { label: '欢迎语颜色', type: 'ElColor', prop: 'welcomeColor' },
      { label: '副标题', type: 'ElInput', prop: 'subTitleText', config: { maxlength: 15 } },
      { label: '副标题颜色', type: 'ElColor', prop: 'subTitleColor' },
      { label: '按钮文字', type: 'ElInput', prop: 'loginBtnText', config: { maxlength: 4 } },
      { label: '按钮文字颜色', type: 'ElColor', prop: 'btnTextColor' },
      { label: '按钮背景颜色', type: 'ElColor', prop: 'btnBgColor' },
    ],
  },
]

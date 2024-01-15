import { CubeIconEnum } from '../../enum'
import { CompareMethod, JudgeMethod, Schema } from '../../utils/listToElement'

export const schema: Schema<CubeIcon>[] = [
  {
    item: [
      {
        label: '类型',
        type: 'ElRadio',
        prop: 'type',
        config: Object.keys(CubeIconEnum)
          .filter((item) => !isNaN(Number(item)))
          .map((item) => ({
            label: CubeIconEnum[item as keyof typeof CubeIconEnum] as unknown as string,
            value: Number(item),
          })),
      },

      {
        prop: 'itemRadius',
        label: '统一元素圆角',
        type: 'SliderNumber',
      },
      {
        prop: 'itemIconSize',
        label: '统一元素图标大小',
        type: 'SliderNumber',
        config: {
          min: 20,
          max: 30,
        },
      },
      {
        prop: 'itemTextSize',
        label: '统一元素文字大小',
        type: 'SliderNumber',
        config: {
          min: 12,
          max: 18,
        },
      },
      {
        prop: 'itemTextColor',
        label: '统一元素文字颜色',
        type: 'ColorPicker',
      },
      {
        prop: 'itemSpacing',
        label: '统一元素间距',
        type: 'SliderNumber',
        config: {
          min: 0,
          max: 5,
        },
      },
      {
        prop: 'itemBgType',
        label: '统一背景样式',
        type: 'ElRadio',
        config: [
          {
            label: '颜色',
            value: 1,
          },
          {
            label: '图片',
            value: 2,
          },
        ],
      },
      {
        prop: 'itemBgColor',
        label: '统一背景色',
        type: 'ColorPicker',
        control: {
          method: CompareMethod.equality,
          value: ['itemBgType', 1],
        },
      },
      {
        prop: 'itemBg',
        label: '统一背景',
        type: 'SelectImage',
        control: {
          method: CompareMethod.equality,
          value: ['itemBgType', 2],
        },
      },
    ],
  },
]

export const itemSchema: Schema<CubeIcon['option'][0]>[] = [
  {
    item: [
      {
        prop: 'icon',
        label: '图标',
        type: 'SelectImage',
        config: {
          width: 40,
          height: 40,
        },
      },
      {
        prop: 'text',
        label: '名称',
        type: 'ElInput',
        config: {
          maxLength: 5,
        },
      },
      {
        prop: 'setupType',
        label: '配置方式',
        type: 'ElRadio',
        config: [
          {
            label: '统一',
            value: 1,
          },
          {
            label: '自定义',
            value: 2,
          },
        ],
      },
      {
        prop: 'radius',
        label: '元素圆角',
        type: 'SliderNumber',
        control: {
          method: CompareMethod.equality,
          value: ['setupType', 2],
        },
      },
      {
        prop: 'iconSize',
        label: '元素图标大小',
        type: 'SliderNumber',
        config: {
          min: 20,
          max: 30,
        },
        control: {
          method: CompareMethod.equality,
          value: ['setupType', 2],
        },
      },
      {
        prop: 'textSize',
        label: '元素文字大小',
        type: 'SliderNumber',
        config: {
          min: 12,
          max: 18,
        },
        control: {
          method: CompareMethod.equality,
          value: ['setupType', 2],
        },
      },
      {
        prop: 'textColor',
        label: '元素文字颜色',
        type: 'ColorPicker',
        control: {
          method: CompareMethod.equality,
          value: ['setupType', 2],
        },
      },
      {
        prop: 'spacing',
        label: '元素间距',
        type: 'SliderNumber',
        config: {
          min: 0,
          max: 5,
        },
        control: {
          method: CompareMethod.equality,
          value: ['setupType', 2],
        },
      },
      {
        prop: 'bgType',
        label: '背景样式',
        type: 'ElRadio',
        config: [
          {
            label: '颜色',
            value: 1,
          },
          {
            label: '图片',
            value: 2,
          },
        ],
        control: {
          method: CompareMethod.equality,
          value: ['setupType', 2],
        },
      },
      {
        prop: 'bgColor',
        label: '背景色',
        type: 'ColorPicker',
        control: {
          method: JudgeMethod.and,
          item: [
            {
              method: CompareMethod.equality,
              value: ['setupType', 2],
            },
            {
              method: CompareMethod.equality,
              value: ['bgType', 1],
            },
          ],
        },
      },
      {
        prop: 'bg',
        label: '背景',
        type: 'SelectImage',
        control: {
          method: JudgeMethod.and,
          item: [
            {
              method: CompareMethod.equality,
              value: ['setupType', 2],
            },
            {
              method: CompareMethod.equality,
              value: ['bgType', 2],
            },
          ],
        },
      },
      {
        prop: 'link',
        label: '跳转链接',
        type: 'linkSelect',
      },
    ],
  },
]

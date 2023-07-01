import { v4 as uuidv4 } from 'uuid'

export enum GroupEnum {
  '基础组件' = 1,
  '辅助组件' = 2
}

export enum LinkEnum {
  '未配置',
  '基础页面',
  '其他小程序'
}

export enum CubePictureEnum {
  '一行二个',
  '一行三个',
  '一行四个',
  '二左二右',
  '一左二右',
  '一上两下'
}

export enum AssetEnum {
  '余额',
  '积分',
  '优惠券'
}

export const commonLink = (): Link => {
  return {
    url: '',
    type: 0,
    urlName: '',
    uuid: uuidv4()
  }
}

const commonStyle: CommonStyle = {
  radiusT: 10, // 上圆角 0-50
  radiusB: 10, // 下圆角 0-50
  marginT: 10, // 上边距 0-50
  marginB: 10, // 下边距 -100-50
  marginLR: 15 // 左右边距 0-50
}

export const generalStyle = <T extends AllProperty>(
  componentProperties: Map<string, ComponentProperty>,
  set: Omit<ComponentProperty<T>, 'setStyle'>,
  data: T
) => {
  componentProperties.set(
    set.component,
    Object.assign(
      {
        setStyle: {
          ...commonStyle,
          ...data
        },
        sort: 0
      },
      set
    )
  )
}

import { v4 as uuidv4 } from 'uuid'

export const commonLink = (): Link => {
  return {
    url: '',
    type: 0,
    urlName: '',
    uuid: uuidv4(),
  }
}

const commonStyle: CommonStyle = {
  radiusT: 10, // 上圆角 0-50
  radiusB: 10, // 下圆角 0-50
  marginT: 10, // 上边距 0-50
  marginB: 10, // 下边距 -100-50
  marginLR: 15, // 左右边距 0-50
}

export const generalStyle =
  (componentProperties: Map<string, ComponentProperty>) =>
  <T extends AllProperty>(set: Omit<ComponentProperty<T>, 'setStyle'>, data: T) => {
    componentProperties.set(
      set.component,
      Object.assign(
        {
          setStyle: {
            ...commonStyle,
            ...data,
          },
          sort: 0,
        },
        set,
      ),
    )
  }

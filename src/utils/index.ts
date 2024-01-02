import { v4 as uuid } from 'uuid'

export const commonLink = (): Link => {
  return {
    url: '',
    type: 0,
    urlName: '',
    uuid: uuid(),
  }
}

const commonStyle: CommonStyle = {
  radiusT: 10,
  radiusB: 10,
  marginT: 10,
  marginB: 10,
  marginL: 15,
  marginR: 15,
}

export const generalStyle = (componentProperties: Map<string, ComponentProperty>) => {
  return <T extends AllProperty>(set: Omit<ComponentProperty<T>, 'setStyle'>, data: T) => {
    componentProperties.set(
      set.component,
      Object.assign(
        {
          id: uuid(),
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
}

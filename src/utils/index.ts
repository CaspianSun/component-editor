import { v4 as uuid } from 'uuid'
import { JSX } from 'vue/jsx-runtime'
import { shallowRef, defineAsyncComponent } from 'vue'

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

export class ComponentProperty {
  constructor() {}

  componentConfigMap = new Map<string, ComponentConfig>()
  componentInstanceMap = new Map<string, import('vue').ShallowRef<any>>()
  configInstanceMap = new Map<string, import('vue').ShallowRef<any>>()

  addComponent<T extends AllProperty>(set: Omit<ComponentConfig, 'setStyle'>, data: T) {
    this.componentConfigMap.set(
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
    this.addComponentInstance(set.component)
    this.addConfigInstance(set.component)
  }
  addComponentInstance(components: ComponentConfig['component']) {
    this.componentInstanceMap.set(components, shallowRef(defineAsyncComponent(() => import(`../common/${components}/index.vue`))))
  }
  addConfigInstance(components: ComponentConfig['component']) {
    this.configInstanceMap.set(components, shallowRef(defineAsyncComponent(() => import(`../common/${components}/config.vue`))))
  }
}

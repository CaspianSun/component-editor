import { v4 as uuid } from 'uuid'
import { shallowRef, defineAsyncComponent } from 'vue'

const commonStyle: CommonStyle = {
  radiusT: 0,
  radiusB: 0,
  marginT: 0,
  marginB: 0,
  marginL: 0,
  marginR: 0,
}

export class ComponentProperty {
  constructor() {}

  componentConfigMap = new Map<string, ComponentConfig>()
  componentInstanceMap = new Map<string, import('vue').ShallowRef<any>>()
  configInstanceMap = new Map<string, import('vue').ShallowRef<any>>()

  addComponent<T extends AllProperty>(set: Omit<ComponentConfig<T>, 'setStyle'>, data: T) {
    this.componentConfigMap.set(
      set.component,
      Object.assign(
        {
          id: uuid(),
          setStyle: {
            ...commonStyle,
            ...Object.assign({}, data),
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

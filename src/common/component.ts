import { defineAsyncComponent } from 'vue'
import type { App } from 'vue'

const layout = import.meta.glob('./**/index.vue') as Record<string, () => Promise<any>>

export default function install(app: App<Element>) {
  for (const [key, value] of Object.entries(layout)) {
    const arr = key.split('/')
    const name = arr[arr.length - 2]
      .split('-')
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join('')
    app.component(name, defineAsyncComponent(value))
  }
}

import { IconFont } from '@nutui/icons-vue'
declare module 'vue' {
  export interface GlobalComponents {
    NutIcon: typeof IconFont
  }
}

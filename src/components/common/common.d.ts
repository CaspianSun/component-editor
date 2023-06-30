import Title from './title/index.vue'
import Card from './card/index.vue'
import Number from './number/index.vue'
import SelectImg from './select-img/index.vue'
import SelectLink from './select-link/index.vue'

declare module 'vue' {
  export interface GlobalComponents {
    CommonTitle: typeof Title
    CommonCard: typeof Card
    CommonNumber: typeof Number
    CommonSelectImg: typeof SelectImg
    CommonSelectLink: typeof SelectLink
  }
}

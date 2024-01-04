import { defineStore } from 'pinia'

export const usePageSizeStore = defineStore('page-size', {
  state: () => ({
    min: {
      leftWidth: 300,
      centerWidth: 500,
      rightWidth: 350,
    },
    leftWidth: 300,
    centerWidth: 500,
    rightWidth: 350,
  }),
  actions: {
    setWidth(size: { left: number; right: number; center: number }) {
      this.leftWidth = size.left
      this.rightWidth = size.right
      this.centerWidth = size.center
    },
    setLeftWidth(width: number) {
      this.leftWidth = width
    },
    setRightWidth(width: number) {
      this.rightWidth = width
    },
    setCenterWidth(width: number) {
      this.centerWidth = width
    },
  },
  persist: true,
})

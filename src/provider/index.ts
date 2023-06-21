import type { initSelectImageType } from '@/components/selectImage/index.vue'
/**
 * @description: 初始化选择图片
 * @example: initSelectImage(async (url) => { console.log(url) })
 */
export const selectImageKey = Symbol() as InjectionKey<initSelectImageType | undefined>

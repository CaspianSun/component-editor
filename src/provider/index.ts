import type { initSelectImageType } from '@/components/select-img/index.vue'
import type { initSelectLinkType } from '@/components/select-link/index.vue'
/**
 * @description: 初始化选择图片
 * @example: initSelectImage(async (url) => { console.log(url) })
 */
export const selectImageKey = Symbol() as InjectionKey<initSelectImageType | undefined>

export const selectLinkKey = Symbol() as InjectionKey<initSelectLinkType | undefined>

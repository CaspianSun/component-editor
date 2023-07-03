import type { InitSelectImage } from '@/components/select-img/index.vue'
import type { InitSelectLink } from '@/components/select-link/index.vue'
import type { InitHotpotEdit } from '@/components/hotpot-edit/index.vue'

export const selectImageKey = Symbol() as InjectionKey<InitSelectImage | undefined>

export const selectLinkKey = Symbol() as InjectionKey<InitSelectLink | undefined>

export const hotpotsEditKey = Symbol() as InjectionKey<InitHotpotEdit | undefined>

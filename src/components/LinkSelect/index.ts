import LinkSelect from './index.vue'
import LinkSelectDialog from './dialog.vue'
import { InjectionKey } from 'vue'
import { Page } from '../../enum/page'
export default LinkSelect
export { LinkSelect, LinkSelectDialog }

export type ResultType = { type: Page; id?: string }
export const InjectKey = Symbol() as InjectionKey<() => Promise<ResultType>>

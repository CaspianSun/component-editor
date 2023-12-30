import { isNumber } from 'lodash-es'
import { buildProps } from 'element-plus/es/utils/vue/props/runtime'
import type { ExtractPropTypes } from 'vue'

export const draggableProps = buildProps({
  disableUserSelect: {
    type: Boolean,
    default: true,
  },
  preventDeactivation: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  draggable: {
    type: Boolean,
    default: true,
  },
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
  axis: {
    type: String,
    default: 'both',
    validator: (val: string) => ['x', 'y', 'both'].includes(val),
  },
  grid: {
    type: Array,
    default: () => [1, 1],
  },
  parent: {
    type: Boolean,
    default: false,
  },
  scale: {
    type: Number,
    default: 1,
    validator: (val: number) => val > 0,
  },
} as const)

export type DraggableProps = ExtractPropTypes<typeof draggableProps>

export const draggableEmits = {
  activated: () => true,
  deactivated: () => true,
  dragging: (x: number, y: number) => isNumber(x) && isNumber(y),
  dragStop: (x: number, y: number) => isNumber(x) && isNumber(y),
  'update:active': (value: boolean) => typeof value === 'boolean',
}
export type DraggableEmits = typeof draggableEmits

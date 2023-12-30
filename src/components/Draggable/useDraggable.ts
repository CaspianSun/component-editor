import { ref, onMounted, onUnmounted, watch, computed, onBeforeMount } from 'vue'
import { getComputedSize, addEvent, removeEvent } from '../../utils/dom'
import type { SetupContext, Ref } from 'vue'
import { DraggableEmits, DraggableProps } from './draggable'

export type Globals = '-moz-initial' | 'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset'
export type UserSelect = Globals | '-moz-none' | 'all' | 'auto' | 'contain' | 'element' | 'none' | 'text'
export type IBounds = Record<string, number>
export type IMousePosition = Record<string, number>

export function snapToGrid(grid: any[], pendingX: number, pendingY: number, scale = 1) {
  const deltaX = Math.round(pendingX / scale / grid[0]) * grid[0]
  const deltaY = Math.round(pendingY / scale / grid[1]) * grid[1]
  return { deltaX, deltaY }
}

export function restrictToBounds(value: number, min: number, max: number): number {
  if (value < min) return min
  if (max < value) return max
  return value
}

type userSelectNone = {
  userSelect: UserSelect
  MozUserSelect: UserSelect
  WebkitUserSelect: UserSelect
  MsUserSelect: UserSelect
}
type userSelectAuto = userSelectNone

const events = {
  mouse: {
    start: 'mousedown',
    move: 'mousemove',
    stop: 'mouseup',
  },
  touch: {
    start: 'touchstart',
    move: 'touchmove',
    stop: 'touchend',
  },
}

export const useDraggable = (props: DraggableProps, { emit }: SetupContext<DraggableEmits>, refs: Ref<HTMLElement | undefined>) => {
  const userSelectNone: userSelectNone = {
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    MsUserSelect: 'none',
  }

  const userSelectAuto: userSelectAuto = {
    userSelect: 'auto',
    MozUserSelect: 'auto',
    WebkitUserSelect: 'auto',
    MsUserSelect: 'auto',
  }

  let eventsFor = events.mouse

  const left = ref(0)
  const top = ref(0)
  const enabled = ref(props.active)
  const dragging = ref(false)
  const right = ref(0)
  const bottom = ref(0)
  const width = ref(0)
  const height = ref(0)

  const parentWidth = ref(0)
  const parentHeight = ref(0)
  let mouseClickPosition: IMousePosition = {}
  let bounds: IBounds = {}

  function resetBoundsAndMouseState() {
    mouseClickPosition = {
      mouseX: 0,
      mouseY: 0,
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    }

    bounds = {
      minLeft: -Infinity,
      maxLeft: Infinity,
      minRight: -Infinity,
      maxRight: Infinity,
      minTop: -Infinity,
      maxTop: Infinity,
      minBottom: -Infinity,
      maxBottom: Infinity,
    }
  }
  function checkParentSize() {
    if (props.parent) {
      const [newParentWidth, newParentHeight] = getParentSize()

      parentWidth.value = newParentWidth || 0
      parentHeight.value = newParentHeight || 0
    }
  }
  function getParentSize() {
    if (props.parent && refs?.value) {
      const style = window.getComputedStyle(refs.value.parentNode as Element, null)

      return [parseInt(style.getPropertyValue('width'), 10), parseInt(style.getPropertyValue('height'), 10)]
    }

    return [0, 0]
  }

  function elementTouchDown(payload: TouchEvent) {
    eventsFor = events.touch
    elementDown(payload)
  }
  function elementMouseDown(e: MouseEvent) {
    eventsFor = events.mouse
    elementDown(e)
  }
  function elementDown(e: MouseEvent | TouchEvent) {
    if (e instanceof MouseEvent && e.which !== 1) return
    const target = e.target as Element
    if (target && refs?.value && refs.value.contains(target)) {
      if (!enabled.value) {
        enabled.value = true
        emit('activated')
        emit('update:active', true)
      }

      if (props.draggable) {
        dragging.value = true
      }
      if (e instanceof MouseEvent) {
        mouseClickPosition.mouseX = e.pageX
        mouseClickPosition.mouseY = e.pageY
      } else {
        mouseClickPosition.mouseX = e.touches[0].pageX
        mouseClickPosition.mouseY = e.touches[0].pageY
      }
      mouseClickPosition.left = left.value
      mouseClickPosition.right = right.value
      mouseClickPosition.top = top.value
      mouseClickPosition.bottom = bottom.value
      if (props.parent) {
        bounds = calcDragLimits()
      }
      addEvent(document.documentElement, eventsFor.move, move)
      addEvent(document.documentElement, eventsFor.stop, handleUp)
    }
  }

  function calcDragLimits() {
    const grid = props.grid as number[]
    return {
      minLeft: left.value % grid[0],
      maxLeft: Math.floor((parentWidth.value - width.value - left.value) / grid[0]) * grid[0] + left.value,
      minRight: right.value % grid[0],
      maxRight: Math.floor((parentWidth.value - width.value - right.value) / grid[0]) * grid[0] + right.value,
      minTop: top.value % grid[1],
      maxTop: Math.floor((parentHeight.value - height.value - top.value) / grid[1]) * grid[1] + top.value,
      minBottom: bottom.value % grid[1],
      maxBottom: Math.floor((parentHeight.value - height.value - bottom.value) / grid[1]) * grid[1] + bottom.value,
    }
  }

  function deselect(e: Event): void {
    if (refs?.value && !refs.value.contains(e.target as Node)) {
      if (enabled.value && !props.preventDeactivation) {
        enabled.value = false
        emit('deactivated')
        emit('update:active', false)
      }
    }
  }
  function move(e: Event): void {
    if (dragging.value) handleDrag(<MouseEvent>e)
  }
  function handleDrag(e: MouseEvent | TouchEvent) {
    const axis = props.axis
    const grid = props.grid
    let pageX = 0
    let pageY = 0
    if (e instanceof MouseEvent) {
      pageX = e.pageX
      pageY = e.pageY
    } else {
      pageX = e.touches[0].pageX
      pageY = e.touches[0].pageY
    }
    const tmpDeltaX = axis && axis !== 'y' ? mouseClickPosition.mouseX - pageX : 0
    const tmpDeltaY = axis && axis !== 'x' ? mouseClickPosition.mouseY - pageY : 0
    const { deltaX, deltaY } = snapToGrid(grid, tmpDeltaX, tmpDeltaY, props.scale)
    const lf = restrictToBounds(mouseClickPosition.left - deltaX, bounds.minLeft, bounds.maxLeft)
    const tp = restrictToBounds(mouseClickPosition.top - deltaY, bounds.minTop, bounds.maxTop)
    const rt = restrictToBounds(mouseClickPosition.right + deltaX, bounds.minRight, bounds.maxRight)
    const bt = restrictToBounds(mouseClickPosition.bottom + deltaY, bounds.minBottom, bounds.maxBottom)

    left.value = lf
    top.value = tp
    right.value = rt
    bottom.value = bt
    emit('dragging', left.value, top.value)
  }

  function moveHorizontally(val: number) {
    const { deltaX } = snapToGrid(props.grid, val, top.value, props.scale)
    const lf = restrictToBounds(deltaX, bounds.minLeft, bounds.maxLeft)
    left.value = lf
    right.value = parentWidth.value - width.value - lf
  }

  function moveVertically(val: number) {
    const { deltaY } = snapToGrid(props.grid, left.value, val, props.scale)
    const tp = restrictToBounds(deltaY, bounds.minTop, bounds.maxTop)
    top.value = tp
    bottom.value = parentHeight.value - height.value - tp
  }

  function handleUp() {
    resetBoundsAndMouseState()
    if (dragging.value) {
      dragging.value = false
      emit('dragStop', left.value, top.value)
    }
  }

  onBeforeMount(() => {
    resetBoundsAndMouseState()
  })

  onMounted(() => {
    if (refs?.value) refs.value.ondragstart = () => false

    const [pw, ph] = getParentSize()
    parentWidth.value = pw
    parentHeight.value = ph
    if (refs?.value) {
      const [elWidth, elHeight] = getComputedSize(refs.value)
      width.value = elWidth
      height.value = elHeight
      right.value = parentWidth.value - width.value - left.value
      bottom.value = parentHeight.value - height.value - top.value
    }
    addEvent(document.documentElement, 'mousedown', deselect)
    addEvent(document.documentElement, 'touchend touchcancel', deselect)
    addEvent(window, 'resize', checkParentSize)
  })

  onUnmounted(() => {
    removeEvent(document.documentElement, 'mousedown', deselect)
    removeEvent(document.documentElement, 'touchstart', handleUp)
    removeEvent(document.documentElement, 'mousemove', move)
    removeEvent(document.documentElement, 'touchmove', move)
    removeEvent(document.documentElement, 'mouseup', handleUp)
    removeEvent(document.documentElement, 'touchend touchcancel', deselect)
    removeEvent(window, 'resize', checkParentSize)
  })

  const style = computed(() => {
    return {
      transform: `translate(${left.value}px, ${top.value}px)`,
      ...(dragging.value && props.disableUserSelect ? userSelectNone : userSelectAuto),
    }
  })

  watch(
    () => props.active,
    (active) => {
      enabled.value = active
      if (active) {
        emit('activated')
      } else {
        emit('deactivated')
      }
    },
  )

  watch(
    () => props.x,
    (value) => {
      if (dragging.value) return
      if (props.parent) bounds = calcDragLimits()
      moveHorizontally(value)
    },
  )

  watch(
    () => props.y,
    (value) => {
      if (dragging.value) return
      if (props.parent) bounds = calcDragLimits()
      moveVertically(value)
    },
  )

  return {
    enabled,
    dragging,
    style,
    resetBoundsAndMouseState,
    elementTouchDown,
    elementMouseDown,
  }
}

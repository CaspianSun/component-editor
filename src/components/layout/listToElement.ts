import CommonCard from '@/components/common/commonCard/index.vue'
import CommonCell from '@/components/common/commonCell/index.vue'
import CommonNumber from '@/components/common/commonNumber/index.vue'
import CommonSelectImg from '@/components/common/commonSelectImg/index.vue'
import { ElColorPicker, ElInput, ElInputNumber, ElRadio, ElRadioGroup } from 'element-plus'

export type ListType<T extends AllComponentType> = {
  label: string // 一级标题
  item: ItemType<T>[]
  leftSpan?: number
  rightSpan?: number
}

type ItemType<T> = {
  label: string // 左侧标题
  prop: keyof T // 对应的属性字段
  type: 'input' | 'number' | 'cNumber' | 'color' | 'radio' | 'cSelectImg' // 可选的渲染类型
  leftSpan?: number //
  rightSpan?: number //
  input?: {
    // input类型的配置
    maxlength?: number
  }
  commonNumber?: {
    // commonNumber类型的配置
    min?: number
    max?: number
  }
  radio?: RadioType[] // radio类型的配置
  control?: ControlShowType<T> | ControlShowItemType<T> // 控制显示的配置 v-if
}

type RadioType = {
  label: string
  value: string | number | boolean
}

export enum ControlShowMethod {
  and,
  or
}

type ControlShowType<T> = {
  method: ControlShowMethod
  item: ControlShowType<T>[] | ControlShowItemType<T>[]
}

export enum ControlShowItemMethod {
  equality,
  inequality,
  exist,
  nonExistent
}

type ControlShowItemType<T> =
  | {
      method: ControlShowItemMethod.equality | ControlShowItemMethod.inequality
      value: [keyof T, unknown]
    }
  | {
      method: ControlShowItemMethod.exist | ControlShowItemMethod.nonExistent
      value: keyof T
    }

export function listToElement<T extends AllComponentType>(data: T, list: ListType<T>[]) {
  const node = () => {
    return list.map((listItem) => {
      return h(CommonCard, { title: listItem.label }, () => {
        return listItem.item.map((item) => {
          return handleControlShow(data, item.control)
            ? generateDynamicItem(data, listItem, item)
            : null
        })
      })
    })
  }
  return h(node)
}
// TODO 未完成，由control进行分组
function handleControlShow<T extends AllComponentType>(
  data: T,
  control: ControlShowType<T> | ControlShowItemType<T> | undefined
): boolean {
  if (!control) return true
  if (typeof control === 'object' && 'method' in control && 'item' in control) {
    switch (control.method) {
      case ControlShowMethod.and:
        return (control.item as ControlShowType<T>[]).every((v) => handleControlShow(data, v))
      case ControlShowMethod.or:
        return control.item.some((v) => handleControlShow(data, v))
      default:
        return true
    }
  } else if (typeof control === 'object' && 'method' in control && 'value' in control) {
    switch (control.method) {
      case ControlShowItemMethod.equality:
        return data[control.value[0]] === control.value[1]
      case ControlShowItemMethod.inequality:
        return data[control.value[0]] !== control.value[1]
      case ControlShowItemMethod.exist:
        return !!data[control.value]
      case ControlShowItemMethod.nonExistent:
        return !data[control.value]
      default:
        return true
    }
  } else {
    return true
  }
}

function generateDynamicItem<T extends AllComponentType>(
  data: T,
  list: ListType<T>,
  item: ItemType<T>
) {
  switch (item.type) {
    case 'input':
      return generateCell(item, list, () => generateInput(data, item))
    case 'radio':
      return generateCell(item, list, () => generateRadio(data, item))
    case 'color':
      return generateCell(item, list, () => generateColor(data, item))
    case 'number':
      return generateCell(item, list, () => generateNumber(data, item))
    case 'cNumber':
      return generateCommonNumber(data, item)
    case 'cSelectImg':
      return generateCell(item, list, () => generateCommonSelectImg(data, item))
  }
}

const generateCell = <T extends AllComponentType>(
  item: ItemType<T>,
  list: ListType<T>,
  slot: () => JSX.Element
) => {
  return h(
    CommonCell,
    {
      label: item.label,
      leftSpan: item.leftSpan ? item.leftSpan : list.leftSpan ? list.leftSpan : 6,
      rightSpan: item.rightSpan ? item.rightSpan : list.rightSpan ? list.rightSpan : 18
    },
    slot
  )
}

const generateInput = <T extends AllComponentType>(data: T, item: ItemType<T>) => {
  return h(ElInput, {
    modelValue: data[item.prop] as string,
    'onUpdate:modelValue': (e: string) => ((data[item.prop] as string) = e),
    maxlength: item.input?.maxlength,
    showWordLimit: true,
    type: 'text'
  })
}

const generateRadio = <T extends AllComponentType>(data: T, item: ItemType<T>) => {
  return h(
    ElRadioGroup,
    {
      modelValue: data[item.prop] as string | number | boolean,
      'onUpdate:modelValue': (e: string | number | boolean) =>
        ((data[item.prop] as string | number | boolean) = e)
    },
    {
      default: () =>
        item.radio?.map((radio) =>
          h(
            ElRadio,
            { label: radio.value },
            {
              default: () => radio.label
            }
          )
        )
    }
  )
}

const generateColor = <T extends AllComponentType>(data: T, item: ItemType<T>) => {
  return h(ElColorPicker, {
    modelValue: data[item.prop] as string,
    'onUpdate:modelValue': (e: string | null) => ((data[item.prop] as string | null) = e)
  })
}

const generateNumber = <T extends AllComponentType>(data: T, item: ItemType<T>) => {
  return h(ElInputNumber, {
    modelValue: data[item.prop] as number,
    'onUpdate:modelValue': (val: number | undefined) =>
      ((data[item.prop] as number | undefined) = val),
    min: item.commonNumber?.min,
    max: item.commonNumber?.max,
    styleType: {
      width: 'width: 150px'
    }
  })
}

const generateCommonNumber = <T extends AllComponentType>(data: T, item: ItemType<T>) => {
  return h(CommonNumber, {
    label: item.label,
    number: data[item.prop] as number,
    'onUpdate:number': (e: number) => ((data[item.prop] as number) = e),
    min: item.commonNumber?.min,
    max: item.commonNumber?.max
  })
}

const generateCommonSelectImg = <T extends AllComponentType>(data: T, item: ItemType<T>) => {
  return h(CommonSelectImg, {
    src: data[item.prop] as string,
    'onUpdate:src': (e: string) => ((data[item.prop] as string) = e)
  })
}

import CommonCard from '@/components/common/card/index.vue'
import CommonCell from '@/components/common/cell/index.vue'
import CommonNumber from '@/components/common/number/index.vue'
import CommonSelectImg from '@/components/common/select-img/index.vue'
import { ElColorPicker, ElInput, ElInputNumber, ElRadio, ElRadioGroup } from 'element-plus'
import { match } from 'ts-pattern'
export interface List<T extends AllProperty> {
  label: string
  item: ListItem<T>[]
  leftSpan?: number
  rightSpan?: number
}
// TODO 未完成，根据type类型，对应不同的config
type ListItem<T extends AllProperty> = {
  label: string
  prop: keyof T
  type: 'ElInput' | 'ElNumber' | 'ElRadio' | 'ElColor' | 'CSelectImg' | 'CNumber'
  leftSpan?: number
  rightSpan?: number
  config?: (ElInputConfig | NumberConfig | ElRadioConfig[]) | undefined
  control?: ControlShow<T> | ControlShowItem<T>
}
interface ElInputConfig {
  maxlength?: number
}

interface NumberConfig {
  max?: number
  min?: number
}
interface ElRadioConfig {
  label: string
  value: string | number | boolean
}

interface ControlShow<T> {
  method: ControlShowMethod
  item: Array<ControlShow<T> | ControlShowItem<T>>
}

type ControlShowItem<T> =
  | {
      method: ControlShowItemMethod.equality | ControlShowItemMethod.inequality
      value: [keyof T, unknown]
    }
  | {
      method: ControlShowItemMethod.exist | ControlShowItemMethod.nonExistent
      value: keyof T
    }

export enum ControlShowMethod {
  and,
  or
}
export enum ControlShowItemMethod {
  equality = 2,
  inequality,
  exist,
  nonExistent
}

export function listToElement<T extends AllProperty>(data: T, list: List<T>[]) {
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
function handleControlShow<T extends AllProperty>(
  data: T,
  control: ControlShow<T> | ControlShowItem<T> | undefined
): boolean {
  if (!control) return true
  return match(control)
    .with({ method: ControlShowMethod.and }, (res) =>
      res.item.some((v) => handleControlShow(data, v))
    )
    .with({ method: ControlShowMethod.or }, (res) =>
      res.item.every((v) => handleControlShow(data, v))
    )
    .with({ method: ControlShowItemMethod.equality }, (res) => data[res.value[0]] === res.value[1])
    .with(
      { method: ControlShowItemMethod.inequality },
      (res) => data[res.value[0]] !== res.value[1]
    )
    .with({ method: ControlShowItemMethod.exist }, (res) => !!data[res.value])
    .with({ method: ControlShowItemMethod.nonExistent }, (res) => !data[res.value])
    .otherwise(() => true)
}

function generateDynamicItem<T extends AllProperty>(data: T, list: List<T>, item: ListItem<T>) {
  return generateCell(item, list, () =>
    match(item)
      .with({ type: 'ElInput' }, (res) => generateInput(data, res))
      .with({ type: 'ElRadio' }, (res) => generateRadio(data, res))
      .with({ type: 'ElColor' }, (res) => generateColor(data, res))
      .with({ type: 'ElNumber' }, (res) => generateNumber(data, res))
      .with({ type: 'CNumber' }, (res) => generateCommonNumber(data, res))
      .with({ type: 'CSelectImg' }, (res) => generateCommonSelectImg(data, res))
      .exhaustive()
  )
}

const generateCell = <T extends AllProperty>(
  item: ListItem<T>,
  list: List<T>,
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

const generateInput = <T extends AllProperty>(data: T, item: ListItem<T> & { type: 'ElInput' }) => {
  const config = item.config as ElInputConfig
  return h(ElInput, {
    modelValue: data[item.prop] as string,
    'onUpdate:modelValue': (e: string) => ((data[item.prop] as string) = e),
    maxlength: config?.maxlength,
    showWordLimit: true,
    type: 'text'
  })
}

const generateRadio = <T extends AllProperty>(data: T, item: ListItem<T> & { type: 'ElRadio' }) => {
  const config = item.config as ElRadioConfig[]
  return h(
    ElRadioGroup,
    {
      modelValue: data[item.prop] as string | number | boolean,
      'onUpdate:modelValue': (e: string | number | boolean) =>
        ((data[item.prop] as string | number | boolean) = e)
    },
    {
      default: () =>
        config?.map((radio) =>
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

const generateColor = <T extends AllProperty>(data: T, item: ListItem<T> & { type: 'ElColor' }) => {
  return h(ElColorPicker, {
    modelValue: data[item.prop] as string,
    'onUpdate:modelValue': (e: string | null) => ((data[item.prop] as string | null) = e)
  })
}

const generateNumber = <T extends AllProperty>(
  data: T,
  item: ListItem<T> & { type: 'ElNumber' }
) => {
  const config = item.config as NumberConfig
  return h(ElInputNumber, {
    modelValue: data[item.prop] as number,
    'onUpdate:modelValue': (val: number | undefined) =>
      ((data[item.prop] as number | undefined) = val),
    min: config?.min,
    max: config?.max,
    styleType: {
      width: 'width: 150px'
    }
  })
}

const generateCommonNumber = <T extends AllProperty>(
  data: T,
  item: ListItem<T> & { type: 'CNumber' }
) => {
  const config = item.config as NumberConfig

  return h(CommonNumber, {
    label: item.label,
    number: data[item.prop] as number,
    'onUpdate:number': (e: number) => ((data[item.prop] as number) = e),
    min: config?.min,
    max: config?.max
  })
}

const generateCommonSelectImg = <T extends AllProperty>(
  data: T,
  item: ListItem<T> & { type: 'CSelectImg' }
) => {
  return h(CommonSelectImg, {
    src: data[item.prop] as string,
    'onUpdate:src': (e: string) => ((data[item.prop] as string) = e)
  })
}

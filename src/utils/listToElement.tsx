import { ElColorPicker, ElInput, ElInputNumber, ElRadio, ElRadioGroup, ElForm, ElFormItem } from 'element-plus'
import { match } from 'ts-pattern'
import { SliderNumber } from '../components/SliderNumber'

export interface List<T extends AllProperty> {
  label: string
  item: ListItem<T>[]
  leftSpan?: number
  rightSpan?: number
}
// TODO 未完成，根据type类型，对应不同的config
type ListItem<T> = {
  label: string
  prop: keyof T
  type: 'ElInput' | 'ElNumber' | 'ElRadio' | 'ElColor' | 'SliderNumber'
  leftSpan?: number
  rightSpan?: number
  config?: (ElInputConfig | NumberConfig | ElRadioConfig[]) | undefined
  control?: ControlShow<T> | ControlShowItem<T>
}
interface ElInputConfig {
  maxLength?: number
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

interface EqualControlShowItem<T> {
  method: ControlShowItemMethod.equality | ControlShowItemMethod.inequality
  value: [keyof T, unknown]
}

interface ExistControlShowItem<T> {
  method: ControlShowItemMethod.exist | ControlShowItemMethod.nonExistent
  value: keyof T
}

type ControlShowItem<T> = EqualControlShowItem<T> | ExistControlShowItem<T>

export enum ControlShowMethod {
  and,
  or,
}
export enum ControlShowItemMethod {
  equality = 2,
  inequality,
  exist,
  nonExistent,
}

export function listToElement<T extends AllProperty>(data: T, list: List<T>[]) {
  return (
    <>
      {list.map((listItem) => {
        return (
          <ElForm>
            <h4>{listItem.label}</h4>
            {listItem.item.map((item) => {
              return handleControlShow(data, item.control) ? generateDynamicItem(data, listItem, item) : <div></div>
            })}
          </ElForm>
        )
      })}
    </>
  )
}

// // TODO 未完成，由control进行分组
function handleControlShow<T extends AllProperty>(data: T, control: ControlShow<T> | ControlShowItem<T> | undefined): boolean {
  return match(control)
    .with({ method: ControlShowMethod.and }, (res) => res.item.every((v) => handleControlShow(data, v)))
    .with({ method: ControlShowMethod.or }, (res) => res.item.some((v) => handleControlShow(data, v)))
    .with({ method: ControlShowItemMethod.equality }, (res) => data[res.value[0]] === res.value[1])
    .with({ method: ControlShowItemMethod.inequality }, (res) => data[res.value[0]] !== res.value[1])
    .with({ method: ControlShowItemMethod.exist }, (res) => !!data[res.value])
    .with({ method: ControlShowItemMethod.nonExistent }, (res) => !data[res.value])
    .otherwise(() => true)
}

function generateDynamicItem<T extends AllProperty>(data: T, list: List<T>, item: ListItem<T>) {
  return (
    <ElFormItem label={item.label}>
      {match(item)
        .with({ type: 'ElInput' }, (res) => {
          const config = res.config as ElInputConfig | undefined
          return <ElInput v-model={[data[item.prop]]} max-length={config?.maxLength} show-word-limit={true} type={'text'}></ElInput>
        })
        .with({ type: 'ElRadio' }, (res) => {
          const config = res.config as ElRadioConfig[] | undefined
          return (
            <ElRadioGroup v-model={[data[item.prop]]}>
              {config?.map((radio) => <ElRadio label={radio.value}>{radio.label}</ElRadio>)}
            </ElRadioGroup>
          )
        })
        .with({ type: 'ElColor' }, (res) => {
          return <ElColorPicker v-model={[data[item.prop]]}></ElColorPicker>
        })
        .with({ type: 'ElNumber' }, (res) => {
          const config = item.config as NumberConfig
          return <ElInputNumber v-model={[data[item.prop]]} min={config?.min} max={config?.max} style={'width:150px'}></ElInputNumber>
        })
        .with({ type: 'SliderNumber' }, (res) => {
          const config = item.config as NumberConfig
          return <SliderNumber v-model={[data[item.prop], 'number']} min={config?.min} max={config?.max}></SliderNumber>
        })
        .otherwise(() => (
          <div></div>
        ))}
    </ElFormItem>
  )
}

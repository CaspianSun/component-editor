import { ElColorPicker, ElInput, ElInputNumber, ElRadio, ElRadioGroup, ElForm, ElFormItem, ElSwitch, ElRadioButton } from 'element-plus'
import { match } from 'ts-pattern'
import { SliderNumber } from '../components/SliderNumber'
import UploadImg from '/@/components/UploadImg/index.vue'
import { LinkSelect } from '../components/LinkSelect'
import { FunctionalComponent } from 'vue'
import { ColorPicker } from 'vue3-colorpicker'

export interface Schema<T extends Record<string, any>> {
  label?: string
  item: SchemaItem<T>[]
  leftSpan?: number
  rightSpan?: number
}

// TODO 未完成，根据type类型，对应不同的config
type SchemaItem<T> = {
  label: string
  prop: keyof T
  type:
    | 'ElInput'
    | 'ElInputNumber'
    | 'ElSwitch'
    | 'ElRadio'
    | 'ElRadioButton'
    | 'ColorPicker'
    | 'SliderNumber'
    | 'SelectImage'
    | 'linkSelect'
  leftSpan?: number
  rightSpan?: number
  config?: ElInputConfig | NumberConfig | ElRadioConfig[] | ColorPickerConfig | SelectImageConfig | ElSwitchConfig
  control?: ControlShow<T> | ControlShowItem<T>
}

interface ElSwitchConfig {
  inactiveText?: string
  activeText?: string
}

interface ColorPickerConfig {
  useType?: 'pure' | 'gradient' | 'both'
  disableAlpha?: boolean
  format?: InstanceType<typeof ColorPicker>['format']
}

interface SelectImageConfig {
  width?: number
  height?: number
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
  method: JudgeMethod
  item: Array<ControlShow<T> | ControlShowItem<T>>
}

interface EqualControlShowItem<T> {
  method: CompareMethod.equality | CompareMethod.inequality
  value: [keyof T, unknown]
}

interface ExistControlShowItem<T> {
  method: CompareMethod.exist | CompareMethod.nonExistent
  value: keyof T
}

type ControlShowItem<T> = EqualControlShowItem<T> | ExistControlShowItem<T>

export enum JudgeMethod {
  /** 与 */
  and,
  /** 或 */
  or,
}
export enum CompareMethod {
  /** 相等 */
  equality = 2,
  /** 不相等 */
  inequality,
  /** 存在 */
  exist,
  /** 不存在 */
  nonExistent,
}

export const ElementRender: FunctionalComponent<{
  data: Record<string, any>
  schema: Schema<any>[]
}> = (props) => {
  return (
    <>
      {props.schema.map((listItem) => {
        return (
          <ElForm>
            {listItem.label && <h4>{listItem.label}</h4>}
            {listItem.item.map((item) => {
              return handleControlShow(props.data, item.control) ? generateDynamicItem(props.data, listItem, item) : <div></div>
            })}
          </ElForm>
        )
      })}
    </>
  )
}

// TODO 未完成，由control进行分组
function handleControlShow<T extends Record<string, any>>(data: T, control: ControlShow<T> | ControlShowItem<T> | undefined): boolean {
  return match(control)
    .with({ method: JudgeMethod.and }, (res) => res.item.every((v) => handleControlShow(data, v)))
    .with({ method: JudgeMethod.or }, (res) => res.item.some((v) => handleControlShow(data, v)))
    .with({ method: CompareMethod.equality }, (res) => data[res.value[0]] === res.value[1])
    .with({ method: CompareMethod.inequality }, (res) => data[res.value[0]] !== res.value[1])
    .with({ method: CompareMethod.exist }, (res) => !!data[res.value])
    .with({ method: CompareMethod.nonExistent }, (res) => !data[res.value])
    .otherwise(() => true)
}

function generateDynamicItem<T extends Record<string, any>>(data: T, list: Schema<T>, item: SchemaItem<T>) {
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
        .with({ type: 'ElRadioButton' }, (res) => {
          const config = res.config as ElRadioConfig[] | undefined
          return (
            <ElRadioGroup v-model={[data[item.prop]]}>
              {config?.map((radio) => <ElRadioButton label={radio.value}>{radio.label}</ElRadioButton>)}
            </ElRadioGroup>
          )
        })
        .with({ type: 'ElSwitch' }, (res) => {
          const config = res.config as ElSwitchConfig | undefined
          return <ElSwitch v-model={[data[item.prop]]} inactive-text={config?.inactiveText} active-text={config?.activeText}></ElSwitch>
        })
        .with({ type: 'ColorPicker' }, (res) => {
          const config = res.config as ColorPickerConfig | undefined
          const modelProps: {
            pureColor?: any
            gradientColor?: any
          } = {
            pureColor: data[item.prop],
            gradientColor: data[item.prop],
          }
          if (config?.useType === 'pure') {
            delete modelProps.gradientColor
          }
          if (config?.useType === 'gradient') {
            delete modelProps.pureColor
          }
          return (
            <ColorPicker
              {...modelProps}
              onUpdate:pureColor={(val) => {
                ;(data[item.prop] as string | null | undefined) = val
              }}
              onUpdate:gradientColor={(val) => {
                ;(data[item.prop] as string | null | undefined) = val
              }}
              useType={config?.useType ? config.useType : 'pure'}
              format={config?.format ? config.format : 'rgb'}
              disableAlpha={config?.disableAlpha}
            ></ColorPicker>
          )
        })
        .with({ type: 'ElInputNumber' }, (res) => {
          const config = res.config as NumberConfig | undefined
          return <ElInputNumber v-model={[data[item.prop]]} min={config?.min} max={config?.max} style={'width:150px'}></ElInputNumber>
        })
        .with({ type: 'SliderNumber' }, (res) => {
          const config = res.config as NumberConfig | undefined
          return <SliderNumber v-model={[data[item.prop], 'number']} min={config?.min} max={config?.max}></SliderNumber>
        })
        .with({ type: 'SelectImage' }, (res) => {
          const config = res.config as SelectImageConfig | undefined
          return (
            <UploadImg
              photo={data[item.prop] as string | null | undefined}
              onSetPicture={(url: string) => {
                ;(data[item.prop] as string | null | undefined) = url
              }}
              onDelPicture={() => {
                ;(data[item.prop] as string | null | undefined) = null
              }}
              width={config?.width || 100}
              height={config?.height || 100}
            ></UploadImg>
          )
        })
        .with({ type: 'linkSelect' }, (res) => {
          return <LinkSelect v-model={[data[item.prop]]}></LinkSelect>
        })
        .otherwise(() => (
          <div></div>
        ))}
    </ElFormItem>
  )
}

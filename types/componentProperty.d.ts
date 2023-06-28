declare type AllComponentType =
  | SlideshowType
  | NavigationType
  | NoticeType
  | OnePictureType
  | IntegralType
  | PropertyType
  | BalanceType
  | DividerType
  | CubePictureType
  | VipType

declare interface CubePictureType extends Partial<CommonStyleType> {
  type: import('@/componentProperty').CubePictureTypeEnum
  imgList: Array<
    {
      src: string
    } & Link
  >
  itemRadiusT: number // 元素上圆角 0-50
  itemRadiusB: number // 元素下圆角 0-50
  itemHeight: number // 图片高度 120-375px
  itemMargin: number // 图片间距 0-20px
}

declare interface BalanceType extends Partial<CommonStyleType> {
  type: 1 | 2 // 组件样式
  bgColor: string // 背景颜色
  isShowIcon: boolean // 是否显示图标
  icon: string // 图标
  title: string // 标题
  titleColor: string // 标题颜色
  textColor: string // 文字颜色
  buttonText: string // 按钮文字
  btnTextColor: string // 按钮文字颜色
  btnBgColor: string // 按钮背景颜色
  rightIconColor: string // 右侧图标颜色
  link: Link
}

declare interface PropertyType extends Partial<CommonStyleType> {
  btnBgColor: string
  btnTextColor: string
  fontSize: number
  bgColor: string
  itemList: Array<
    {
      name: string
      unit: string
    } & Link
  >
}

declare interface PropertyArr {
  name: string
  checked: boolean
  type: import('@/componentProperty').PropertyTypeEnum
}

declare interface VipType extends Partial<CommonStyleType> {
  fontSize: number
  bgColor: string
  propertyArr: PropertyArr[]
  vipStyle: number
  propertyTextColor: string
  propertyNumberColor: string
  welcomeText: string
  welcomeColor: string
  subTitleText: string
  subTitleColor: string
  loginBtnText: string
  btnTextColor: string
  btnBgColor: string
}

declare interface IntegralType extends Partial<CommonStyleType> {
  type: 1 | 2 // 组件样式
  bgColor: string // 背景颜色
  isShowIcon: boolean // 是否显示图标
  icon: string // 图标
  title: string // 标题
  titleColor: string // 标题颜色
  textColor: string // 文字颜色
  buttonText: string // 按钮文字
  btnTextColor: string // 按钮文字颜色
  btnBgColor: string // 按钮背景颜色
  rightIconColor: string // 右侧图标颜色
}

declare interface OnePictureType extends Partial<CommonStyleType> {
  height: number // 图片高度 1-500px
  src: string // 图片链接
  link: Link
}

declare interface SlideshowType extends Partial<CommonStyleType> {
  height: number // 轮播图高度 1-500px
  delay: number // 轮播间隔 1-10s
  imgList: Array<
    {
      src: string
    } & Link
  >
}

declare interface NavigationType extends Partial<CommonStyleType> {
  type: 1 | 2 //图文导航类型 1: 横向 2: 纵向
  iconRadius: number //图标圆角 0-50
  rowNum: number //行数 1-3
  colNum: number //列数 3-5
  isShowTitle: boolean //是否显示标题
  title: string //标题
  titleSize: number //标题大小 10-30px
  titleColor: string //标题颜色
  fontSize: number //字体大小 10-30px
  isFontBold: boolean //是否加粗
  fontColor: string //字体颜色
  bgColor: string //背景颜色
  iconSize: number //图标大小 0-50px
  isShowIcon: boolean //是否显示图标
  isShowBorderBottom: boolean //是否显示下边框
  imgList: Array<
    {
      src: string
      name: string
    } & Link
  >
}

declare interface NoticeType extends Partial<CommonStyleType> {
  bgColor: string // 背景颜色
  textColor: string // 文字颜色
  type: 1 | 2 // 1: 垂直滚动 2: 横向滚动
  delay: number // 滚动间隔 1-10s
  leftType: 1 | 2 // 1: 文字 2: 图标
  leftIcon: string // 图标
  leftText: string // 文字
  leftTextColor: string // 文字颜色
  leftBgColor: string // 左侧文字背景颜色
}

declare interface DividerType extends Partial<CommonStyleType> {
  type: 1 | 2 | 3 // 分割线类型 1: 空白 2: 实线 3: 虚线
  bgColor: string // 背景颜色
  lineColor: string // 分割线颜色
  lineSize: number // 分割线粗细 1-10px
  height: number // 分割线高度 10-20px
}

declare interface CommonStyleType {
  radiusT: number // 上圆角 0-50
  radiusB: number // 下圆角 0-50
  marginT: number // 上边距 0-50
  marginB: number // 下边距 -100-50
  marginLR: number // 左右边距 0-50
  radiusTRange?: [number, number]
  radiusBRange?: [number, number]
  marginTRange?: [number, number]
  marginBRange?: [number, number]
  marginLRRange?: [number, number]
}

declare interface Link {
  type: import('@/componentProperty').LinkTypeEnum // 跳转类型
  url: string // 跳转地址
  urlName: string //
  uuid: string
  appInfo?: {
    page: string
    appid: string
    name: string
  }
}

declare interface ComponentProperty<T = AllComponentType> {
  component: string
  cName: string
  icon?: string
  group: import('@/componentProperty').GroupEnum
  setStyle: T
  sort?: number
  id?: string
}

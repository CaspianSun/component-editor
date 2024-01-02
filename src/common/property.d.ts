declare type AllProperty = Slideshow | Navigation | Notice | HotPicture | Integral | Asset | Balance | Divider | CubePicture | Vip | User

declare interface CubePicture extends Partial<CommonStyle> {
  type: import('../enum').CubePictureEnum
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

declare interface Balance extends Partial<CommonStyle> {
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

declare interface Asset extends Partial<CommonStyle> {
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

declare interface Vip extends Partial<CommonStyle> {
  fontSize: number
  bgColor: string
  propertyArr: { name: string; checked: boolean; type: import('../enum').AssetEnum }[]
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

declare interface Integral extends Partial<CommonStyle> {
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

declare interface HotPicture extends Partial<CommonStyle> {
  src: string // 图片链接
  hotSpot: Array<import('/@/components/HotSpotEdit/index.vue').HotSpotListItem>
}

declare interface Slideshow extends Partial<CommonStyle> {
  height: number // 轮播图高度 1-500px
  delay: number // 轮播间隔 1-10s
  imgList: Array<
    {
      src: string
    } & Link
  >
}

declare interface Navigation extends Partial<CommonStyle> {
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

declare interface Notice extends Partial<CommonStyle> {
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

declare interface Divider extends Partial<CommonStyle> {
  type: 1 | 2 | 3 // 分割线类型 1: 空白 2: 实线 3: 虚线
  bgColor: string // 背景颜色
  lineColor: string // 分割线颜色
  lineSize: number // 分割线粗细 1-10px
  height: number // 分割线高度 10-20px
}

declare interface User extends Partial<CommonStyle> {
  bgColor: string // 背景颜色
  bgImg: string // 背景图片
  spacing: number // 间距 0-50px
  numColor: string // 数字颜色
  numSize: number // 数字大小 10-30px
  textColor: string // 文字颜色
  textSize: number // 文字大小 10-30px
}

declare interface CommonStyle {
  radiusT: number
  radiusB: number
  marginT: number
  marginB: number
  marginL: number
  marginR: number
  radiusTRange?: [number, number]
  radiusBRange?: [number, number]
  marginTRange?: [number, number]
  marginBRange?: [number, number]
  marginLRange?: [number, number]
  marginRRange?: [number, number]
}

declare interface Link {
  type: import('../enum').LinkEnum
  url: string
  urlName: string //
  uuid: string
  appInfo?: {
    page: string
    appid: string
    name: string
  }
}

declare interface ComponentProperty<T = AllProperty> {
  component: string
  title: string
  icon?: string | JSX.Element
  group: import('../enum').GroupEnum
  setStyle: T
  sort?: number
  id?: string
  configPage: () => any
}

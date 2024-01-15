declare type AllProperty =
  | Slideshow
  | Navigation
  | Notice
  | HotPicture
  | Integral
  | Balance
  | Divider
  | CubePicture
  | Vip
  | User
  | PageSetup
  | CubeIcon
  | BaseTitle

declare interface BaseTitle extends Partial<CommonStyle> {
  /** 标题 */
  title: string
  /** 标题颜色 */
  titleColor: string
  /** 标题大小 10-30 */
  titleSize: number
  /** 标题块颜色 */
  titleBlockColor: string
}

declare interface CubeIcon extends Partial<CommonStyle> {
  type: import('../enum').CubeIconEnum
  /** 统一背景类型 1:颜色 2:图片 */
  itemBgType: 1 | 2
  /** 统一背景 */
  itemBg?: string
  /** 统一背景色 */
  itemBgColor?: string
  /** 统一元素圆角 0-50 */
  itemRadius: number
  /** 统一元素图标大小 20-40px */
  itemIconSize: number
  /** 统一元素文字大小 12-25px */
  itemTextSize: number
  /** 统一元素文字颜色 */
  itemTextColor: string
  /** 统一元素间距 0-20px */
  itemSpacing: number
  option: Array<{
    /** 1:统一 2:自定义 */
    setupType: 1 | 2
    /** 图标 */
    icon: string
    /** 文字 */
    text: string
    /** 文字颜色 */
    textSize?: number
    /** 图标大小 */
    iconSize?: number
    /** 文字颜色 */
    textColor?: string
    /** 间距 */
    spacing?: number
    /** 圆角 */
    radius?: number
    /** 背景类型 1:颜色 2:图片 */
    bgType: 1 | 2
    /** 背景 */
    bg?: string
    /** 背景色 */
    bgColor?: string
    /** 跳转链接 */
    link?: Link
  }>
}

declare interface CubePicture extends Partial<CommonStyle> {
  type: import('../enum').CubePictureEnum
  imgList: Array<{
    src: string
    link?: Link
  }>
  /** 元素上圆角 0-50 */
  itemRadiusT: number
  /** 元素下圆角 0-50 */
  itemRadiusB: number
  /** 元素高度 120-375 */
  itemHeight: number
  /** 元素间距 0-20 */
  itemMargin: number
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
  /** 组件样式 1: 大 2: 小 */
  type: 1 | 2
  /** 背景颜色 */
  bgColor: string
  /** 是否显示图标 */
  isShowIcon: boolean
  /** 图标 */
  icon: string
  /** 标题 */
  title: string
  /** 标题颜色 */
  titleColor: string
  /** 文字颜色 */
  textColor: string
  /** 按钮文字 */
  buttonText: string
  /** 按钮文字颜色 */
  btnTextColor: string
  /** 按钮背景颜色 */
  btnBgColor: string
  /** 右侧图标颜色 */
  rightIconColor: string
  /** 页面链接 */
  link?: Link
}
declare interface Balance extends Integral {}

declare interface Slideshow extends Partial<CommonStyle> {
  /** 轮播高度 100-500 */
  height: number
  /** 轮播间隔 1-10s */
  delay: number
  /** 轮播方向 horizontal:水平 vertical:垂直 */
  direction: 'horizontal' | 'vertical'
  /** 分页指示器是否展示 */
  paginationVisible: boolean
  /** 图片列表 */
  imgList: Array<{
    /** 图片地址 */
    src: string
    /** 图片跳转链接 */
    link?: Link
  }>
}

declare interface Navigation extends Partial<CommonStyle> {
  /** 图文导航类型 1: 横向 2: 纵向 */
  type: 1 | 2
  /** 图标圆角 0-50 */
  iconRadius: number
  /** 行数 1-3 */
  rowNum: number
  /** 列数 3-5 */
  colNum: number
  /** 是否显示标题 */
  isShowTitle: boolean
  /** 标题 */
  title: string
  /** 标题大小 10-30 */
  titleSize: number
  /** 标题颜色 */
  titleColor: string
  /** 字体大小 10-30 */
  fontSize: number
  /** 是否加粗 */
  isFontBold: boolean
  /** 字体颜色 */
  fontColor: string
  /** 背景颜色 */
  bgColor: string
  /** 图标大小 0-50 */
  iconSize: number
  /** 是否显示图标 */
  isShowIcon: boolean
  /** 是否显示下边框 */
  isShowBorderBottom: boolean
  /** 图片列表 */
  imgList: Array<{
    /** 图片地址 */
    src: string
    /** 图片名称 */
    name: string
    /** 图片跳转链接 */
    link?: Link
  }>
}

declare interface HotPicture extends Partial<CommonStyle> {
  /** 图片地址 */
  src: string
  /** 热区列表 */
  hotSpot: Array<{
    /** 热区id */
    id: string
    /** 热区宽度 */
    width: number
    /** 热区高度 */
    height: number
    /** 热区距离左侧距离 */
    left: number
    /** 热区距离顶部距离 */
    top: number
    /** 热区跳转链接 */
    link?: Link
  }>
}

declare interface Notice extends Partial<CommonStyle> {
  /** 背景颜色 */
  bgColor: string
  /** 文字颜色 */
  textColor: string
  /** 1: 垂直滚动 2: 横向滚动 */
  type: 1 | 2
  /** 滚动间隔 1-10s */
  delay: number
  /** 1: 文字 2: 图标 */
  leftType: 1 | 2
  /** 图标 */
  leftIcon: string
  /** 图标 */
  leftText: string
  /** 左侧文字颜色 */
  leftTextColor: string
  /** 左侧文字背景颜色 */
  leftBgColor: string
}

declare interface Divider extends Partial<CommonStyle> {
  /** 分割线类型 1: 空白 2: 实线 3: 虚线 */
  type: 1 | 2 | 3
  /** 背景颜色 */
  bgColor: string
  /** 线条颜色 */
  lineColor: string
  /** 线条宽度 */
  lineSize: number
  /** 线条高度 */
  height: number
}

declare interface User extends Partial<CommonStyle> {
  /** 背景颜色 */
  bgColor: string
  /** 背景图片 */
  bgImg: string
  /** 间距 0-50 */
  spacing: number
  /** 数字颜色 */
  numColor: string
  /** 数字大小 10-30 */
  numSize: number
  /** 文字颜色 */
  textColor: string
  /** 文字大小 10-30 */
  textSize: number
}

declare interface PageSetup {
  /** 页面id */
  id?: string
  /** 页面类型 */
  type: import('../enum/page').Page
  /** 页面名称 */
  title?: string
  /** 页面背景颜色 */
  pageBg?: string
  /** 页面背景图片 */
  pageBgImg?: string
  /** 是否是默认页面 */
  isDefault?: boolean
  /** 选项 */
  options?: {
    /** 默认组件 */
    defaultComponents?: string[]
    /** 禁止添加组件 */
    disableAdd?: boolean
    /** 禁止删除组件 */
    disableDelete?: boolean
    /** 禁止移动组件 */
    disableControl?: boolean
  }
}
declare interface CommonStyle {
  /** 上圆角 */
  radiusT: number
  /** 下圆角 */
  radiusB: number
  /** 上边距 */
  marginT: number
  /** 下边距 */
  marginB: number
  /** 左边距 */
  marginL: number
  /** 右边距 */
  marginR: number
  /** 上圆角区间 */
  radiusTRange?: [number, number]
  /** 下圆角区间 */
  radiusBRange?: [number, number]
  /** 上边距区间 */
  marginTRange?: [number, number]
  /** 下边距区间 */
  marginBRange?: [number, number]
  /** 左边距区间 */
  marginLRange?: [number, number]
  /** 右边距区间 */
  marginRRange?: [number, number]
}

declare interface Link {
  /** 跳转类型 */
  type: import('../enum').LinkEnum
  /** 跳转链接 */
  url?: import('../enum/page').Page
  /** 跳转页面id */
  id?: string
  /** 跳转页面名称 */
  name: string
}

declare interface ComponentConfig<T = AllProperty> {
  /** 组件名称 */
  title: string
  /** 组件类型 */
  component: string
  /** 组件id */
  id?: string
  /** 组件图标 */
  icon?: string | JSX.Element
  /** 组件分组 */
  group: import('../enum').GroupEnum
  /** 组件排序 */
  sort?: number
  /** 组件样式 */
  setStyle: T
  /** 禁止删除 */
  disabledDelete?: boolean
  /** 禁止移动 */
  disabledMove?: boolean
}

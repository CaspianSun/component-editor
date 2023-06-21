declare type AllComponentType = SlideshowType | NavigationType | NoticeType | OnePictureType

declare interface OnePictureType extends Partial<CommonStyleType>, Link {
  height: number // 图片高度 1-500px
}

declare interface SlideshowType extends Partial<CommonStyleType> {
  height: number // 轮播图高度 1-500px
  delay: number // 轮播间隔 1-10s
  imgList: Array<Link>
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
  leftIcon: string // 图标 // TODO 图片链接
  leftText: string // 文字
  leftTextColor: string // 文字颜色
  leftBgColor: string // 左侧文字背景颜色
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

interface Link {
  src: string // 图片地址
  type: 1 //跳转类型
  url: string // 跳转地址
  appInfo?: {
    page: string
    appid: string
    name: string
  }
}

declare type SetStyleType<T = AllComponentType> = T

declare interface Component<T> {
  component: string
  cName: string
  group: import('@/componentProperty').GroupEnum
  setStyle: SetStyleType<T>
  sort?: number
  id?: number
}
declare type ComponentType<T = AllComponentType> = Component<T>

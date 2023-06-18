declare type SlideshowType = {
  height: number // 轮播图高度 1-500px
  delay: number // 轮播间隔 1-10s
  marginBRange?: [number, number]
  imgList: Array<
    Link
  >
}

declare type NavigationType = {
  type: number; //图文导航类型 1: 横向 2: 纵向
  shape: number; //图片样式 1: 圆形 2: 方形
  rowNum: number; //行数 1-3
  colNum: number; //列数 3-5
  isShowTitle: boolean; //是否显示标题
  title: string; //标题
  titleSize: number; //标题大小 10-30px
  fontSize: number; //字体大小 10-30px
  isFontBold: boolean; //是否加粗
  fontColor: string; //字体颜色
  bgColor: string; //背景颜色
  iconSize: number; //图标大小 0-50px
  imageList: Array<{
    name: string;
  } & Link>;
}

declare type CommonStyleType = {
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

declare type AllComponentType = SlideshowType | NavigationType

declare type SetStyleType<T = AllComponentType> = T & CommonStyleType

interface Component<T = AllComponentType & CommonStyleType> {
  component: string
  cName: string
  setStyle: T
}
declare type ComponentType<T = undefined> = Component<
  T extends undefined ? SetStyleType : SetStyleType<T>
>

interface Link  {
  src: string
  type?: string
  url?: string
  appInfo?: {
    page: string
    appid: string
    name: string
  }
}


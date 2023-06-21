const componentProperties: Map<string, ComponentType> = new Map()

export enum GroupEnum {
  '基础组件' = 1
}

const commonStyle: CommonStyleType = {
  radiusT: 10, // 上圆角 0-50
  radiusB: 10, // 下圆角 0-50
  marginT: 10, // 上边距 0-50
  marginB: 10, // 下边距 -100-50
  marginLR: 15 // 左右边距 0-50
}

const generalStyle = <T extends AllComponentType>(set: Omit<Component<T>, 'setStyle'>, data: T) => {
  componentProperties.set(set.component, {
    component: set.component,
    cName: set.cName,
    group: set.group,
    sort: set.sort ?? 0,
    setStyle: {
      ...commonStyle,
      ...data
    }
  } as ComponentType)
}
generalStyle<OnePictureType>(
  {
    component: 'onePicture',
    cName: '图片',
    group: GroupEnum['基础组件']
  },
  {
    height: 220,
    src: '',
    type: 1,
    url: ''
  }
)

generalStyle<SlideshowType>(
  {
    component: 'slideshow',
    cName: '轮播图',
    group: GroupEnum['基础组件']
  },
  {
    height: 300,
    delay: 3,
    marginBRange: [-100, 50],
    imgList: [
      { src: '', type: 1, url: '' },
      { src: '', type: 1, url: '' }
    ]
  }
)

generalStyle<NavigationType>(
  {
    component: 'navigation',
    cName: '导航',
    group: GroupEnum['基础组件']
  },
  {
    type: 1,
    iconRadius: 5,
    rowNum: 1,
    colNum: 4,
    isShowTitle: true,
    title: '图文导航',
    titleSize: 14,
    titleColor: '#333333',
    fontSize: 12,
    isFontBold: false,
    fontColor: '#333333',
    bgColor: '#ffffff',
    iconSize: 30,
    isShowIcon: true,
    isShowBorderBottom: true,
    imgList: [
      { src: '', type: 1, url: '', name: '导航1' },
      { src: '', type: 1, url: '', name: '导航2' },
      { src: '', type: 1, url: '', name: '导航3' }
    ]
  }
)

generalStyle<NoticeType>(
  {
    component: 'notice',
    cName: '公告',
    group: GroupEnum['基础组件']
  },
  {
    bgColor: '#ffffff',
    textColor: '#333333',
    delay: 3,
    type: 1,
    leftType: 1,
    leftIcon: '',
    leftText: '公告',
    leftTextColor: '#333333',
    leftBgColor: '#ffffff',
    radiusBRange: [0, 20],
    radiusTRange: [0, 20]
  }
)

export default componentProperties

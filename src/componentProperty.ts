const componentProperties: Map<string, ComponentType> = new Map()

const commonStyle: CommonStyleType = {
  radiusT: 10, // 上圆角 0-50
  radiusB: 10, // 下圆角 0-50
  marginT: 10, // 上边距 0-50
  marginB: 10, // 下边距 -100-50
  marginLR: 15 // 左右边距 0-50
}

const generalStyle = <T extends AllComponentType>(
  name: string,
  cName: string,
  data: T
) => {
  componentProperties.set(name, {
    component: name,
    cName: cName,
    setStyle: {
      ...commonStyle,
      ...data
    }
  })
}

generalStyle<SlideshowType>('slideshow', '轮播图', {
  height: 300,
  delay: 3,
  marginBRange: [-100, 50],
  imgList: [{ src: '' }, { src: '' }]
})

generalStyle<NavigationType>('navigation', '图文导航', {
  type: 1,
  shape: 1,
  rowNum: 1,
  colNum: 4,
  isShowTitle: true,
  title: '图文导航',
  titleSize: 14,
  fontSize: 12,
  isFontBold: false,
  fontColor: '#333333',
  bgColor: '#ffffff',
  iconSize: 30,
  imageList: [
    { src: '', name: '1' },
    { src: '', name: '2' },
    { src: '', name: '3' },
    { src: '', name: '4' },
    { src: '', name: '5' },
    { src: '', name: '6' },
    { src: '', name: '7' },
    { src: '', name: '8' },
    { src: '', name: '9' },
    { src: '', name: '0' }
  ]
})

export default componentProperties

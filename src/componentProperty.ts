import _ from 'lodash'
import {
  generalStyle,
  GroupEnum,
  commonLink,
  CubePictureEnum,
  LinkEnum,
  AssetEnum
} from '@/property/utils'
export { GroupEnum, CubePictureEnum, LinkEnum, AssetEnum }
import { v4 as uuidv4 } from 'uuid'
const componentProperties: Map<string, ComponentProperty> = new Map()

const generalStyleCurry = generalStyle(componentProperties)

generalStyleCurry<CubePicture>(
  {
    component: 'cubePicture',
    cName: '图片魔方',
    group: GroupEnum['基础组件'],
    sort: 1,
    icon: 'icon-park:waterfalls-v'
  },
  {
    type: CubePictureEnum['一行二个'],
    imgList: Array(4)
      .fill({})
      .map(() => {
        return { ...commonLink(), src: '' }
      }),
    itemRadiusT: 0,
    itemRadiusB: 0,
    itemHeight: 120,
    itemMargin: 0
  }
)
generalStyleCurry<CubePicture>(
  {
    component: 'cubePicture',
    cName: '图片魔方',
    group: GroupEnum['基础组件'],
    sort: 1,
    icon: 'icon-park:waterfalls-v'
  },
  {
    type: CubePictureEnum['一行二个'],
    imgList: Array(4)
      .fill({})
      .map(() => {
        return { ...commonLink(), src: '' }
      }),
    itemRadiusT: 0,
    itemRadiusB: 0,
    itemHeight: 120,
    itemMargin: 0
  }
)

generalStyleCurry<Balance>(
  {
    component: 'balance',
    cName: '我的余额',
    group: GroupEnum['基础组件'],
    sort: 2,
    icon: 'icon-park:finance'
  },
  {
    type: 1,
    bgColor: '#ffffff',
    isShowIcon: true,
    icon: '',
    title: '我的余额',
    titleColor: '#333333',
    textColor: '#333333',
    buttonText: '立即充值',
    btnTextColor: '#ffffff',
    btnBgColor: '#333333',
    rightIconColor: '#666666',
    link: commonLink(),
    radiusTRange: [0, 40],
    radiusBRange: [0, 40]
  }
)

generalStyleCurry<Integral>(
  {
    component: 'integral', // 组件名称
    cName: '我的积分', // 组件中文名称
    group: GroupEnum['基础组件'], // 组件分组
    sort: 2,
    icon: 'icon-park:financing'
  },
  {
    // 组件默认样式
    type: 1,
    bgColor: '#ffffff',
    isShowIcon: true,
    icon: '',
    title: '我的积分',
    titleColor: '#333333',
    textColor: '#333333',
    buttonText: '立即使用',
    btnTextColor: '#ffffff',
    btnBgColor: '#333333',
    rightIconColor: '#666666',
    radiusTRange: [0, 40],
    radiusBRange: [0, 40]
  }
)

generalStyleCurry<HotPicture>(
  {
    component: 'hotPicture',
    cName: '图片热区',
    group: GroupEnum['基础组件'],
    sort: 1,
    icon: 'icon-park:new-picture'
  },
  {
    src: '',
    hotpots: [
      {
        id: uuidv4(),
        link: commonLink(),
        top: 0,
        left: 0,
        width: 100,
        height: 100
      }
    ]
  }
)

generalStyleCurry<Slideshow>(
  {
    component: 'slideshow',
    cName: '轮播图',
    group: GroupEnum['基础组件'],
    icon: 'icon-park:picture-album'
  },
  {
    marginT: 0,
    marginB: 0,
    height: 300,
    delay: 3,
    marginBRange: [-100, 50],
    imgList: [
      {
        ...commonLink(),
        src: ''
      }
    ]
  }
)

generalStyleCurry<Navigation>(
  {
    component: 'navigation',
    cName: '导航',
    group: GroupEnum['基础组件'],
    icon: 'icon-park:application-two'
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
    imgList: Array(4)
      .fill('')
      .map((item, index) => {
        return { ...commonLink(), src: '', name: `导航${index + 1}` }
      })
  }
)

generalStyleCurry<Notice>(
  {
    component: 'notice',
    cName: '公告',
    group: GroupEnum['基础组件'],
    icon: 'icon-park:volume-notice'
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

generalStyleCurry<Asset>(
  {
    component: 'asset',
    cName: '资产组件',
    group: GroupEnum['基础组件'],
    icon: 'icon-park:strongbox'
  },
  {
    btnBgColor: '#333',
    btnTextColor: '#fff',
    bgColor: '#fff',
    fontSize: 14,
    itemList: [
      { ...commonLink(), unit: '元', name: '我的余额' },
      { ...commonLink(), unit: '分', name: '我的积分' },
      { ...commonLink(), unit: '张', name: '我的优惠券' }
    ]
  }
)

generalStyleCurry<Vip>(
  {
    component: 'vip',
    cName: '会员信息',
    group: GroupEnum['基础组件'],
    icon: 'icon-park:vip-one'
  },
  {
    bgColor: '#fff',
    fontSize: 14,
    propertyArr: [
      { name: '余额', checked: true, type: AssetEnum['余额'] },
      { name: '积分', checked: false, type: AssetEnum['积分'] },
      { name: '优惠券', checked: false, type: AssetEnum['优惠券'] }
    ],
    vipStyle: 1,
    propertyTextColor: '#000',
    propertyNumberColor: '#000',
    welcomeText: '欢迎光临，请登录',
    welcomeColor: '#000',
    subTitleText: '成为会员，享受更多会员权益',
    subTitleColor: '#000',
    loginBtnText: '立即登录',
    btnTextColor: '#fff',
    btnBgColor: '#000'
  }
)

generalStyleCurry<Divider>(
  {
    component: 'divider',
    cName: '辅助分割',
    group: GroupEnum['辅助组件'],
    icon: 'icon-park:division'
  },
  {
    type: 1,
    bgColor: '#ffffff',
    lineColor: '#999999',
    lineSize: 1,
    height: 20,
    marginLR: 0,
    marginT: 0,
    marginB: 0
  }
)

export default componentProperties

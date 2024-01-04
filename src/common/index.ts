import { ComponentProperty, commonLink } from '../utils'
import { GroupEnum, CubePictureEnum, LinkEnum, AssetEnum } from '../enum'
export { GroupEnum, CubePictureEnum, LinkEnum }
import { v4 as uuid } from 'uuid'

const componentProperties = new ComponentProperty()
export const { componentConfigMap, componentInstanceMap, configInstanceMap } = componentProperties
componentProperties.addConfigInstance('page-setup')
const addComponent = componentProperties.addComponent.bind(componentProperties)

addComponent<CubePicture>(
  {
    component: 'cube-picture',
    title: '图片魔方',
    group: GroupEnum['基础组件'],
    sort: 1,
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
    itemMargin: 0,
  },
)

addComponent<Balance>(
  {
    component: 'balance',
    title: '我的余额',
    group: GroupEnum['基础组件'],
    sort: 2,
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
    radiusBRange: [0, 40],
  },
)

addComponent<Integral>(
  {
    component: 'integral',
    title: '我的积分',
    group: GroupEnum['基础组件'],
    sort: 2,
  },
  {
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
    radiusBRange: [0, 40],
  },
)

addComponent<HotPicture>(
  {
    component: 'hot-picture',
    title: '图片热区',
    group: GroupEnum['基础组件'],
    sort: 1,
  },
  {
    src: '',
    hotSpot: [
      {
        id: uuid(),
        link: commonLink(),
        top: 0,
        left: 0,
        width: 100,
        height: 100,
      },
    ],
  },
)

addComponent<Slideshow>(
  {
    component: 'slideshow',
    title: '轮播图',
    group: GroupEnum['基础组件'],
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
        src: '',
      },
    ],
  },
)

addComponent<Navigation>(
  {
    component: 'navigation',
    title: '导航',
    group: GroupEnum['基础组件'],
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
      }),
  },
)

addComponent<Notice>(
  {
    component: 'notice',
    title: '公告',
    group: GroupEnum['基础组件'],
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
    radiusTRange: [0, 20],
  },
)

addComponent<Asset>(
  {
    component: 'asset',
    title: '资产组件',
    group: GroupEnum['基础组件'],
  },
  {
    btnBgColor: '#333',
    btnTextColor: '#fff',
    bgColor: '#fff',
    fontSize: 14,
    itemList: [
      { ...commonLink(), unit: '元', name: '我的余额' },
      { ...commonLink(), unit: '分', name: '我的积分' },
      { ...commonLink(), unit: '张', name: '我的优惠券' },
    ],
  },
)

addComponent<Vip>(
  {
    component: 'vip',
    title: '会员信息',
    group: GroupEnum['基础组件'],
  },
  {
    bgColor: '#fff',
    fontSize: 14,
    propertyArr: [
      { name: '余额', checked: true, type: AssetEnum['余额'] },
      { name: '积分', checked: false, type: AssetEnum['积分'] },
      { name: '优惠券', checked: false, type: AssetEnum['优惠券'] },
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
    btnBgColor: '#000',
  },
)

addComponent<Divider>(
  {
    component: 'divider',
    title: '辅助分割',
    group: GroupEnum['辅助组件'],
  },
  {
    type: 1,
    bgColor: '#ffffff',
    lineColor: '#999999',
    lineSize: 1,
    height: 20,
    marginL: 0,
    marginR: 0,
    marginT: 0,
    marginB: 0,
  },
)

addComponent<User>(
  {
    component: 'user',
    title: '用户信息',
    group: GroupEnum['基础组件'],
  },
  {
    bgColor: '#2f88ff',
    bgImg: '',
    spacing: 10,
    textColor: '#999999',
    textSize: 14,
    numColor: '#f1cd60',
    numSize: 18,
  },
)

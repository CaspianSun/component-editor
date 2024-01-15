import { v4 as uuid } from 'uuid'
import { AssetEnum, CubeIconEnum, CubePictureEnum, LinkEnum } from '../enum'

export const CubeIconConfig: CubeIcon = {
  type: CubeIconEnum['六宫格'],
  itemBgType: 1,
  itemBgColor: 'rgba(255,255,255,0.5)',
  itemBg: '',
  itemIconSize: 25,
  itemTextSize: 14,
  itemTextColor: '#246DFF',
  itemSpacing: 2,
  itemRadius: 10,
  option: new Array(9).fill(0).map((item, index) => {
    return {
      setupType: 1,
      icon: '',
      bgType: 1,
      text: `宫格${index + 1}`,
    }
  }),
  marginT: 20,
  marginTRange: [0, 200],
  marginBRange: [0, 200],
}

export const SlideshowConfig: Slideshow = {
  height: 300,
  direction: 'horizontal',
  paginationVisible: true,
  delay: 3,
  marginBRange: [-100, 50],
  imgList: [
    {
      src: '',
    },
  ],
}

export const BaseTitleConfig: BaseTitle = {
  title: '标题',
  titleColor: '#246DFF',
  titleSize: 18,
  titleBlockColor: '#246DFF',
  marginT: 50,
  marginB: 30,
  marginL: 20,
  marginR: 20,
}

export const CubePictureConfig: CubePicture = {
  type: CubePictureEnum['一行二个'],
  imgList: Array(4)
    .fill(0)
    .map(() => {
      return { src: '' }
    }),
  radiusT: 0,
  radiusB: 0,
  itemRadiusT: 0,
  itemRadiusB: 0,
  itemHeight: 120,
  itemMargin: 0,
}

export const IntegralConfig: Integral = {
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
  radiusT: 10,
  radiusB: 10,
  marginL: 20,
  marginR: 20,
  marginT: 20,
  marginB: 20,
  radiusTRange: [0, 40],
  radiusBRange: [0, 40],
}

export const BalanceConfig: Balance = {
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
  radiusT: 10,
  radiusB: 10,
  marginL: 20,
  marginR: 20,
  marginT: 20,
  marginB: 20,
  radiusTRange: [0, 40],
  radiusBRange: [0, 40],
}

export const HotPictureConfig: HotPicture = {
  src: '',
  hotSpot: [
    {
      id: uuid(),
      top: 0,
      left: 0,
      width: 100,
      height: 100,
    },
  ],
}

export const NavigationConfig: Navigation = {
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
      return { src: '', name: `导航${index + 1}` }
    }),
  radiusT: 10,
  radiusB: 10,
  marginL: 20,
  marginR: 20,
  marginT: 20,
  marginB: 20,
}

export const NoticeConfig: Notice = {
  bgColor: '#ffffff',
  textColor: '#333333',
  delay: 3,
  type: 1,
  leftType: 1,
  leftIcon: '',
  leftText: '公告',
  leftTextColor: '#333333',
  leftBgColor: '#ffffff',
  radiusT: 10,
  radiusB: 10,
  marginL: 20,
  marginR: 20,
  marginT: 20,
  marginB: 20,
  radiusTRange: [0, 20],
  radiusBRange: [0, 20],
}

export const VipConfig: Vip = {
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
  radiusT: 10,
  radiusB: 10,
  marginL: 20,
  marginR: 20,
  marginT: 20,
  marginB: 20,
}

export const DividerConfig: Divider = {
  type: 1,
  bgColor: '#ffffff',
  lineColor: '#999999',
  lineSize: 1,
  height: 20,
  marginL: 0,
  marginR: 0,
  marginT: 0,
  marginB: 0,
}

export const UserConfig: User = {
  bgColor: '#2f88ff',
  bgImg: '',
  spacing: 10,
  textColor: '#999999',
  textSize: 14,
  numColor: '#f1cd60',
  numSize: 18,
  radiusT: 10,
  radiusB: 10,
  marginL: 20,
  marginR: 20,
  marginB: 20,
}

// export const navigationConfig: Navigation = {}

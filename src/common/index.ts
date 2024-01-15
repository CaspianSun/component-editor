import { ComponentProperty } from '../utils'
import { GroupEnum, CubePictureEnum, LinkEnum, AssetEnum } from '../enum'
export { GroupEnum, CubePictureEnum, LinkEnum, AssetEnum }

import {
  BalanceConfig,
  CubeIconConfig,
  CubePictureConfig,
  DividerConfig,
  HotPictureConfig,
  IntegralConfig,
  NavigationConfig,
  NoticeConfig,
  SlideshowConfig,
  UserConfig,
  VipConfig,
} from './default'

const componentProperties = new ComponentProperty()
export const { componentConfigMap, componentInstanceMap, configInstanceMap } = componentProperties
componentProperties.addConfigInstance('page-setup')
const addComponent = componentProperties.addComponent.bind(componentProperties)

addComponent<CubeIcon>(
  {
    component: 'cube-icon',
    title: '宫格模块',
    group: GroupEnum['基础组件'],
  },
  CubeIconConfig,
)

addComponent<CubePicture>(
  {
    component: 'cube-picture',
    title: '图片魔方',
    group: GroupEnum['基础组件'],
    sort: 1,
  },
  CubePictureConfig,
)

addComponent<Balance>(
  {
    component: 'balance',
    title: '我的余额',
    group: GroupEnum['基础组件'],
    sort: 2,
  },
  BalanceConfig,
)

addComponent<Integral>(
  {
    component: 'integral',
    title: '我的积分',
    group: GroupEnum['基础组件'],
    sort: 2,
  },
  IntegralConfig,
)

addComponent<HotPicture>(
  {
    component: 'hot-picture',
    title: '图片热区',
    group: GroupEnum['基础组件'],
    sort: 1,
  },
  HotPictureConfig,
)

addComponent<Slideshow>(
  {
    component: 'slideshow',
    title: '轮播图',
    group: GroupEnum['基础组件'],
  },
  SlideshowConfig,
)

addComponent<Navigation>(
  {
    component: 'navigation',
    title: '导航',
    group: GroupEnum['基础组件'],
  },
  NavigationConfig,
)

addComponent<Notice>(
  {
    component: 'notice',
    title: '公告',
    group: GroupEnum['基础组件'],
  },
  NoticeConfig,
)

addComponent<Vip>(
  {
    component: 'vip',
    title: '会员信息',
    group: GroupEnum['基础组件'],
  },
  VipConfig,
)

addComponent<Divider>(
  {
    component: 'divider',
    title: '辅助分割',
    group: GroupEnum['辅助组件'],
  },
  DividerConfig,
)

addComponent<User>(
  {
    component: 'user',
    title: '用户信息',
    group: GroupEnum['基础组件'],
  },
  UserConfig,
)

export enum GroupEnum {
  '隐藏',
  '基础组件',
  '辅助组件',
}

export enum LinkEnum {
  '未配置',
  '基础页面',
  '其他小程序',
}

export enum AssetEnum {
  '余额',
  '积分',
  '优惠券',
}

export enum CubePictureEnum {
  '一行二个',
  '一行三个',
  '一行四个',
  '二左二右',
  '一左二右',
  '一上两下',
}

export enum CubeIconEnum {
  // '五宫格',
  '六宫格',
  '七宫格',
  '九宫格',
  '九宫格2',
}

export const CubeIconNumberMap = {
  // [CubeIconEnum['五宫格']]: 5,
  [CubeIconEnum['六宫格']]: 6,
  [CubeIconEnum['七宫格']]: 7,
  [CubeIconEnum['九宫格']]: 9,
  [CubeIconEnum['九宫格2']]: 9,
}

export enum FromDataTypeEnum {
  '文本框',
  '下拉框',
}

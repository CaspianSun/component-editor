export default {
  plugins: {
    'postcss-transform-unit': {
      beforeUnit: 'rpx',
      // 转化的单位
      unit: 'px',
      // 单位精度
      unitPrecision: 5,
      // 不需要处理的css选择器
      selectorBlackList: [],
      // 不需要转化的css属性
      propBlackList: [],
      // 直接修改px，还是新加一条css规则
      replace: true,
      // 是否匹配媒介查询的px
      mediaQuery: false,
      // 需要转化的最小的pixel值，低于该值的px单位不做转化
      minPixelValue: 0,
      // 不处理的文件
      exclude: null,
      // 转化函数
      // 默认设计稿按照750宽，2倍图的出
      transform: (x) => x / 2,
    },
  },
}

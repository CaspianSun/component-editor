export const generateStyleObject = (data: Partial<CommonStyle>, unit: 'px' | 'rpx' = 'px'): Record<string, string> => {
  const handleUnit = (value?: number) => {
    if (!value) return ''
    if (unit === 'px') {
      return value + unit
    }
    return value * 2 + unit
  }
  return {
    marginTop: handleUnit(data.marginT),
    marginBottom: handleUnit(data.marginB),
    marginLeft: handleUnit(data.marginL),
    marginRight: handleUnit(data.marginR),
    borderTopLeftRadius: handleUnit(data.radiusT),
    borderTopRightRadius: handleUnit(data.radiusT),
    borderBottomLeftRadius: handleUnit(data.radiusB),
    borderBottomRightRadius: handleUnit(data.radiusB),
  }
}

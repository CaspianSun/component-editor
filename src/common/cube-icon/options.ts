import { CubeIconEnum } from '../../enum'
import { Schema } from '../../utils/listToElement'

const typeLength = Object.keys(CubeIconEnum).length / 2

export const schema: Schema<CubeIcon>[] = [
  {
    item: [
      {
        label: '类型',
        type: 'ElRadio',
        prop: 'type',
        config: new Array(typeLength).fill(0).map((_, index) => ({
          label: CubeIconEnum[index],
          value: index,
        })),
      },
    ],
  },
]

import { h } from 'vue'
import CommonNumber from '@/components/layout/commonNumber/index.vue'

type CommonNumberKeys = {
  [K in keyof CommonStyleType]: CommonStyleType[K] extends number ? K : never;
} [keyof CommonStyleType] extends infer U ? Exclude<U, undefined> : never;

type CommonNumbersType = Array<{
  title: string;
  prop: CommonNumberKeys;
  range?: [number, number];
}>

export default function render(data: SetStyleType) {
  const commonNumbers: CommonNumbersType = [
    { title: '上圆角', prop: 'radiusT' },
    { title: '下圆角', prop: 'radiusB' },
    { title: '上边距', prop: 'marginT' },
    { title: '下边距', prop: 'marginB', range: data?.marginBRange },
    { title: '左右边距', prop: 'marginLR' },
  ]
  const node = commonNumbers.map(({ title, prop, range }) => h(CommonNumber, {
    max: range?.[1] || 50,
    min: range?.[0] || 0,
    number: data[prop],
    title,
    onUpdate: (val: number) => {
      data[prop] = val
    }
  }));

  return h('div', node);
}
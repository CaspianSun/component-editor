import { defineConfig } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { presetUno } from 'unocss'
import type { Preset } from '@unocss/core'

function RpxToPxPlugin(): Preset {
  return {
    name: 'rpx-to-px',
    enforce: 'pre',
    postprocess(util) {
      util.entries.forEach((i) => {
        const value = i[1]
        if (typeof value === 'string' && /\b(\d+(\.\d+)?)rpx\b/g.test(value)) {
          i[1] = value.replace(/\b(\d+(\.\d+)?)rpx\b/g, (_, value) => {
            const pxValue = parseFloat(value) / 2
            return `${pxValue}px`
          })
        }
      })
    },
  }
}

export default defineConfig({
  presets: [presetUno(), RpxToPxPlugin()],
  rules: [
    [
      /^ma-(.+)-(.+)$/,
      ([, a, b]) => ({
        margin: `${a} ${b}`,
      }),
    ],
    [
      /^pa-(.+)-(.+)$/,
      ([, a, b]) => ({
        padding: `${a} ${b}`,
      }),
    ],
    [
      /^px-(.+)-(.+)$/,
      ([, a, b]) => ({
        'padding-left': `${a}`,
        'padding-right': `${b}`,
      }),
    ],
    [
      /^py-(.+)-(.+)$/,
      ([, a, b]) => ({
        'padding-top': `${a}`,
        'padding-bottom': `${b}`,
      }),
    ],
  ],
  shortcuts: [
    {
      full: 'w-full h-full',
      'abs-full': 'absolute inset-0',
      'flex-center': 'flex items-center justify-center',
      'flex-col-center': 'flex flex-col items-center justify-center',
      'abs-center': 'absolute top-50% left-50% translate--50%',
    },
  ],
  transformers: [transformerVariantGroup()],
})

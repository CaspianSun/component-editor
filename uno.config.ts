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

function RewriterDvh(): Preset {
  return {
    name: 'rewriter-dvh',
    enforce: 'pre',
    postprocess(util) {
      util.entries.forEach((i) => {
        const value = i[1]
        if (typeof value === 'string' && /\b(\d+(\.\d+)?)dvh\b/g.test(value)) {
          i[1] = value.replace(/\b(\d+(\.\d+)?)dvh\b/g, (_, value) => {
            const pxValue = parseFloat(value)
            return `calc(var(--vh) * ${pxValue})`
          })
        }
        if (typeof value === 'string' && /\b(\d+(\.\d+)?)dvw\b/g.test(value)) {
          i[1] = value.replace(/\b(\d+(\.\d+)?)dvw\b/g, (_, value) => {
            const pxValue = parseFloat(value)
            return `calc(var(--vw) * ${pxValue})`
          })
        }
      })
    },
  }
}

export default defineConfig({
  presets: [presetUno(), RpxToPxPlugin(), RewriterDvh()],
  rules: [
    /** vue3-colorpicker组件使用了white类名而被隐藏 */
    [
      /^white$/,
      () => ({
        opacity: '1',
        animation: 'none',
      }),
    ],
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

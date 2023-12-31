import { defineConfig, transformerVariantGroup } from 'unocss'
import { presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno()],
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
      'abs-center': 'absolute top-50% left-50% translate--50%',
      container: 'w-a',
    },
  ],
  transformers: [transformerVariantGroup()],
})

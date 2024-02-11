import { vi } from 'vitest'

import { Nuxt } from '@nuxt/schema'

export const mockedNuxtKit = async () => {
  const kit: Record<string, unknown> = await vi.importActual('@nuxt/kit')

  return {
    ...kit,
    defineNuxtModule: definition => (options = {}) => {
      const mockedNuxt = {
        options: {
          rootDir: '/tmp/nuxt',
          srcDir: '/tmp/nuxt',
          dir: { app: 'app', pages: 'pages' },
          build: { transpile: [] },
          vite: {},
          runtimeConfig: {},
          app: { head: {} },
          alias: {}
        },
        version: '3.0.0'
      } as unknown as Nuxt

      const mergedOptions = {
        //...definition.defaults(mockedNuxt),
        ...options
      }

      definition.setup(mergedOptions, mockedNuxt)

      return { nuxt: mockedNuxt }
    },
    addTemplate: vi.fn(() => ({})),
    addPlugin: vi.fn(),
    addImports: vi.fn(),
    addComponent: vi.fn(),
    addServerHandler: vi.fn(),
    extendPages: vi.fn((extendPagesHook) => {
      const pages = []

      extendPagesHook(pages)

      return pages
    })
  }
}
import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  })

  it('enables component islands feature', async () => {
    const json = await $fetch('/__nuxt_island/DummyComponent')

    expect(json).toHaveProperty('html')
  })

  it('adds custom route which handles the rendering of a esi tag', async () => {
    const html = await $fetch('/__nuxt_esi_tag_renderer/DummyComponent')

    expect(html).toContain('Test')
  })

  it('renders the actual esi tag', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch('/')
    expect(html).toContain('<esi:include')
  })
})

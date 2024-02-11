import { describe, expect, vi, afterEach, it } from 'vitest';
import { addComponent, addImports, addServerHandler } from "@nuxt/kit";
import module from '../src/module'
import { mockModule } from "./__test-utils__/mockModule";

const { createResolver } = await vi.importActual <typeof import('@nuxt/kit')>('@nuxt/kit')

const mockedModule = mockModule(module)
const resolver = createResolver(import.meta.url)


vi.mock('@nuxt/kit', async () => {
  const { mockedNuxtKit } = await vi.importActual<typeof import('./__test-utils__/mockNuxt')>('./__test-utils__/mockNuxt')

  return mockedNuxtKit()
})


describe('it adds auto imports', async () => {

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('adds imports for esiHocFunction', async () => {
    mockedModule()
    expect(addImports).toHaveBeenCalledWith({
      name: 'esiHoc',
      as: 'esiHoc',
      from: resolver.resolve('../src/runtime/hoc/esiHoc')
    })
  })

  it('adds the EsiInclude component', async () => {
    mockedModule()

    expect(addComponent).toHaveBeenCalledWith({
      filePath: resolver.resolve('../src/runtime/components/EsiInclude.server'),
      name: 'EsiInclude',
      mode: "server",
      global: true,
    })
  })

  it('adds the custom endpoint', async () => {
    mockedModule()

    expect(addServerHandler).toHaveBeenCalledWith({
      route: '/__nuxt_esi_tag_renderer/:name',
      handler: resolver.resolve('../src/runtime/server/__nuxt_esi_tag_renderer/[name].get')
    })
  })
})
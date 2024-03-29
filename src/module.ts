import { defineNuxtModule, createResolver, addServerHandler, addImports, addComponent } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
}


export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-esi-tags',
    configKey: 'nuxtEsiTags',
    compatibility: {
      nuxt: '^3.10.0'
    }
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(options, nuxt) {
    // Enable component islands, as this module makes use of components islands internal logic.
    nuxt.options.experimental ||= {} as typeof nuxt.options.experimental
    nuxt.options.experimental.componentIslands = true

    const resolver = createResolver(import.meta.url)

    addServerHandler({
      route: '/__nuxt_esi_tag_renderer/:name',
      handler: resolver.resolve('./runtime/server/__nuxt_esi_tag_renderer/[name].get')
    })

    addImports({
      name: 'esiHoc',
      as: 'esiHoc',
      from: resolver.resolve('./runtime/hoc/esiHoc')
    })

    await addComponent({
      filePath: resolver.resolve('./runtime/components/EsiInclude.server'),
      name: 'EsiInclude',
      mode: "server",
      global: true,
    })
  }
})

export default defineNuxtConfig({
  modules: ['../src/module'],
  nuxtEsiTags: {},
  devtools: { enabled: true },
  future: {
    typescriptBundlerResolution: true
  }
})

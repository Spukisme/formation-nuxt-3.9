// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  ssr: false,
  typescript: {
    typeCheck: true,
    strict: true,
  },
  modules: ['@pinia/nuxt', 'vuetify-nuxt-module'],
})

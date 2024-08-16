// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
      API_PRIMARY_KEY: process.env.API_PRIMARY_KEY,
    },
  },
});

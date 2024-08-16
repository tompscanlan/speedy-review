// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
      API_PRIMARY_KEY: process.env.API_PRIMARY_KEY,
      ANTHROPIC_MODEL: process.env.ANTHROPIC_MODEL,
      ANTHROPIC_TEMPERATURE: process.env.ANTHROPIC_TEMPERATURE,
      ANTHROPIC_MAX_TOKENS: process.env.ANTHROPIC_MAX_TOKENS,
    },
  },
});

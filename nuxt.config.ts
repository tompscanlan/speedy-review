import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  runtimeConfig: {
    PG_URL: process.env.PG_URL,

    public: {
      ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
      API_PRIMARY_KEY: process.env.API_PRIMARY_KEY,
      ANTHROPIC_MODEL: process.env.ANTHROPIC_MODEL,
      ANTHROPIC_TEMPERATURE: process.env.ANTHROPIC_TEMPERATURE,
      ANTHROPIC_MAX_TOKENS: process.env.ANTHROPIC_MAX_TOKENS,
      posthogPublicKey: 'phc_McFLdS6nzSUcxCNzDYobMUN614VvA2m3uh3HrwGzj2T',
      posthogHost: 'https://us.i.posthog.com'
    },
  },
});

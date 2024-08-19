import { defineNuxtPlugin } from "#app";
import posthog from "posthog-js";
export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();

  try {
    posthog.init(runtimeConfig.public.posthogPublicKey, {
      api_host: runtimeConfig.public.posthogHost,
      person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
      capture_pageview: false, // we add manual pageview capturing below
      loaded: (posthog) => {
        if (import.meta.env.MODE === "development") posthog.debug();
      },
    });
  } catch (error) {
    console.error("Error initializing PostHog:", error);
  }

  // Make sure that pageviews are captured with each route change
  const router = useRouter();
  router.afterEach((to) => {
    nextTick(() => {
      posthog.capture("$pageview", {
        current_url: to.fullPath,
      });
    });
  });

  nuxtApp.provide("posthog", posthog);
});

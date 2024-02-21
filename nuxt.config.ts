// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  vite: {
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                @import "@/assets/scss/variables/colors.scss";
                `,
            }
        },
    },
  }
})

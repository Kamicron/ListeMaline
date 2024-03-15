// store.js
import { reactive } from 'vue'

export const store = reactive({
  isDark: false,
  accessToken: null as string | null})
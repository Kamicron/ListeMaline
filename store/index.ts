// store.js
import { reactive } from 'vue'
import { IUser } from '@/types/users'

export const store = reactive({
  isDark: false,
  accessToken: null as string | null,
  user: null as IUser | null 
})
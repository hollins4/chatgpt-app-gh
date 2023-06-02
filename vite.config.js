import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  base: "/https://github.com/hollins4/chatgpt-app-gh",
  plugins: [react()],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const base = process.env.VERCEL ? '/' : '/react-task-tracker/'

export default defineConfig({
  base,
  plugins: [react()],
})

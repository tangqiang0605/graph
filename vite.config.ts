import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import px2Vw from 'postcss-px-to-viewport'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        new px2Vw({
          viewportWidth: 1512,
          unitPrecision: 4,
          viewportUnit: 'vw',
          minPixelValue: 1,
          mediaQuery: false
        })
      ]
    }
  }
})

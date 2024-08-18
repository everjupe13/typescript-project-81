import path from 'node:path'

import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // include: [...configDefaults.exclude, 'packages/template/*']
    include: [...configDefaults.include]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})

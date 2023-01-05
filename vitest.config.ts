/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['./src/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', 'build'],
    mockReset: true,
  },
})

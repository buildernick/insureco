import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/__tests__/setup.js",
    css: false, // Skip CSS processing in tests
    coverage: {
      provider: 'v8',
      reporter: ['text'],
      reportOnFailure: true,
      include: ['src/**/*.{js,jsx}'],
      exclude: [
        'src/__tests__/**',
        'src/main.jsx',
        'src/component-examples/**',
        '**/*.stories.{js,jsx}',
      ],
    },
  },
});

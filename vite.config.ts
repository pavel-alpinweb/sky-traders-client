import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import checker from "vite-plugin-checker"
import svgLoader from "vite-svg-loader"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        svgLoader(),
        checker({
            vueTsc: true,
            eslint: {
                // for example, lint .ts and .tsx
                lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
            },
        }),
    ],
})

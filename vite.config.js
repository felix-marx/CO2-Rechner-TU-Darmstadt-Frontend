import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint';
import { resolve } from "node:path";
import path from 'path'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'


export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    eslintPlugin(),
    VueI18nPlugin({
      include: [path.resolve(__dirname, './src/locales/**')],
      strictMessage: false,
    }),
    Vuetify({
      autoImport: true,
      // styles: {
      //   configFile: 'src/styles/settings.scss',
      // },
    }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 8081,
  },
})
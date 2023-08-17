import { telefunc } from 'telefunc/vite'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import checker from 'vite-plugin-checker'
import inspect from 'vite-plugin-inspect'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [
    splitVendorChunkPlugin(),
    checker({
      typescript: true,
    }),
    telefunc({
      disableNamingConvention: true,
    }),
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
    inspect(),
  ],
  server: {
    port: 3000,
    host: true,
  },
  build: {
    target: 'esnext',
  },
  appType: 'mpa',
})

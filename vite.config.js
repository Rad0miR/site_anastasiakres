import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Файлы меньше этого размера Vite вшивает в бандл как base64. Порог
    // низкий, чтобы фотографии оставались отдельными файлами: их можно
    // заменить, не пересобирая код.
    assetsInlineLimit: 2048,
    // cssCodeSplit включён (по умолчанию): оформление каждой версии уезжает
    // в свой файл и грузится только вместе с ней. Иначе посетитель главной
    // качал бы ещё и стили v1, v3, v4…
    rollupOptions: {
      output: {
        /*
         * Файл версии называется по её папке: v1-[hash].js, v2-[hash].js.
         *
         * Точка входа у всех версий одна и та же — App.jsx, поэтому без
         * этого правила в dist лежали бы App-*.js, различимые только по
         * хешу. Видно, что откуда, и в логе сборки, и во вкладке «Сеть».
         */
        chunkFileNames: (chunk) => {
          const version = chunk.facadeModuleId?.match(/[\/]src[\/](v\d+)[\/]/)?.[1]
          return version ? `assets/${version}-[hash].js` : 'assets/[name]-[hash].js'
        },
      },
    },
  },
})

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/staging/",
  plugins: [react()],
  build: {
    outDir: "dist", // Куди буде збережений білд
    target: "esnext", // Використовує найновіший JS для сучасних браузерів
    rollupOptions: {
      output: {
        format: "es", // Забезпечує правильний формат модулів
      },
    },
  },
});

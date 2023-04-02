import { PluginOption, defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteCompression from 'vite-plugin-compression';
import { createHtmlPlugin } from 'vite-plugin-html';
import { visualizer } from 'rollup-plugin-visualizer';
import viteImagemin from 'vite-plugin-imagemin';

const build = {
  sourcemap: false,
  rollupOptions: {
    manualChunks: (path) => {
      if (/node_modules/.test(path)) return path.split('node_modules/')[1]?.split('/')[0]?.replace('@', '');
    },
    output: {
      assetFileNames: ({ name }) => {
        switch (true) {
          case /\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(name ?? ''):
            return `images/[name]-[hash][extname]`;

          case /\.css$/i.test(name ?? ''):
            return `styles/[name]-[hash][extname]`;

          default:
            return `assets/[name]-[hash][extname]`;
        }
      },
      chunkFileNames: 'js/[name]-[hash].js',
      entryFileNames: 'js/[name]-[hash].js',
    },
  },
};

export default defineConfig(({ mode }) => {
  switch (mode) {
    case 'visualizer':
      return {
        plugins: [
          vue(),
          createHtmlPlugin({ template: 'public/index-dev.html' }),
          visualizer({
            template: 'treemap', // treemap, sunburst, network
            title: 'Visualize packages size',
            open: true,
            gzipSize: true,
            brotliSize: true,
            filename: './node_modules/.cache/visualizer/stats.html',
          }),
        ],
        build,
      };

    case 'production':
      return {
        plugins: [
          vue(),
          viteImagemin({
            gifsicle: {
              optimizationLevel: 7,
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 7,
            },
            mozjpeg: {
              quality: 20,
            },
            pngquant: {
              quality: [0.8, 0.9],
              speed: 4,
            },
            svgo: {
              plugins: [
                {
                  name: 'removeViewBox',
                },
                {
                  name: 'removeEmptyAttrs',
                  active: false,
                },
              ],
            },
          }),
          createHtmlPlugin({
            minify: true,
            entry: '../src/main.ts',
            template: 'public/index.html',
            inject: {
              data: {
                lang: 'en',
                title: 'Admin panel',
                favicon: '/vite.svg',
                faviconType: 'image/svg+xml',
              },
            },
          }),
          viteCompression({
            algorithm: 'gzip',
            ext: '.gz',
            filter: /\.(js|json|css|html|svg)$/i,
            deleteOriginFile: false,
            threshold: 512,
          }),
          viteCompression({
            algorithm: 'brotliCompress',
            ext: '.br',
            filter: /\.(js|json|css|html|svg)$/i,
            deleteOriginFile: false,
            threshold: 512,
          }),
        ],
        build,
        preview: { port: 3001 },
      };

    default:
      return {
        plugins: [vue(), createHtmlPlugin({ template: '/index-dev.html' })],
        build: { sourcemap: true },
        server: { port: 3000 },
      };
  }
});

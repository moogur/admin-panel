import { PluginOption, defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteCompression from 'vite-plugin-compression';
import { createHtmlPlugin } from 'vite-plugin-html';
import { visualizer } from 'rollup-plugin-visualizer';
import viteImagemin from 'vite-plugin-imagemin';
import path from 'node:path';

const alias = [
  { find: '@api', replacement: path.resolve(__dirname, 'src', 'api') },
  { find: '@app', replacement: path.resolve(__dirname, 'src', 'app') },
  { find: '@assets', replacement: path.resolve(__dirname, 'src', 'assets') },
  { find: '@pages', replacement: path.resolve(__dirname, 'src', 'pages') },
  { find: '@router', replacement: path.resolve(__dirname, 'src', 'router') },
  { find: '@shared', replacement: path.resolve(__dirname, 'src', 'shared') },
  { find: '@store', replacement: path.resolve(__dirname, 'src', 'store') },
  { find: '@src', replacement: path.resolve(__dirname, 'src') },
];

const build = {
  sourcemap: false,
  rollupOptions: {
    output: {
      manualChunks: (path) => {
        if (/node_modules/.test(path)) return `lib.${path.split('node_modules/')[1]?.split('/')[0]?.replace('@', '')}`;
      },
      assetFileNames: ({ name }) => {
        switch (true) {
          case /\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(name ?? ''): {
            return `images/[name].[hash][extname]`;
          }

          case /\.css$/i.test(name ?? ''): {
            return `styles/[name].[hash][extname]`;
          }

          default: {
            return `assets/[name].[hash][extname]`;
          }
        }
      },
      chunkFileNames: 'js/[name].[hash].js',
      entryFileNames: 'js/[name].[hash].js',
    },
  },
};

const css = {
  preprocessorOptions: {
    scss: {
      additionalData: `@import "@shared/styles/variables/scss.scss";
@import "@shared/styles/mixins/index.scss";`,
    },
  },
};

export default defineConfig(({ mode }) => {
  switch (mode) {
    case 'visualizer':
      return {
        css,
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
        resolve: { alias },
      };

    case 'production':
      return {
        css,
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
        resolve: { alias },
      };

    default:
      return {
        css,
        plugins: [vue(), createHtmlPlugin({ template: '/index-dev.html' })],
        build: { sourcemap: true },
        server: {
          port: 3000,
          proxy: {
            '/authorization-api': 'http://test.admin.server.lan',
          },
        },
        resolve: { alias },
      };
  }
});

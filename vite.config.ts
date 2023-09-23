import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

import vue from '@vitejs/plugin-vue';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import { createHtmlPlugin } from 'vite-plugin-html';
import viteImagemin from 'vite-plugin-imagemin';

const tsconfig = JSON.parse(readFileSync('./tsconfig.json', 'utf8'));
const currentDirname = path.dirname(fileURLToPath(import.meta.url));

const alias = Object.entries(tsconfig.compilerOptions.paths).reduce<Array<{ replacement: string; find: string }>>(
  (accumulator, [key, value]) => {
    const preparedKey = key.split('/')[0] ?? '';
    const preparedValue = Array.isArray(value) && typeof value[0] === 'string' ? value[0] : '';
    const preparedPath = path.resolve(currentDirname, preparedValue.replace(/(\*|index.ts)?$/, ''));

    if (accumulator.every((item) => item.replacement !== preparedPath)) {
      accumulator.push({ find: preparedKey, replacement: preparedPath });
    }

    return accumulator;
  },
  [{ find: '@fonts', replacement: path.resolve(currentDirname, 'assets/fonts') }],
);

const build = {
  sourcemap: false,
  rollupOptions: {
    output: {
      manualChunks: (filePath: string) => {
        if (/node_modules/.test(filePath)) {
          const libraryName = filePath.split('node_modules/')[1]?.split('/')[0]?.replace('@', '');
          if (libraryName === 'vue' || libraryName === 'vue-router') return `lib.vue`;

          return 'lib.other';
        }

        return 'app';
      },
      assetFileNames: ({ name }: { name: string | undefined }) => {
        switch (true) {
          case /\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(name ?? ''): {
            return `images/[name].[hash][extname]`;
          }

          case /\.css$/i.test(name ?? ''): {
            return `styles/[name].[hash][extname]`;
          }

          case /\.(ttf|otf|woff|woff2)$/i.test(name ?? ''): {
            return `fonts/[name][extname]`;
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
    case 'analyze': {
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
    }

    case 'production': {
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
            compressionOptions: {
              params: {
                [zlib.constants.GZIP]: 9,
              },
            },
          }),
          viteCompression({
            algorithm: 'brotliCompress',
            ext: '.br',
            filter: /\.(js|json|css|html|svg)$/i,
            deleteOriginFile: false,
            threshold: 512,
            compressionOptions: {
              params: {
                [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
              },
            },
          }),
        ],
        build,
        preview: { port: 3001 },
        resolve: { alias },
      };
    }

    default: {
      return {
        css,
        plugins: [vue(), createHtmlPlugin({ template: '/index-dev.html' })],
        build: { sourcemap: true },
        server: {
          port: 3000,
          proxy: {
            [String(process.env['VITE_AUTHORIZATION_BASE_URL'])]: {
              target: 'http://test.api.authorization.server.lan',
              changeOrigin: true,
              rewrite: (url: string) => url.replace(/^.+?\//, '/'),
            },
            [String(process.env['VITE_LOCALIZATION_BASE_URL'])]: {
              target: 'http://test.admin.server.lan',
              changeOrigin: true,
            },
          },
        },
        resolve: { alias },
      };
    }
  }
});

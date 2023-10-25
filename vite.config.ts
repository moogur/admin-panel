import { getConfig } from '@moogur/vite-config';
import { defineConfig } from 'vite';

const proxy = {
  [String(process.env['VITE_AUTHORIZATION_BASE_URL'])]: {
    target: 'http://test.api.authorization.server.lan',
    changeOrigin: true,
    rewrite: (url: string) => url.replace(/^.+?\//, '/'),
  },
  [String(process.env['VITE_LOCALIZATION_BASE_URL'])]: {
    target: 'http://test.admin.server.lan',
    changeOrigin: true,
  },
};

export default defineConfig(({ mode }) =>
  getConfig({
    mode,
    proxy,
  }),
);

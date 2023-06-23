import { ServicesVersions } from '@api';

export const services: Array<{ title: string; swaggerLink: string; key: keyof ServicesVersions }> = [
  {
    title: 'Authorization API',
    swaggerLink: 'http://test.api.authorization.server.lan/swagger/',
    key: 'authorization',
  },
];

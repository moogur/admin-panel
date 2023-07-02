import { h } from 'vue';

import { ColumnsType } from '@shared/types';

import { Service } from './MainPageTypes';

export const columns: ColumnsType<Service> = [
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: 'Link to swagger',
    key: 'swagger',
    dataIndex: 'swagger',
    customRender: (value: string) => h('a', { href: value, target: '_blank', rel: 'noreferrer' }, value),
  },
  {
    title: 'Version',
    key: 'version',
    dataIndex: 'version',
  },
  {
    title: 'IP',
    key: 'ip',
    dataIndex: 'ip',
  },
];

export const baseDataSource = [
  {
    name: 'Authorization API',
    swagger: 'http://test.api.authorization.server.lan/swagger/',
    dataIndex: 'authorization',
  },
] as const;

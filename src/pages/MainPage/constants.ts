import { h } from 'vue';

import { ColumnsType } from '@shared/types';

import { Service } from './MainPageTypes';

export const columns: ColumnsType<Service> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Link to swagger',
    dataIndex: 'swagger',
    customRender: (value: string) => h('a', { href: value, target: '_blank', rel: 'noreferrer' }, value),
  },
  {
    title: 'Version',
    dataIndex: 'version',
  },
];

export const baseDataSource = [
  {
    name: 'Authorization API',
    swagger: 'http://test.api.authorization.server.lan/swagger/',
    versionDataIndex: 'authorization',
  },
] as const;

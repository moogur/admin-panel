import { SubPage } from '@shared/types';

import { IpsSettings, KeysSettings, UserInfoSettings } from './components';

export const tabs: SubPage[] = [
  {
    key: 'keys',
    title: 'Keys',
    component: KeysSettings,
  },
  {
    key: 'info',
    title: 'Info',
    component: UserInfoSettings,
  },
  {
    key: 'ips',
    title: 'IPs',
    component: IpsSettings,
  },
];

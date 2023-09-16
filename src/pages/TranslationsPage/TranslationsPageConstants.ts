import { FrontendServices } from '@shared/types';

import { Service } from './Service';

export const tabs = [
  {
    key: FrontendServices.AdminPanel,
    title: 'Admin panel',
    component: Service,
  },
];

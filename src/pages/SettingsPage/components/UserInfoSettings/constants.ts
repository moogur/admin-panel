import { Admin } from '@api/AuthorizationApi';

export const list: Array<{ title: string; key: keyof Admin }> = [
  {
    title: 'ID',
    key: 'id',
  },
  {
    title: 'Nick',
    key: 'username',
  },
  {
    title: 'Email',
    key: 'email',
  },
];

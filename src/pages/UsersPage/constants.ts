import { Fragment, h } from 'vue';

import { BaseUser } from '@api';
import { ColumnsType, UserStatusEnum } from '@shared/types';
import { getDateToShowInTable, convertGenderEnumToTag, convertStatusEnumToTag } from '@shared/utils';

import { DeleteModal } from './DeleteModal';
import { DetailModal } from './DetailModal';

export const columns: ColumnsType<BaseUser> = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    needSort: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    needSort: true,
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    needSort: true,
    customRender: convertGenderEnumToTag,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    needSort: true,
    customRender: convertStatusEnumToTag,
  },
  {
    title: 'Created date',
    dataIndex: 'createdDate',
    key: 'createdDate',
    needSort: true,
    customRender: (value?: string) => getDateToShowInTable(value),
  },
  {
    title: 'Updated date',
    dataIndex: 'updatedDate',
    key: 'updatedDate',
    needSort: true,
    customRender: (value?: string) => getDateToShowInTable(value, '-'),
  },
  {
    title: '',
    dataIndex: 'id',
    key: 'actions',
    tdStyle: 'padding-top: 0px; padding-bottom: 0px; vertical-align: middle;',
    customRender: (value: string, record) =>
      h(Fragment, null, [
        h(DetailModal, { userId: value }),
        record.status === UserStatusEnum.Active && h(DeleteModal, { userId: value, username: record.username }),
      ]),
  },
];

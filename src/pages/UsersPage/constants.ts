import { h } from 'vue';

import { BaseUser, UserSortOrderFields } from '@api';
import { defaultPagination } from '@shared/constants';
import { ColumnsType, TableChange } from '@shared/types';
import { getDateToShowInTable, convertGenderEnumToTag, convertStatusEnumToTag } from '@shared/utils';

import { DetailModal } from './DetailModal';

export const defaultQueryParameters: TableChange<UserSortOrderFields> = {
  action: null,
  pagination: defaultPagination,
  sorter: { key: 'createdDate', sortOrder: 'ascend' },
};

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
    customRender: (value: string) =>
      h('div', { style: { display: 'flex', gap: '5px' } }, [h(DetailModal, { userId: value })]),
  },
];

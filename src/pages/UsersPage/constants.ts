import { User, UserSortOrderFields } from '@api';
import { defaultPagination } from '@shared/constants';
import { ColumnsType, TableChange } from '@shared/types';
import { getDateToShowInTable } from '@shared/utils';
import { convertGenderEnumToTag, convertStatusEnumToTag } from '@shared/utils/enum';

export const defaultQueryParameters: TableChange<UserSortOrderFields> = {
  action: null,
  pagination: defaultPagination,
  sorter: { key: 'createdDate', sortOrder: 'ascend' },
};

export const columns: ColumnsType<User> = [
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
];

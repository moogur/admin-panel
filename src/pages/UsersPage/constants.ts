import { User } from '@api';
import { ColumnsType } from '@shared/types';
import { getDateToShowInTable } from '@shared/utils';
import { convertGenderEnumToTag, convertStatusEnumToTag } from '@shared/utils/enum';

export const columns: ColumnsType<User> = [
  {
    title: 'Username',
    dataIndex: 'username',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    customRender: convertGenderEnumToTag,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    customRender: convertStatusEnumToTag,
  },
  {
    title: 'Created date',
    dataIndex: 'createdDate',
    customRender: (value?: string) => getDateToShowInTable(value),
  },
  {
    title: 'Updated date',
    dataIndex: 'updatedDate',
    customRender: (value?: string) => getDateToShowInTable(value, '-'),
  },
];

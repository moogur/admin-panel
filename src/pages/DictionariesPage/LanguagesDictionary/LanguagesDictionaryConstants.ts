import { h, Text } from 'vue';

import { LanguageDictionary } from '@api';
import { defaultLanguage } from '@shared/constants';
import { ColumnsType } from '@shared/types';

import { DeleteModal } from './DeleteModal';
import { UpdateModal } from './UpdateModal';

export const columns: ColumnsType<LanguageDictionary> = [
  {
    title: '№',
    key: 'sequenceNumber',
    customRender: (_, __, index) => h(Text, index + 1),
  },
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'Name english',
    dataIndex: 'nameEn',
    key: 'nameEn',
  },
  {
    title: 'Name self',
    dataIndex: 'nameSelf',
    key: 'nameSelf',
  },
  {
    title: '',
    dataIndex: 'code',
    key: 'actions',
    tdStyle: 'padding-top: 0px; padding-bottom: 0px; vertical-align: middle;',
    customRender: (value: string, record) =>
      h('div', { style: 'display: flex; gap: 8px;' }, [
        h(UpdateModal, { language: record }),
        record.code !== defaultLanguage && h(DeleteModal, { code: value, language: record }),
      ]),
  },
];

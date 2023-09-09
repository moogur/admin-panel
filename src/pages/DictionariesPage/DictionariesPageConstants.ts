import { SubPage } from '@shared/types';

import { LanguagesDictionary } from './LanguagesDictionary';

export const tabs: SubPage[] = [
  {
    key: 'languageDictionary',
    title: 'Languages',
    component: LanguagesDictionary,
  },
];

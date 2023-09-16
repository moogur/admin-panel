import { Tab } from '@shared/types';

import { LanguagesDictionary } from './LanguagesDictionary';

export const tabs: Tab[] = [
  {
    key: 'languageDictionary',
    title: 'Languages',
    component: LanguagesDictionary,
  },
];

import { defineStore } from 'pinia';

import { FrontendServices } from '@shared/types';

export enum TranslationFilterShowEnum {
  All = 'all',
  OnlyEmpty = 'onlyEmpty',
  Certain = 'certain',
}

export type TranslationStore = {
  code: null | string;
  service: null | FrontendServices;
  nameEn: null | string;
  filter: {
    showType: TranslationFilterShowEnum;
    searchString: string;
  };
};

export const useTranslationStore = defineStore({
  id: 'translation',
  state: (): TranslationStore => ({
    code: null,
    service: FrontendServices.AdminPanel,
    nameEn: null,
    filter: { showType: TranslationFilterShowEnum.All, searchString: '' },
  }),
  actions: {
    updateCode(code: string) {
      this.code = code;
    },
    updateService(service: FrontendServices) {
      this.service = service;
    },
    updateFilter(filter: TranslationStore['filter']) {
      this.filter = filter;
    },
  },
});

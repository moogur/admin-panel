import { FrontendServices } from '@shared/types';

const ratio: Record<string, FrontendServices> = {
  adminPanel: FrontendServices.AdminPanel,
};

export function convertStringToFrontendService(value?: string): FrontendServices {
  return ratio[String(value)] ?? FrontendServices.AdminPanel;
}

export function prepareDataForForm(
  defaultData: Record<string, string> | null,
  localizationData: Record<string, string> | null,
): Record<string, string> {
  return Object.keys(defaultData ?? {}).reduce<Record<string, string>>((accumulator, key) => {
    accumulator[key] = localizationData?.[key] ?? '';

    return accumulator;
  }, {});
}

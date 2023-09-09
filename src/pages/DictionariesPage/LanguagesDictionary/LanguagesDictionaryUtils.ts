import { UpdateLanguageDictionary } from '@api';

export function formTransformValues<T extends UpdateLanguageDictionary>(
  formData: T,
  previousNameSelf?: UpdateLanguageDictionary['nameSelf'],
): T {
  return { ...formData, nameSelf: previousNameSelf && !formData.nameSelf ? null : formData.nameSelf || undefined };
}

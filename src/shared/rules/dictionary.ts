import { ValidationArgs } from '@vuelidate/core';
import { maxLength, required } from '@vuelidate/validators';

import { checkOnlyEnglishLettersAndNumbersRegexp, checkOnlyLowerEnglishLettersRegexp } from '@shared/validators';

export function getLanguageNameRules(isRequired: boolean, onlyEnglishLetters: true): unknown;
export function getLanguageNameRules(isRequired: boolean): unknown;
export function getLanguageNameRules(isRequired: boolean, onlyEnglishLetters?: true): unknown {
  let baseRules: ValidationArgs = {
    minLength: maxLength(20),
  };

  if (isRequired) baseRules = { ...baseRules, required };
  if (onlyEnglishLetters) baseRules = { ...baseRules, checkOnlyEnglishLettersAndNumbersRegexp };

  return baseRules;
}

export function getLanguageCodeRules(): unknown {
  return {
    minLength: maxLength(3),
    required,
    checkOnlyLowerEnglishLettersRegexp,
  };
}

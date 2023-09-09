import { helpers } from '@vuelidate/validators';

export const checkOnlyEnglishLettersAndNumbersRegexp = helpers.withMessage(
  'The language name must contain only characters - a-zA-Z0-9',
  helpers.regex(/^[\dA-Za-z]+$/),
);

export const checkOnlyLowerEnglishLettersRegexp = helpers.withMessage(
  'The code must contain only characters - a-z',
  helpers.regex(/^[a-z]+$/),
);

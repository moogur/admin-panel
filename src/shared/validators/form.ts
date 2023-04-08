import { helpers } from '@vuelidate/validators';

export const checkUsernameWithRegexp = helpers.withMessage(
  'The username must contain only characters - a-zA-Z0-9_',
  helpers.regex(/^\w+$/),
);
export const checkPasswordWithRegexp = helpers.withMessage(
  'The password must contain only characters - a-zA-Z0-9_!#%&*.@',
  helpers.regex(/^[\w!#%&*.@]+$/),
);

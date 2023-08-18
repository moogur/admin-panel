import { required, minLength } from '@vuelidate/validators';

import { checkUsernameWithRegexp, checkPasswordWithRegexp } from '../validators';

export const loginFormValidationRules = {
  username: { required, minLength: minLength(5), checkUsernameWithRegexp },
  password: { required, minLength: minLength(5), checkPasswordWithRegexp },
} as const;

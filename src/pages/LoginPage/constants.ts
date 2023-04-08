import { required, minLength } from '@vuelidate/validators';

import { checkUsernameWithRegexp, checkPasswordWithRegexp } from '@shared/validators';

export const formValidationRules = {
  username: { required, minLength: minLength(5), checkUsernameWithRegexp },
  password: { required, minLength: minLength(5), checkPasswordWithRegexp },
};

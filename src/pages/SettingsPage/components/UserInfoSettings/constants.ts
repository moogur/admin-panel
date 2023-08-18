import { minLength, email } from '@vuelidate/validators';

import { loginFormValidationRules } from '@shared/rules';
import { checkPasswordWithRegexp } from '@shared/validators';

export const list = [
  {
    title: 'ID',
    key: 'id',
  },
  {
    title: 'Nick',
    key: 'username',
  },
  {
    title: 'Email',
    key: 'email',
  },
] as const;

export const formValidationRules = {
  username: loginFormValidationRules.username,
  email: { minLength: minLength(10), email },
  password: { minLength: minLength(10), checkPasswordWithRegexp },
} as const;

import { required, minLength, email } from '@vuelidate/validators';

import { checkUsernameWithRegexp, checkPasswordWithRegexp } from '@shared/validators';

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
  username: { required, minLength: minLength(5), checkUsernameWithRegexp },
  email: { minLength: minLength(10), email },
  password: { minLength: minLength(10), checkPasswordWithRegexp },
} as const;

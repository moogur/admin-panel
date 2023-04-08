import { required, minLength, email } from '@vuelidate/validators';

import { Admin } from '@api/AuthorizationApi';
import { checkUsernameWithRegexp, checkPasswordWithRegexp } from '@shared/validators';

export const list: Array<{ title: string; key: keyof Admin }> = [
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
];

export const formValidationRules = {
  username: { required, minLength: minLength(5), checkUsernameWithRegexp },
  email: { minLength: minLength(10), email },
  password: { minLength: minLength(10), checkPasswordWithRegexp },
};

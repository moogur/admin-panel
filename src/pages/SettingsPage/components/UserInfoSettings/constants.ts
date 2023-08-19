import { getEmailValidationRules, getPasswordValidationRules, getUsernameValidationRules } from '@shared/rules';

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
  username: getUsernameValidationRules(true),
  email: getEmailValidationRules(false),
  password: getPasswordValidationRules(false),
} as const;

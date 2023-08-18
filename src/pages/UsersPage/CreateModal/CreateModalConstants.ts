import { required, minLength, email } from '@vuelidate/validators';

import { CreateUser } from '@api';
import { loginFormValidationRules } from '@shared/rules';
import { GenderEnum } from '@shared/types';

export const initialValues: CreateUser = {
  username: '',
  email: '',
  password: '',
  gender: GenderEnum.Male,
};

export const genderOptions = [
  {
    label: 'Male',
    value: GenderEnum.Male,
  },
  {
    label: 'Female',
    value: GenderEnum.Female,
  },
];

export const createFormValidationRules = {
  ...loginFormValidationRules,
  email: { required, minLength: minLength(10), email },
};

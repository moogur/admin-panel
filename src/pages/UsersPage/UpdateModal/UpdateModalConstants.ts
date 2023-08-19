import { required, minLength, email } from '@vuelidate/validators';

import { UpdateUser } from '@api';
import { GenderEnum } from '@shared/types';
import { checkPasswordWithRegexp, checkUsernameWithRegexp } from '@shared/validators';

export const initialValues: UpdateUser = {
  username: '',
  email: '',
  password: undefined,
  gender: undefined,
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

export const updateFormValidationRules = {
  username: { required, minLength: minLength(5), checkUsernameWithRegexp },
  password: { minLength: minLength(5), checkPasswordWithRegexp },
  email: { required, minLength: minLength(10), email },
};

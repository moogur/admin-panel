import { ValidationRuleWithParams, ValidationRuleWithoutParams } from '@vuelidate/core';
import { required, minLength, email } from '@vuelidate/validators';

import { checkUsernameWithRegexp, checkPasswordWithRegexp } from '../validators';

export function getUsernameValidationRules(isRequired: false): {
  minLength: ValidationRuleWithParams;
  checkUsernameWithRegexp: ValidationRuleWithParams;
};
export function getUsernameValidationRules(isRequired: true): {
  required: ValidationRuleWithoutParams;
  minLength: ValidationRuleWithParams;
  checkUsernameWithRegexp: ValidationRuleWithParams;
};
export function getUsernameValidationRules(isRequired: boolean): unknown {
  const baseRules = {
    minLength: minLength(5),
    checkUsernameWithRegexp,
  };

  if (isRequired) return { ...baseRules, required };

  return baseRules;
}

export function getPasswordValidationRules(isRequired: false): {
  minLength: ValidationRuleWithParams;
  checkPasswordWithRegexp: ValidationRuleWithParams;
};
export function getPasswordValidationRules(isRequired: true): {
  required: ValidationRuleWithoutParams;
  minLength: ValidationRuleWithParams;
  checkPasswordWithRegexp: ValidationRuleWithParams;
};
export function getPasswordValidationRules(isRequired: boolean): unknown {
  const baseRules = {
    minLength: minLength(5),
    checkPasswordWithRegexp,
  };

  if (isRequired) return { ...baseRules, required };

  return baseRules;
}

export function getEmailValidationRules(isRequired: false): {
  minLength: ValidationRuleWithParams;
  checkPasswordWithRegexp: ValidationRuleWithParams;
};
export function getEmailValidationRules(isRequired: true): {
  required: ValidationRuleWithoutParams;
  minLength: ValidationRuleWithParams;
  checkPasswordWithRegexp: ValidationRuleWithParams;
};
export function getEmailValidationRules(isRequired: boolean): unknown {
  const baseRules = {
    minLength: minLength(10),
    email,
  };

  if (isRequired) return { ...baseRules, required };

  return baseRules;
}

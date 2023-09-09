import { CreateUser, UpdateUser } from '@api';

export function transformValues(formData: CreateUser): UpdateUser {
  if (formData.password) return { ...formData };

  const { password, ...other } = formData;

  return other;
}

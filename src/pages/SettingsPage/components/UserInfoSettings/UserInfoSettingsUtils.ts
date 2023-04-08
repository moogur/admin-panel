import { UpdateAdminBody } from '@api';

export function prepareFormData(data: UpdateAdminBody): UpdateAdminBody {
  const preparedData: UpdateAdminBody = {
    username: data.username,
    email: data.email || null,
  };

  if (data.password) preparedData.password = data.password;

  return preparedData;
}

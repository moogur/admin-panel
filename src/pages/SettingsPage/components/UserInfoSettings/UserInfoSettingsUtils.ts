import { Admin, UpdateAdminBody } from '@api';

import { list } from './constants';

export function prepareFormData(data: UpdateAdminBody): UpdateAdminBody {
  const preparedData: UpdateAdminBody = {
    username: data.username,
    email: data.email || null,
  };

  if (data.password) preparedData.password = data.password;

  return preparedData;
}

export function getData(userValue: Admin | null, formValue?: Record<keyof UpdateAdminBody, string>) {
  return list.map((item) => {
    const value = item.key !== 'id' && formValue ? formValue[item.key] : userValue?.[item.key];

    return { title: item.title, value: value || '-' };
  });
}

import { GenderEnum, UserStatusEnum } from '@shared/types';

export const genderMessage = {
  [GenderEnum.Female]: 'Female',
  [GenderEnum.Male]: 'Male',
} as const;

export const userStatusMessage = {
  [UserStatusEnum.Active]: 'Active',
  [UserStatusEnum.Deleted]: 'Deleted',
  [UserStatusEnum.NotDefined]: 'Not defined',
} as const;

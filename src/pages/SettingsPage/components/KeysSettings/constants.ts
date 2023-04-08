import { SecretKeysEnum } from '@shared/types';
import { updateSecretThunk } from '@store';

export const list = [
  {
    title: 'User secret',
    action: () => updateSecretThunk(SecretKeysEnum.User),
  },
  {
    title: 'Admin secret',
    action: () => updateSecretThunk(SecretKeysEnum.Admin),
  },
  {
    title: 'Server secret',
    action: () => updateSecretThunk(SecretKeysEnum.Server),
  },
];

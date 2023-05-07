import { SecretKeysEnum } from '@shared/types';
import { updateSecretThunk } from '@store';

export const list = [
  {
    title: 'User',
    action: () => updateSecretThunk(SecretKeysEnum.User),
  },
  {
    title: 'Admin',
    action: () => updateSecretThunk(SecretKeysEnum.Admin),
  },
  {
    title: 'Server',
    action: () => updateSecretThunk(SecretKeysEnum.Server),
  },
] as const;

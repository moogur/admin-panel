import { VNode, h, Text } from 'vue';

import { Tag } from '@shared/components';
import { genderMessage, userStatusMessage } from '@shared/messages';
import { GenderEnum, UserStatusEnum } from '@shared/types';

export function convertStatusEnumToTag(value?: UserStatusEnum): VNode {
  switch (value) {
    case UserStatusEnum.Active: {
      return h(Tag, { variant: 'success' }, () => userStatusMessage[value]);
    }

    case UserStatusEnum.Deleted: {
      return h(Tag, { variant: 'danger' }, () => userStatusMessage[value]);
    }

    case UserStatusEnum.NotDefined: {
      return h(Tag, { variant: 'secondary' }, () => userStatusMessage[value]);
    }

    default: {
      return h(Text);
    }
  }
}

export function convertGenderEnumToTag(value?: GenderEnum): VNode {
  switch (value) {
    case GenderEnum.Female: {
      return h(Tag, { variant: 'primary' }, () => genderMessage[value]);
    }

    case GenderEnum.Male: {
      return h(Tag, { variant: 'info' }, () => genderMessage[value]);
    }

    default: {
      return h(Text);
    }
  }
}

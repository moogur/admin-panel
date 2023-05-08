import { NotificationType } from '../NotificationsTypes';

export const notificationMessages = {
  [NotificationType.Error]: {
    icon: 'error',
    class: 'error',
  },
  [NotificationType.Warning]: {
    icon: 'warning',
    class: 'warning',
  },
  [NotificationType.Info]: {
    icon: 'message',
    class: 'info',
  },
  [NotificationType.Success]: {
    icon: 'success',
    class: 'success',
  },
} as const;

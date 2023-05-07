import { NotificationType } from '../NotificationsTypes';

export const notificationMessages = {
  [NotificationType.Error]: {
    icon: 'error',
    actionTitle: 'Close',
    class: 'error',
  },
  [NotificationType.Warning]: {
    icon: 'warning',
    actionTitle: 'Close',
    class: 'warning',
  },
  [NotificationType.Info]: {
    icon: 'message',
    actionTitle: 'OK',
    class: 'info',
  },
  [NotificationType.Success]: {
    icon: 'success',
    actionTitle: 'OK',
    class: 'success',
  },
} as const;

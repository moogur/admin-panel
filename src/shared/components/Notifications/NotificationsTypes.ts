export const enum NotificationType {
  Info = 'info',
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
}

export interface Notification {
  type: NotificationType;
  title: string;
  message: string;
}

export interface NotificationWithId extends Notification {
  id: number;
}

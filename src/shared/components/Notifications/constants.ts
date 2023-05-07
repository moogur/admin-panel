import { reactive } from 'vue';

import { NotificationType, NotificationWithId } from './NotificationsTypes';

export const notifications = reactive<NotificationWithId[]>([]);

export const defaultNotification = {
  type: NotificationType.Info,
  title: '',
  message: '',
} as const;

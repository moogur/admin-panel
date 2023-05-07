import { v4 as uuidv4 } from 'uuid';

import { Notification } from './NotificationsTypes';
import { defaultNotification, notifications } from './constants';

export function createNotification(options: Partial<Notification>) {
  notifications.push(Object.assign({ id: uuidv4() }, defaultNotification, options));
}

export function removeNotifications(id: string) {
  const index = notifications.findIndex((item) => item.id === id);
  if (index !== -1) notifications.splice(index, 1);
}

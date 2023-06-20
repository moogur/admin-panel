import { Notification } from './NotificationsTypes';
import { defaultNotification, notifications } from './constants';

let counter = 0;

export function createNotification(options: Partial<Notification>) {
  notifications.push(Object.assign({ id: ++counter }, defaultNotification, options));
}

export function removeNotifications(id: number) {
  const index = notifications.findIndex((item) => item.id === id);
  if (index !== -1) notifications.splice(index, 1);
}

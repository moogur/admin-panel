import { HTTPError } from '@api/baseApi';
import { NotificationType } from '@shared/components/Notifications/NotificationsTypes';

import { createNotification } from '../components';

export function errorNotification(error?: HTTPError | null) {
  if (!error) return;
  // if (error) {
  //   const message = Object.entries(error.errors)
  //     .map(([key, value]) => `${key}: ${value.join(', ')}`)
  //     .join('; ');

  //   createNotification({ title: error?.response.statusText, message, type: NotificationType.Error });
  // } else {
  //   createNotification({ title: error?.response.statusText, type: NotificationType.Error });
  // }
  createNotification({ title: error?.response.statusText, type: NotificationType.Error });
}

export function successNotification(title: string, message?: string) {
  if (message) {
    createNotification({ title, message, type: NotificationType.Success });
  } else {
    createNotification({ title, type: NotificationType.Success });
  }
}

import { HTTPError } from '@api/baseApi';
import { NotificationType } from '@shared/components/Notifications/NotificationsTypes';

import { createNotification } from '../components';

function baseNotification(type: NotificationType, title: string, message?: string) {
  if (message) {
    createNotification({ title, message, type });
  } else {
    createNotification({ title, type });
  }
}

export function backErrorNotification(error?: HTTPError | null) {
  if (!error) return;
  // if (error) {
  //   const message = Object.entries(error.errors)
  //     .map(([key, value]) => `${key}: ${value.join(', ')}`)
  //     .join('; ');

  //   createNotification({ title: error?.response.statusText, message, type: NotificationType.Error });
  // } else {
  //   createNotification({ title: error?.response.statusText, type: NotificationType.Error });
  // }
  baseNotification(NotificationType.Error, error.response.statusText);
}

export function successNotification(title: string, message?: string) {
  baseNotification(NotificationType.Success, title, message);
}

export function errorNotification(title: string, message?: string) {
  baseNotification(NotificationType.Error, title, message);
}

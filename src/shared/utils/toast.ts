import { ApiError } from '@api/baseApi';
import { NotificationType } from '@shared/components/Notifications/NotificationsTypes';

import { createNotification } from '../components';

export function errorNotification(error?: ApiError | null) {
  if (!error) return;
  if (error.errors) {
    const message = Object.entries(error.errors)
      .map(([key, value]) => `${key}: ${value.join(', ')}`)
      .join('; ');

    createNotification({ title: error.message, message, type: NotificationType.Error });
  } else {
    createNotification({ title: error?.message, type: NotificationType.Error });
  }
}

export function successNotification(title: string, message?: string) {
  if (message) {
    createNotification({ title, message, type: NotificationType.Success });
  } else {
    createNotification({ title, type: NotificationType.Success });
  }
}

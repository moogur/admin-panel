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
    console.log(error?.statusCode, error?.message);
    createNotification({ title: error?.message, type: NotificationType.Error });
  }
}

import { defineComponent, onMounted, onUnmounted, ref } from 'vue';

import { SvgIcon } from '../../SvgIcon';
import { NotificationType } from '../NotificationsTypes';
import { removeNotifications } from '../NotificationsUtils';

import { notificationMessages } from './constants';

export default defineComponent({
  components: {
    SvgIcon,
  },
  props: {
    id: { type: String, required: true },
    type: { type: String as () => NotificationType, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
  },
  setup(properties) {
    const timeoutId = ref<NodeJS.Timeout>();

    onMounted(() => {
      timeoutId.value = setTimeout(() => removeNotifications(properties.id), 5 * 1000);
    });

    onUnmounted(() => clearTimeout(timeoutId.value));

    return {
      toastId: properties.id,
      toastTitle: properties.title,
      toastMessage: properties.message,
      removeNotifications,
      ...notificationMessages[properties.type],
    };
  },
});

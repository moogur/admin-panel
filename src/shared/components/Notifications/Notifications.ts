import { defineComponent } from 'vue';

import { Notification } from './Notification';
import { notifications } from './constants';

export default defineComponent({
  components: {
    Notification,
  },
  setup() {
    return {
      notifications,
    };
  },
});

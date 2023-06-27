import { storeToRefs } from 'pinia';
import { defineComponent, onUnmounted } from 'vue';

import { SvgIcon } from '@shared/components';
import { useGetAvatarStore } from '@store';

export default defineComponent({
  components: {
    SvgIcon,
  },
  setup() {
    const avatarStore = useGetAvatarStore();
    const { data } = storeToRefs(avatarStore);

    onUnmounted(avatarStore.$reset);

    return {
      data,
    };
  },
});

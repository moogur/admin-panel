import { defineComponent, onUnmounted } from 'vue';

import { useUpdateSecretStore } from '@store';

import { list } from './constants';

export default defineComponent({
  setup() {
    const updateSecretStore = useUpdateSecretStore();

    onUnmounted(() => {
      updateSecretStore.$reset();
    });

    return {
      list,
    };
  },
});

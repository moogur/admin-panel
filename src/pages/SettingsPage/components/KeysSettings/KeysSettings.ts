import { storeToRefs } from 'pinia';
import { defineComponent, onUnmounted } from 'vue';

import { CustomButton } from '@shared/components';
import { useUpdateSecretStore } from '@store';

import { list } from './constants';

export default defineComponent({
  components: {
    CustomButton,
  },
  setup() {
    const updateSecretStore = useUpdateSecretStore();
    const { loading } = storeToRefs(updateSecretStore);

    onUnmounted(() => {
      updateSecretStore.$reset();
    });

    return {
      list,
      loading,
    };
  },
});

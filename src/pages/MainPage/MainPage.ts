import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

import { useGetServicesVersionsStore } from '@store';

import { services } from './constants';

export default defineComponent({
  setup() {
    const getServicesVersionsStore = useGetServicesVersionsStore();
    const { data } = storeToRefs(getServicesVersionsStore);

    return {
      services,
      versions: data,
    };
  },
});

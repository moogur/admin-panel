import { defineComponent, onUnmounted } from 'vue';

import { SubPages } from '@shared/components';
import { useGetLanguageDictionaryStore } from '@store';

import { tabs } from './DictionariesPageConstants';

export default defineComponent({
  components: {
    SubPages,
  },
  setup() {
    const getLanguageDictionaryStore = useGetLanguageDictionaryStore();

    onUnmounted(() => {
      getLanguageDictionaryStore.$reset();
    });

    return {
      tabs,
    };
  },
});

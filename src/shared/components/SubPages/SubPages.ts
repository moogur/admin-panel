import { Ref, defineComponent, ref } from 'vue';

import { SubPage } from '@shared/types';

export default defineComponent({
  props: {
    pages: {
      required: true,
      type: Array<SubPage>,
    },
  },
  setup(properties) {
    const activeKeyItem: Ref<string | undefined> = ref(properties.pages[0]?.key);

    const changeActiveKey = (key: string) => {
      activeKeyItem.value = key;
    };

    return {
      activeKeyItem,
      changeActiveKey,
    };
  },
});

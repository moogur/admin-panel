import { Ref, defineComponent, ref } from 'vue';

import { Tab } from '@shared/types';

export default defineComponent({
  props: {
    data: {
      required: true,
      type: Array<Tab>,
    },
    type: {
      required: true,
      type: String as () => 'vertical' | 'horizontal',
    },
    prefix: {
      default: '',
      type: String,
    },
  },
  emits: ['change'],
  setup(properties, { emit }) {
    const activeKeyItem: Ref<string | undefined> = ref(properties.data[0]?.key);

    const changeActiveKey = (key: string) => {
      emit('change', key);
      activeKeyItem.value = key;
    };

    return {
      activeKeyItem,
      changeActiveKey,
    };
  },
});

import { Ref, defineComponent, ref } from 'vue';

import { KeysSettings, UserInfoSettings, IpsSettings } from './components';
import { tabs } from './constants';

export default defineComponent({
  components: {
    KeysSettings,
    UserInfoSettings,
    IpsSettings,
  },
  setup() {
    const activeKeyItem: Ref<'keys' | 'info'> = ref(tabs[0]?.key);

    const changeActiveKey = (key: typeof activeKeyItem.value) => {
      activeKeyItem.value = key;
    };

    return {
      tabs,
      activeKeyItem,
      changeActiveKey,
    };
  },
});

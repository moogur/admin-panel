import { defineComponent, ref } from 'vue';

import { KeysSettings, UserInfoSettings } from './components';
import { tabs } from './constants';

export default defineComponent({
  components: {
    KeysSettings,
    UserInfoSettings,
  },
  setup() {
    const activeKeyItem = ref(tabs[0]?.key);

    const changeActiveKey = (key: string) => {
      activeKeyItem.value = key;
    };

    return {
      tabs,
      activeKeyItem,
      changeActiveKey,
    };
  },
});

import { Ref, defineComponent, ref } from 'vue';

import { KeysSettings, UserInfoSettings } from './components';
import { tabs } from './constants';

export default defineComponent({
  components: {
    KeysSettings,
    UserInfoSettings,
  },
  setup() {
    const activeKeyItem: Ref<'keys' | 'userInfo'> = ref(tabs[0]?.key);

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

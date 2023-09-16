import { defineComponent } from 'vue';

import { Tabs } from '@shared/components';

import { tabs } from './DictionariesPageConstants';

export default defineComponent({
  components: {
    Tabs,
  },
  setup() {
    return {
      tabs,
    };
  },
});

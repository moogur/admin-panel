import { defineComponent } from 'vue';

import { Tabs } from '@shared/components';

import { tabs } from './constants';

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

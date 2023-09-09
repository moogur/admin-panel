import { defineComponent } from 'vue';

import { SubPages } from '@shared/components';

import { tabs } from './constants';

export default defineComponent({
  components: {
    SubPages,
  },
  setup() {
    return {
      tabs,
    };
  },
});

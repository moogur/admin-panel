import { defineComponent } from 'vue';

import { List } from '@shared/components';

import { services, swaggers } from './constants';

export default defineComponent({
  components: {
    List,
  },
  setup() {
    return {
      services,
      swaggers,
    };
  },
});

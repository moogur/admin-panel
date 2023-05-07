import { defineComponent } from 'vue';

import { links } from '@shared/constants';
import { adminLogoutThunk } from '@store';

import { SvgIcon } from '../SvgIcon';

export default defineComponent({
  components: {
    SvgIcon,
  },
  setup() {
    return {
      logout: adminLogoutThunk,
      links,
    };
  },
});

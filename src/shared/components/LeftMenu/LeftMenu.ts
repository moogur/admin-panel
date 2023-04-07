import { defineComponent } from 'vue';

import { links } from '@shared/constants';
import { adminLogoutThunk } from '@store';

import { HomeIcon, SettingsIcon, SignOutIcon } from '../Icons';

export default defineComponent({
  components: {
    HomeIcon,
    SettingsIcon,
    SignOutIcon,
  },
  setup() {
    return {
      logout: adminLogoutThunk,
      links,
    };
  },
});

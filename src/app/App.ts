import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, watch, ref } from 'vue';
import { useRoute } from 'vue-router';

import { LeftMenu, MainLoader, Notifications, Separator, Avatar } from '@shared/components';
import { useAuthStore, getAdminInfoThunk, requestsAfterLoginThunk } from '@store';

const checkLoginPage = (path: string) => !path.startsWith('/login');

export default defineComponent({
  components: {
    LeftMenu,
    MainLoader,
    Notifications,
    Separator,
    Avatar,
  },
  setup() {
    const route = useRoute();

    const authStore = useAuthStore();
    const { initialization, isAuth, user } = storeToRefs(authStore);
    const notLoginPage = ref(checkLoginPage(route.path));

    onMounted(async () => {
      if (isAuth.value) await Promise.allSettled([getAdminInfoThunk(), requestsAfterLoginThunk()]);
      authStore.setWasInitialized();
    });

    watch(route, () => {
      notLoginPage.value = checkLoginPage(route.path);
    });

    return {
      initialization,
      notLoginPage,
      user,
      isAuth,
      version: import.meta.env['VITE_VERSION'],
    };
  },
});

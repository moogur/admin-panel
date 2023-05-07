import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, watch, ref } from 'vue';
import { useRoute } from 'vue-router';

import { LeftMenu, MainLoader, Notifications } from '@shared/components';
import { useAuthStore, getAdminInfoThunk } from '@store';

const checkLoginPage = (path: string) => !path.startsWith('/login');

export default defineComponent({
  components: {
    LeftMenu,
    MainLoader,
    Notifications,
  },
  setup() {
    const route = useRoute();

    const authStore = useAuthStore();
    const { initialization, isAuth, user } = storeToRefs(authStore);
    const notLoginPage = ref(checkLoginPage(route.path));

    onMounted(async () => {
      if (isAuth.value) await getAdminInfoThunk();
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
    };
  },
});

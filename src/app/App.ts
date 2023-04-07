import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, watch, ref } from 'vue';
import { useRoute } from 'vue-router';

import { LeftMenu, MainLoader } from '@shared/components';
import { useAuthStore, getAdminInfoThunk, useGetAdminInfoStore } from '@store';

const checkLoginPage = (path: string) => !path.startsWith('/login');

export default defineComponent({
  components: {
    LeftMenu,
    MainLoader,
  },
  setup() {
    const { initialization, isAuth } = storeToRefs(useAuthStore());
    const { data } = storeToRefs(useGetAdminInfoStore());
    const { setWasInitialized } = useAuthStore();
    const route = useRoute();
    const notLoginPage = ref(checkLoginPage(route.path));

    onMounted(async () => {
      if (isAuth.value) await getAdminInfoThunk();
      setWasInitialized();
    });

    watch(route, () => {
      notLoginPage.value = checkLoginPage(route.path);
    });

    return {
      initialization,
      notLoginPage,
      currentDate: dayjs().year(),
      admin: data,
      isAuth,
    };
  },
});

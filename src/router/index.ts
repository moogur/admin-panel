import { createRouter, createWebHashHistory } from 'vue-router';

import { links } from '@shared/constants';
import { useAuthStore } from '@store/app';

const routes = Object.values(links).map(({ path, component }) => ({
  path,
  component: () => import(`../pages/${component}/${component}.vue`),
}));

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  const isLoginPage = links.login.path === to.path;
  const auth = useAuthStore();

  if (auth.isAuth) {
    if (isLoginPage) return links.main.path;
  } else {
    if (!isLoginPage) {
      auth.setRedirectUrl(to.fullPath);

      return links.login.path;
    }
  }

  return true;
});

export default router;

import { createRouter, createWebHashHistory } from 'vue-router';

import { useAuthStore } from '@store/app';

const routes = [
  {
    path: '/',
    component: () => import('../pages/MainPage/MainPage.vue'),
  },
  {
    path: '/login',
    component: () => import('../pages/LoginPage/LoginPage.vue'),
  },
  // {
  //   path: '/users',
  //   component: HelloWorld,
  // },
  // {
  //   path: '/settings',
  //   component: HelloWorld,
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const publicPage = '/login';
router.beforeEach((to) => {
  const isLoginPage = publicPage === to.path;
  const auth = useAuthStore();

  if (auth.isAuth) {
    if (isLoginPage) return '/';
  } else {
    if (!isLoginPage) {
      auth.setRedirectUrl(to.fullPath);

      return '/login';
    }
  }

  return true;
});

export default router;

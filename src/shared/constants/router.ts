export const links = {
  main: {
    path: '/',
    title: 'Main',
    component: 'MainPage',
    icon: 'home',
  },
  settings: {
    path: '/settings',
    title: 'Settings',
    component: 'SettingsPage',
    icon: 'settings',
  },
  logout: {
    path: '/login',
    title: 'Logout',
    component: 'LoginPage',
    icon: 'sign-out',
  },
} as const;

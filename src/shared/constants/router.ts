export const links = {
  main: {
    path: '/',
    title: 'Main',
    component: 'MainPage',
  },
  settings: {
    path: '/settings',
    title: 'Settings',
    component: 'SettingsPage',
  },
  logout: {
    path: '/login',
    title: 'Logout',
    component: 'LoginPage',
  },
} as const;

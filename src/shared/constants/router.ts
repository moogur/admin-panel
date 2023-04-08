export const links = {
  main: {
    path: '/',
    title: 'Main',
    component: 'MainPage',
    icon: 'HomeIcon',
  },
  settings: {
    path: '/settings',
    title: 'Settings',
    component: 'SettingsPage',
    icon: 'SettingsIcon',
  },
  logout: {
    path: '/login',
    title: 'Logout',
    component: 'LoginPage',
    icon: 'SignOutIcon',
  },
} as const;

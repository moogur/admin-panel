export const links = {
  main: {
    path: '/',
    title: 'Main',
    component: 'MainPage',
    icon: 'home',
  },
  users: {
    path: '/users',
    title: 'Users',
    component: 'UsersPage',
    icon: 'users',
  },
  dictionaries: {
    path: '/dictionaries',
    title: 'Dictionaries',
    component: 'DictionariesPage',
    icon: 'dictionaries',
  },
  translations: {
    path: '/translations',
    title: 'Translations',
    component: 'TranslationsPage',
    icon: 'language',
  },
  settings: {
    path: '/settings',
    title: 'Settings',
    component: 'SettingsPage',
    icon: 'settings',
  },
  login: {
    path: '/login',
    title: 'Logout',
    component: 'LoginPage',
    icon: 'sign-out',
  },
} as const;

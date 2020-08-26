import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Main',
    group: true,
  },
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Water Quality',
    icon: 'checkmark-square-outline',
    link: '/secure/water-quality/wqx-org',
  },
  {
    title: 'Reference Data',
    icon: 'link-2-outline',
    link: '/secure/ref-data',
  },
  {
    title: 'Administration',
    icon: 'settings-outline',
    link: '/secure/admin/users',
  },
  {
    title: 'My Account',
    icon: 'person-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'Help',
    icon: 'question-mark-circle-outline',
    link: '/pages/dashboard',
  },
];

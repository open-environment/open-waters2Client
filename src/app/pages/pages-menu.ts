import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Main',
    group: true,
  },
  {
    title: 'Home',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Water Quality',
    icon: 'shopping-cart-outline',
    link: '/secure/water-quality/wqx-org',
  },
  {
    title: 'Reference Data',
    icon: 'shopping-cart-outline',
    link: '/secure/ref-data',
  },
  {
    title: 'Administration',
    icon: 'shopping-cart-outline',
    link: '/secure/admin/users',
  },
  {
    title: 'My Account',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'Help',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
  },
];

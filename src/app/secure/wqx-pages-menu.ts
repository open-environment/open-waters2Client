import { NbMenuItem } from '@nebular/theme';

export const WQX_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Water Quality',
    icon: 'checkmark-square-outline',
    children: [
      {
        title: 'Organizations',
        link: '/secure/water-quality/wqx-org',
        icon: 'checkmark-outline',
      },
      {
        title: 'Monitoring Locs',
        link: '/secure/water-quality/wqx-monloc',
        icon: 'checkmark-outline',
      },
      {
        title: 'Projects',
        link: '/secure/water-quality/wqx-project',
        icon: 'checkmark-outline',
      },
      {
        title: 'Activity/Result',
        link: '/secure/water-quality/wqx-activity',
        icon: 'checkmark-outline',
      },
      {
        title: 'Import Data',
        link: '/secure/water-quality/wqx-import',
        icon: 'checkmark-outline',
      },
      {
        title: 'Retrieve From EPA',
        link: '/secure/water-quality/wqx-import-from-epa',
        icon: 'checkmark-outline',
      },
      {
        title: 'WQX History',
        link: '/secure/water-quality/wqx-mgmt',
        icon: 'checkmark-outline',
      },
    ],
  },
  {
    title: 'Data Analysis',
    icon: 'grid-outline',
    children: [
      {
        title: 'Assessment Rpts',
        link: '/secure/data-analysis/wqx-assesment-rpts',
      },
      {
        title: 'Map',
        link: '/secure/data-analysis/wqx-maps',
      },
      {
        title: 'Graphs',
        link: '/secure/data-analysis/wqx-charting',
      },
    ],
  },
  {
    title: 'Ref-Data',
    icon: 'link-2-outline',
    link: '/secure/ref-data',
    home: true,
  },
  {
    title: 'Administration',
    icon: 'settings-outline',
    children: [
      {
        title: 'User Management',
        link: '/secure/admin/users',
      },
      {
        title: 'Role Management',
        link: '/secure/admin/roles',
      },
      {
        title: 'App Settings',
        link: '/secure/admin/app-settings',
      },
      {
        title: 'Data Synch',
        link: '/secure/admin/data-synch',
      },
    ],
  },
];

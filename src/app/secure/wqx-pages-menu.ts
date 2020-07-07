import { NbMenuItem } from '@nebular/theme';

export const WQX_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Water Quality',
    icon: 'grid-outline',
    children: [
      {
        title: 'Organizations',
        link: '/secure/water-quality/wqx-org',
      },
      {
        title: 'Monitoring Locs',
        link: '/secure/water-quality/wqx-monloc',
      },
      {
        title: 'Projects',
        link: '/secure/water-quality/wqx-project',
      },
      {
        title: 'Activity/Result',
        link: '/secure/water-quality/wqx-activity',
      },
      {
        title: 'Import Data',
        link: '/secure/water-quality/wqx-import',
      },
      {
        title: 'Retrieve From EPA',
        link: '/secure/water-quality/wqx-import-from-epa',
      },
      {
        title: 'WQX History',
        link: '/secure/water-quality/wqx-mgmt',
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
];

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'My Ecommerce',
  description:
    'Best ecommerce platform for your business needs with a modern design and easy to use.',
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'About Us',
      href: '/about',
    },
    {
      label: 'Policy',
      href: '/policy',
    },
    {
      label: 'My Shop',
      href: '/my-shop',
    },
  ],
  navMenuItems: [
    {
      label: 'Profile',
      href: '/profile',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Team',
      href: '/team',
    },
    {
      label: 'Calendar',
      href: '/calendar',
    },
    {
      label: 'Settings',
      href: '/settings',
    },
    {
      label: 'Help & Feedback',
      href: '/help-feedback',
    },
    {
      label: 'Logout',
      href: '/logout',
    },
  ],
  links: {
    github: 'https://github.com/nextui-org/nextui',
    twitter: 'https://twitter.com/getnextui',
    docs: 'https://nextui.org',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
  },
};

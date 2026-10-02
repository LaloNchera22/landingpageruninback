// Single source of truth for site-wide settings. When the dashboard is ready,
// set APP_URL and the "Notify me" CTA switches to real links.
export const SITE = {
  name: 'Runinback',
  url: 'https://runinback.com',
  email: 'support@runinback.com',
  appUrl: null,
  locale: 'en_US',
};

export const isAppLive = () => Boolean(SITE.appUrl);

// Single source of truth for site-wide settings. When the dashboard is ready,
// set APP_URL and the "Próximamente" CTAs switch to real links.
export const SITE = {
  name: 'Runinback',
  url: 'https://runinback.com',
  email: 'support@runinback.com',
  appUrl: null,
  locale: 'es_MX',
};

export const isAppLive = () => Boolean(SITE.appUrl);

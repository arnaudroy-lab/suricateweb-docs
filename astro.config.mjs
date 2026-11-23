// Documentation en ligne de SuricateWeb : Astro Starlight, français à la racine (langue par défaut) et anglais sous /en/.
// Les pages ont le MÊME chemin dans les deux langues (src/content/docs/<page>.md et src/content/docs/en/<page>.md) : le menu, le sélecteur de
// langue et le test `npm run check` s'appuient dessus.
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  // Adresse publique, pour les liens canoniques, le plan du site et les alternatives hreflang. `SITE_URL` la change au build (aperçus, tests).
  site: process.env.SITE_URL || 'https://docs.suricateweb.fr',
  integrations: [
    starlight({
      title: { fr: 'Documentation SuricateWeb', en: 'SuricateWeb documentation' },
      description: 'Surveillez vos sites web : défiguration, piratage, domaine, disponibilité, WordPress et PrestaShop.',
      logo: { src: './src/assets/logo.png', alt: '' },
      favicon: '/favicon.png',
      defaultLocale: 'root',
      locales: {
        root: { label: 'Français', lang: 'fr' },
        en: { label: 'English', lang: 'en' },
      },
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/arnaudroy-lab/suricateweb' }],
      editLink: { baseUrl: 'https://github.com/arnaudroy-lab/suricateweb-docs/edit/main/' },
      customCss: ['./src/styles/theme.css'],
      sidebar: [
        'get-started',
        { label: 'Alertes', translations: { en: 'Alerts' }, items: ['alerts/telegram', 'alerts/slack'] },
        { label: 'Surveillance', translations: { en: 'Monitoring' }, items: ['monitoring/what-is-monitored', 'monitoring/screenshots'] },
        { label: 'WordPress et PrestaShop', translations: { en: 'WordPress and PrestaShop' }, items: ['cms/install', 'cms/dashboard-widget', 'cms/security', 'cms/health-and-hardening', 'cms/activity-log'] },
        'self-hosting',
        'faq',
      ],
    }),
  ],
});

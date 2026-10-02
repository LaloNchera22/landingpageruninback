import '../styles/base.css';
import { mount } from './mount.jsx';
import LegalLayout from './LegalLayout.jsx';
import { CONSENT_KEY } from '../lib/consent.js';
import { SITE } from '../lib/site.js';

const mail = <a href={`mailto:${SITE.email}`}>{SITE.email}</a>;

const sections = [
  {
    id: 'controller',
    title: 'Data controller',
    body: (
      <>
        <p>
          {SITE.name} (&ldquo;we&rdquo; or &ldquo;us&rdquo;) is a video game tournament platform
          that has not launched yet. The controller responsible for your personal data is{' '}
          <strong>[controller&rsquo;s legal name]</strong>, with its address at{' '}
          <strong>[full address]</strong>.
        </p>
        <p>
          This Privacy Policy explains what data we process through this website ({SITE.url}),
          why, and what rights you have. It is issued under Mexico&rsquo;s Federal Law on the
          Protection of Personal Data Held by Private Parties (LFPDPPP) and, where applicable, the
          European Union&rsquo;s General Data Protection Regulation (GDPR).
        </p>
      </>
    ),
  },
  {
    id: 'data',
    title: 'Data we collect today',
    body: (
      <>
        <p>
          This site is a landing page: <strong>it has no sign-up, sign-in, forms or
          payments</strong>. As a result, we process very little data:
        </p>
        <ul>
          <li>
            <strong>Server logs.</strong> Like any website, our hosting provider automatically
            records data about each request: IP address, date and time, page requested, browser
            and operating system. These logs are used to serve the site and protect it from abuse.
          </li>
          <li>
            <strong>Your cookie preference.</strong> Stored only in your browser
            (<code>{CONSENT_KEY}</code>) and never sent to us. See our{' '}
            <a href="/cookies.html">Cookie Policy</a> for details.
          </li>
          <li>
            <strong>Messages you send us.</strong> If you email us, we process your email address,
            your name if you include it, and the content of your message.
          </li>
        </ul>
        <p>
          We do not use analytics or advertising tools, and we do not collect sensitive personal
          data or financial data.
        </p>
      </>
    ),
  },
  {
    id: 'purposes',
    title: 'How we use it',
    body: (
      <>
        <h3>Primary purposes</h3>
        <ul>
          <li>Displaying the website and keeping it available and secure.</li>
          <li>Responding to the messages and requests you send us.</li>
          <li>Remembering your cookie choice.</li>
          <li>Complying with legal obligations and requests from authorities.</li>
        </ul>
        <h3>Secondary purposes</h3>
        <p>
          If you expressly ask us to, we may email you when {SITE.name} launches. You can decline
          or withdraw your consent at any time by writing to {mail}; doing so does not affect the
          primary purposes.
        </p>
      </>
    ),
  },
  {
    id: 'legal-bases',
    title: 'Legal bases',
    body: (
      <p>
        We process your data based on our legitimate interest in operating and protecting the site
        (server logs), on your request when you contact us, on your consent for any optional
        cookies or update emails, and on compliance with legal obligations. You may withdraw your
        consent at any time, without retroactive effect.
      </p>
    ),
  },
  {
    id: 'sharing',
    title: 'Who we share it with',
    body: (
      <>
        <p>
          <strong>We do not sell or rent your data.</strong> We only share it with service
          providers that process it on our behalf (processors), under contract and for the purposes
          described above:
        </p>
        <ul>
          <li>Hosting and content delivery: <strong>[hosting provider]</strong>.</li>
          <li>Email: <strong>[email provider]</strong>.</li>
        </ul>
        <p>
          We may also disclose data when required by law or by a competent authority. Under the
          LFPDPPP, these disclosures do not require your consent.
        </p>
      </>
    ),
  },
  {
    id: 'international',
    title: 'International transfers',
    body: (
      <p>
        Our providers may process data outside Mexico or outside the country where you live. When
        that happens, we will seek to ensure appropriate safeguards are in place, such as standard
        contractual clauses or equivalent mechanisms: <strong>[transfer mechanism]</strong>.
      </p>
    ),
  },
  {
    id: 'retention',
    title: 'Retention',
    body: (
      <ul>
        <li>Server logs: up to <strong>[30] days</strong>, unless needed to investigate an incident.</li>
        <li>Emails you send us: while we handle your request and for up to <strong>[12] months</strong> afterward.</li>
        <li>Cookie preference: in your browser, until you clear it.</li>
      </ul>
    ),
  },
  {
    id: 'security',
    title: 'Security',
    body: (
      <p>
        We apply reasonable technical and organizational measures to protect your data, such as
        encrypted connections (HTTPS) and restricted access to logs. No system is completely
        secure; if a breach occurs that significantly affects your rights, we will notify you as
        required by applicable law.
      </p>
    ),
  },
  {
    id: 'rights',
    title: 'Your rights',
    body: (
      <>
        <h3>ARCO rights (Mexico)</h3>
        <p>
          Under the LFPDPPP you may exercise your ARCO rights at any time. ARCO stands for Access,
          Rectification, Cancellation and Opposition:
        </p>
        <ul>
          <li><strong>Access</strong>: know what data we hold about you and how we process it.</li>
          <li><strong>Rectification</strong>: correct it if it is inaccurate or incomplete.</li>
          <li><strong>Cancellation</strong>: ask us to delete it when it is no longer needed.</li>
          <li><strong>Opposition</strong>: object to its processing for specific purposes.</li>
        </ul>
        <p>
          You may also withdraw your consent and limit the use or disclosure of your data.
        </p>
        <h3>If you live in the European Economic Area or the United Kingdom</h3>
        <p>
          In addition to the above, you have the right to restrict processing, to data
          portability, and to lodge a complaint with the data protection authority in your country.
        </p>
      </>
    ),
  },
  {
    id: 'exercise',
    title: 'How to exercise them',
    body: (
      <>
        <p>Send your request to {mail}, including:</p>
        <ol>
          <li>Your name and an email address where we can reply.</li>
          <li>A document proving your identity or, if applicable, that of your representative.</li>
          <li>Which right you want to exercise and over which data.</li>
          <li>Any information that will help us locate the data.</li>
        </ol>
        <p>
          We will respond within <strong>20 business days</strong> at most and, if your request is
          granted, carry it out within the following 15 business days, as provided by the LFPDPPP.
          Exercising these rights is free of charge. If you are not satisfied with our response,
          you may contact the competent data protection authority.
        </p>
      </>
    ),
  },
  {
    id: 'minors',
    title: 'Minors',
    body: (
      <p>
        {SITE.name} will be intended for people 18 and older. We do not knowingly collect data from
        minors. If you believe a minor has sent us data, contact us and we will delete it.
      </p>
    ),
  },
  {
    id: 'launch',
    title: 'When the platform launches',
    body: (
      <p>
        Once {SITE.name} launches there will be accounts, tournaments and, eventually, payments,
        which will involve processing more data (for example, username, email, match results and
        appeals). Before collecting it, we will publish an updated version of this policy
        describing it in detail, and we will show it to you when you create your account.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        We may update this Privacy Policy. We will publish the new version on this page with its
        &ldquo;Last updated&rdquo; date and, if the changes are material, we will announce them
        prominently on the site.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    body: (
      <p>
        For any privacy question or to exercise your rights, write to {mail} or to{' '}
        <strong>[personal data officer / department and address]</strong>.
      </p>
    ),
  },
];

function PrivacyPage() {
  return (
    <LegalLayout
      current="privacy"
      title="Privacy Policy"
      lead="What data we process, why, and how you can exercise your rights."
      sections={sections}
    />
  );
}

mount(PrivacyPage);

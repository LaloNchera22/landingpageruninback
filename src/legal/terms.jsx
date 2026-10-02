import '../styles/base.css';
import { mount } from './mount.jsx';
import LegalLayout from './LegalLayout.jsx';
import { SITE } from '../lib/site.js';

const mail = <a href={`mailto:${SITE.email}`}>{SITE.email}</a>;

const sections = [
  {
    id: 'acceptance',
    title: 'Acceptance',
    body: (
      <>
        <p>
          These Terms of Service (the &ldquo;Terms&rdquo;) govern your access to and use of the
          website {SITE.url} (the &ldquo;Site&rdquo;), operated by{' '}
          <strong>[legal entity name]</strong> (&ldquo;{SITE.name}&rdquo;, &ldquo;we&rdquo; or
          &ldquo;us&rdquo;). By using the Site, you agree to these Terms, our{' '}
          <a href="/privacy.html">Privacy Policy</a> and our{' '}
          <a href="/cookies.html">Cookie Policy</a>. If you do not agree, do not use the Site.
        </p>
      </>
    ),
  },
  {
    id: 'pre-launch',
    title: 'Current status: pre-launch',
    body: (
      <>
        <p>
          {SITE.name} <strong>has not launched yet</strong>. Today the Site only presents the
          project: you cannot create an account, join tournaments, pay entry fees or collect
          prizes.
        </p>
        <p>
          The description of tournaments on the Site and in Section 4 is for information only and
          may change before launch. Once we launch, use of the platform will be governed by an
          updated version of these Terms that you will need to accept when you create your account.
        </p>
      </>
    ),
  },
  {
    id: 'eligibility',
    title: 'Eligibility',
    body: (
      <p>
        The platform will be intended for people <strong>18 or older</strong>, or the age of
        majority in their country if higher. Each person will be responsible for confirming that
        taking part in skill-based competitions is legal where they live. We may restrict access in
        countries or regions where the service is not permitted.
      </p>
    ),
  },
  {
    id: 'tournaments',
    title: 'How tournaments will work',
    body: (
      <>
        <p>A summary of how we expect things to work, subject to change before launch:</p>
        <ul>
          <li>
            <strong>Format.</strong> Single-elimination 1v1 tournaments for 4 to 32 players. The
            winner advances; the loser is out.
          </li>
          <li>
            <strong>Host.</strong> Anyone with an account will be able to create a tournament and
            share it with a link. Each tournament will be either public (visible on the platform)
            or private (link only).
          </li>
          <li>
            <strong>Rulings.</strong> The host decides the result of each match based on the
            available evidence and agrees to act in good faith, without favoring anyone or playing
            in their own tournament.
          </li>
          <li>
            <strong>Appeals.</strong> Once a tournament ends, any player may file an appeal within
            the following <strong>24 hours</strong>. Every appeal is reviewed by a person on our
            team, not by an automated system.
          </li>
          <li>
            <strong>Prize pool.</strong> In tournaments with an entry fee, the pool will be split
            as follows: <strong>85%</strong> to the champion, <strong>5%</strong> to the host and{' '}
            <strong>10%</strong> to {SITE.name}. Payouts will be made once the appeal window closes
            or the appeal is resolved.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'no-real-money',
    title: 'No real money for now',
    body: (
      <p>
        No real-money entry fees will be accepted and no real-money prizes will be paid until the
        required legal review has been completed in each country where we operate. Any pre-launch
        test mode will use simulated balances with no monetary value that cannot be exchanged for
        money.
      </p>
    ),
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable use',
    body: (
      <>
        <p>When using the Site, and in the future the platform, you agree not to:</p>
        <ul>
          <li>Use it for unlawful purposes or in violation of these Terms.</li>
          <li>
            Cheat, collude with other players, use unauthorized software or manipulate results.
          </li>
          <li>Use multiple accounts, impersonate another person or let someone else play for you.</li>
          <li>Attempt to gain unauthorized access to our systems or interfere with their operation.</li>
          <li>Copy, scrape or reverse engineer the Site, except as permitted by law.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'third-party',
    title: 'Third-party games and services',
    body: (
      <p>
        {SITE.name} is an independent platform. It is not affiliated with, sponsored or endorsed by
        the developers or publishers of the games played on it. The names, trademarks and content
        of those games belong to their respective owners, and their rules and terms of use continue
        to apply to each player.
      </p>
    ),
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual property',
    body: (
      <p>
        The Site, its design, logos, text and software belong to {SITE.name} or its licensors and
        are protected by intellectual property laws. You may view it for personal, non-commercial
        use. Open-source components remain subject to their own licenses.
      </p>
    ),
  },
  {
    id: 'warranties',
    title: 'Disclaimer of warranties',
    body: (
      <p>
        The Site is provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; We do not
        guarantee that it will operate without interruptions or errors, or that information about
        the launch, features or dates will remain unchanged.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    body: (
      <p>
        To the fullest extent permitted by law, {SITE.name} will not be liable for any indirect,
        incidental or consequential damages arising from your use of the Site. Nothing in these
        Terms limits any rights you may have under applicable consumer protection laws.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to these Terms',
    body: (
      <p>
        We may update these Terms, particularly when the platform launches. We will publish the
        new version on this page with its &ldquo;Last updated&rdquo; date. If you continue to use
        the Site after a change, you accept the version then in effect.
      </p>
    ),
  },
  {
    id: 'governing-law',
    title: 'Governing law',
    body: (
      <p>
        These Terms are governed by the laws of <strong>[the United Mexican States]</strong>. Any
        dispute will be submitted to <strong>[competent courts / dispute resolution
        mechanism]</strong>, without prejudice to any rights you may have as a consumer.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    body: (
      <p>
        For questions about these Terms, write to {mail} or to{' '}
        <strong>[legal entity name and address]</strong>.
      </p>
    ),
  },
];

function TermsPage() {
  return (
    <LegalLayout
      current="terms"
      title="Terms of Service"
      lead="The rules for using this site and how tournaments will work once we launch."
      sections={sections}
    />
  );
}

mount(TermsPage);

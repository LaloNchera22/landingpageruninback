import '../styles/base.css';
import { mount } from './mount.jsx';
import LegalLayout from './LegalLayout.jsx';
import { CONSENT_KEY, openCookiePreferences } from '../lib/consent.js';
import { SITE } from '../lib/site.js';

const sections = [
  {
    id: 'what-are-cookies',
    title: 'What cookies are',
    body: (
      <>
        <p>
          Cookies are small text files that a website stores on your device. Similar
          technologies, such as your browser&rsquo;s <strong>local storage</strong>{' '}
          (<code>localStorage</code>), work in much the same way: they let a site remember your
          preferences between visits. In this policy, &ldquo;cookies&rdquo; refers to all of them.
        </p>
      </>
    ),
  },
  {
    id: 'how-we-use',
    title: 'How we use them',
    body: (
      <>
        <p>
          {SITE.name} has not launched yet: this site is a landing page with no accounts, no
          sign-in and no payments. That is why we keep our use of cookies to a minimum.
        </p>
        <p>
          <strong>Today we only use strictly necessary storage</strong>: the entry that saves your
          cookie choice. We do not use analytics, advertising or social media cookies, and we do
          not share information about your browsing with third parties.
        </p>
      </>
    ),
  },
  {
    id: 'types',
    title: 'Types we use',
    body: (
      <>
        <h3>Necessary · always on</h3>
        <div className="lg-table-wrap">
          <table className="lg-table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Purpose</th>
                <th scope="col">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>{CONSENT_KEY}</code></td>
                <td>localStorage</td>
                <td>
                  Remembers whether you accepted or rejected the optional categories, so we
                  don&rsquo;t ask you on every visit. It contains no data that identifies you.
                </td>
                <td>Until you clear it</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Optional · only with your consent</h3>
        <div className="lg-table-wrap">
          <table className="lg-table">
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Status</th>
                <th scope="col">What they would be for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Analytics</td>
                <td><span className="lg-tag lg-tag--off">Not used</span></td>
                <td>
                  Measuring, in aggregate, which sections get visited so we can improve the site.
                </td>
              </tr>
              <tr>
                <td>Marketing</td>
                <td><span className="lg-tag lg-tag--off">Not used</span></td>
                <td>Measuring campaigns or showing relevant ads.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          If we ever add a tool in one of these categories, it will only load
          <strong> after</strong> you accept it, and before turning it on we will update this table
          with the provider&rsquo;s name, the cookies it sets and how long they last.
        </p>
      </>
    ),
  },
  {
    id: 'third-party',
    title: 'Third-party cookies',
    body: (
      <p>
        We currently do not embed any third-party content that sets cookies (videos, maps, social
        media buttons or tracking pixels). Our hosting provider may record technical data about
        each visit in its server logs; this is explained in our{' '}
        <a href="/privacy.html">Privacy Policy</a>.
      </p>
    ),
  },
  {
    id: 'manage',
    title: 'How to manage your choice',
    body: (
      <>
        <p>
          On your first visit you will see a notice with three equally weighted options:{' '}
          <strong>Reject</strong>, <strong>Settings</strong> and <strong>Accept</strong>.
          Rejecting is as easy as accepting, and you can change your mind at any time:
        </p>
        <button type="button" className="lg-inline-btn" onClick={openCookiePreferences}>
          [ Cookie settings ]
        </button>
        <ul>
          <li>From the &ldquo;Cookie settings&rdquo; link in the footer of every page.</li>
          <li>
            By clearing this site&rsquo;s data in your browser: the notice will appear again on
            your next visit.
          </li>
          <li>
            By blocking cookies and storage in your browser settings. If you block the necessary
            storage, the site will keep working, but we will ask you again on every visit.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        We will update this policy whenever our use of cookies changes (for example, when the
        platform launches or if we add analytics) and revise the &ldquo;Last updated&rdquo; date.
        If the changes affect optional categories, we will ask for your consent again.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    body: (
      <p>
        If you have questions about cookies, email us at{' '}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. To learn how we handle personal data in
        general, see our <a href="/privacy.html">Privacy Policy</a>.
      </p>
    ),
  },
];

function CookiesPage() {
  return (
    <LegalLayout
      current="cookies"
      title="Cookie Policy"
      lead="What we store in your browser, why, and how to change your choice."
      sections={sections}
    />
  );
}

mount(CookiesPage);

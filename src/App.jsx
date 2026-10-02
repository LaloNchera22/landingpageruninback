import { useEffect } from 'react';
import { startSmoothScroll, stopSmoothScroll } from './lib/motion';
import { CookieBanner } from './components/cookies';
import Hero from './sections/hero/Hero';
import Marquee from './sections/Marquee';
import Manifesto from './sections/Manifesto';
import Process from './sections/Process';
import LiveBracket from './sections/LiveBracket';
import Roles from './sections/Roles';
import Prizes from './sections/Prizes';
import FairPlay from './sections/FairPlay';
import Faq from './sections/Faq';
import Cta from './sections/Cta';
import Footer from './sections/Footer';
import './bits/bits.css';
import './sections/sections.css';

export default function App() {
  useEffect(() => {
    startSmoothScroll();
    return stopSmoothScroll;
  }, []);

  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <main id="content">
        <Hero />
        <Marquee />
        <Manifesto />
        <Process />
        <LiveBracket />
        <Roles />
        <Prizes />
        <FairPlay />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}

import { useState } from 'react';
import { FAQ } from '../content/faq';
import SplitText from '../bits/SplitText';
import SectionLabel from './SectionLabel';

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      <SectionLabel n="07">Preguntas frecuentes</SectionLabel>
      <div className="faq-grid">
        <SplitText as="h2" id="faq-title" className="h2" type="words" stagger={0.05}>
          Lo que más nos preguntan.
        </SplitText>
        <div className="faq-list">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className={`faq-item${isOpen ? ' is-open' : ''}`} key={item.q}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    id={`faq-q-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="faq-n">{String(i + 1).padStart(2, '0')}</span>
                    <span className="faq-q">{item.q}</span>
                    <span className="faq-icon" aria-hidden="true" />
                  </button>
                </h3>
                <div className="faq-a" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                  <div><p>{item.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

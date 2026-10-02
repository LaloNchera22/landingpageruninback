import DecryptedText from '../bits/DecryptedText';
import SplitText from '../bits/SplitText';
import SectionLabel from './SectionLabel';

const RULES = [
  { t: 'El anfitrión no juega', d: 'Quien decide las partidas no puede inscribirse en su propio torneo.' },
  { t: 'Las apelaciones las revisa una persona', d: 'Nuestro equipo revisa el chat y las capturas. Si la decisión fue incorrecta, el premio y la comisión pasan al ganador correcto.' },
  { t: 'Las decisiones rápidas se revisan', d: 'Ganar por no presentación exige 10 minutos de espera y un motivo. Los patrones sospechosos se marcan para revisión.' },
  { t: 'Sales sin perder nada', d: 'Antes de que arranque el bracket puedes salir con reembolso completo. Si el torneo se cancela, todos recuperan su inscripción.' },
];

export default function FairPlay() {
  return (
    <section className="fair" aria-labelledby="fair-title">
      <SectionLabel n="06">Juego limpio</SectionLabel>
      <SplitText as="h2" id="fair-title" className="h2" type="words" stagger={0.05}>
        Los anfitriones deciden. Las personas revisan.
      </SplitText>
      <ol className="fair-list">
        {RULES.map((r, i) => (
          <li key={r.t}>
            <span className="fair-n">{String(i + 1).padStart(2, '0')}</span>
            <DecryptedText as="h3" text={r.t} className="fair-t" />
            <p>{r.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

import '../styles/base.css';
import { mount } from './mount.jsx';
import LegalLayout from './LegalLayout.jsx';
import { SITE } from '../lib/site.js';

const mail = <a href={`mailto:${SITE.email}`}>{SITE.email}</a>;

const sections = [
  {
    id: 'aceptacion',
    title: 'Aceptación',
    body: (
      <>
        <p>
          Estos Términos y condiciones («Términos») regulan el acceso y uso del sitio web{' '}
          {SITE.url} (el «Sitio»), operado por <strong>[razón social]</strong> («{SITE.name}»,
          «nosotros»). Al usar el Sitio aceptas estos Términos, el{' '}
          <a href="/privacidad.html">Aviso de privacidad</a> y la{' '}
          <a href="/cookies.html">Política de cookies</a>. Si no estás de acuerdo, no uses el Sitio.
        </p>
      </>
    ),
  },
  {
    id: 'prelanzamiento',
    title: 'Estado actual: prelanzamiento',
    body: (
      <>
        <p>
          {SITE.name} <strong>todavía no está abierto</strong>. Hoy el Sitio solo presenta el
          proyecto: no permite crear cuentas, inscribirse en torneos, pagar ni cobrar premios.
        </p>
        <p>
          La descripción de los torneos que aparece en el Sitio y en la sección 4 es informativa y
          puede cambiar antes del lanzamiento. Cuando abramos, el uso de la plataforma se regirá por
          una versión actualizada de estos Términos que tendrás que aceptar al crear tu cuenta.
        </p>
      </>
    ),
  },
  {
    id: 'elegibilidad',
    title: 'Elegibilidad',
    body: (
      <p>
        La plataforma estará dirigida a personas de <strong>18 años o más</strong>, o de la mayoría
        de edad en su país si es mayor. Cada persona será responsable de comprobar que participar en
        competencias de habilidad sea legal donde vive. Podremos limitar el acceso en los países o
        regiones donde el servicio no esté permitido.
      </p>
    ),
  },
  {
    id: 'torneos',
    title: 'Cómo funcionarán los torneos',
    body: (
      <>
        <p>Resumen del funcionamiento previsto, sujeto a cambios antes del lanzamiento:</p>
        <ul>
          <li>
            <strong>Formato.</strong> Torneos 1 contra 1 de eliminación directa, de 4 a 32
            jugadores. Quien gana avanza; quien pierde queda fuera.
          </li>
          <li>
            <strong>Anfitrión.</strong> Cualquier persona con cuenta podrá crear un torneo y
            compartirlo con un enlace. Cada torneo será público (visible en la plataforma) o
            privado (solo con el enlace).
          </li>
          <li>
            <strong>Decisiones.</strong> El anfitrión decide el resultado de cada partida con la
            evidencia disponible y se compromete a actuar de buena fe, sin favorecer a nadie ni
            participar en su propio torneo.
          </li>
          <li>
            <strong>Apelaciones.</strong> Al terminar el torneo, cualquier jugador podrá apelar
            dentro de las <strong>24 horas</strong> siguientes. Cada apelación la revisa una
            persona de nuestro equipo, no un sistema automático.
          </li>
          <li>
            <strong>Bolsa de premios.</strong> En torneos con inscripción, la bolsa se repartirá
            así: <strong>85%</strong> para el campeón, <strong>5%</strong> para el anfitrión y{' '}
            <strong>10%</strong> para {SITE.name}. El pago se hará cuando cierre el plazo de
            apelación o se resuelva la apelación.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'dinero',
    title: 'Sin dinero real por ahora',
    body: (
      <p>
        No se aceptarán inscripciones ni se pagarán premios con dinero real hasta completar la
        revisión legal correspondiente en cada país donde operemos. Cualquier modo de prueba previo
        al lanzamiento usará saldos simulados sin valor económico, que no se pueden canjear por
        dinero.
      </p>
    ),
  },
  {
    id: 'uso',
    title: 'Uso aceptable',
    body: (
      <>
        <p>Al usar el Sitio, y en el futuro la plataforma, te comprometes a no:</p>
        <ul>
          <li>Usarlo con fines ilegales o contrarios a estos Términos.</li>
          <li>
            Hacer trampa, coludirte con otros jugadores, usar software no autorizado o manipular
            resultados.
          </li>
          <li>Usar varias cuentas, suplantar a otra persona o dejar que alguien juegue por ti.</li>
          <li>Intentar acceder sin autorización a nuestros sistemas o interferir con su funcionamiento.</li>
          <li>Copiar, extraer de forma masiva o hacer ingeniería inversa del Sitio, salvo que la ley lo permita.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'terceros',
    title: 'Videojuegos y servicios de terceros',
    body: (
      <p>
        {SITE.name} es una plataforma independiente. No está afiliada, patrocinada ni respaldada por
        los desarrolladores o editores de los videojuegos que se jueguen en ella. Los nombres,
        marcas y contenidos de esos juegos pertenecen a sus respectivos titulares, y sus reglas y
        términos de uso siguen aplicando a cada jugador.
      </p>
    ),
  },
  {
    id: 'propiedad',
    title: 'Propiedad intelectual',
    body: (
      <p>
        El Sitio, su diseño, logotipos, textos y software pertenecen a {SITE.name} o a sus
        licenciantes y están protegidos por las leyes de propiedad intelectual. Puedes consultarlo
        para uso personal y no comercial. Los componentes de código abierto conservan sus propias
        licencias.
      </p>
    ),
  },
  {
    id: 'garantias',
    title: 'Exención de garantías',
    body: (
      <p>
        El Sitio se ofrece «tal cual» y «según disponibilidad». No garantizamos que funcione sin
        interrupciones o errores, ni que la información sobre el lanzamiento, las funciones o las
        fechas se mantenga sin cambios.
      </p>
    ),
  },
  {
    id: 'responsabilidad',
    title: 'Limitación de responsabilidad',
    body: (
      <p>
        En la medida máxima permitida por la ley, {SITE.name} no será responsable de daños
        indirectos, incidentales o consecuentes derivados del uso del Sitio. Nada en estos Términos
        limita los derechos que te reconozcan las leyes de protección al consumidor aplicables.
      </p>
    ),
  },
  {
    id: 'cambios',
    title: 'Cambios a estos Términos',
    body: (
      <p>
        Podemos actualizar estos Términos, en particular al abrir la plataforma. Publicaremos la
        nueva versión en esta página con su fecha de «Última actualización». Si sigues usando el
        Sitio después de un cambio, aceptas la versión vigente.
      </p>
    ),
  },
  {
    id: 'ley',
    title: 'Ley aplicable',
    body: (
      <p>
        Estos Términos se rigen por las leyes de <strong>[los Estados Unidos Mexicanos]</strong>.
        Cualquier controversia se someterá a <strong>[tribunales competentes / mecanismo de
        resolución]</strong>, sin perjuicio de los derechos que te correspondan como consumidor.
      </p>
    ),
  },
  {
    id: 'contacto',
    title: 'Contacto',
    body: (
      <p>
        Para dudas sobre estos Términos escribe a {mail}, o a{' '}
        <strong>[razón social y domicilio]</strong>.
      </p>
    ),
  },
];

function TermsPage() {
  return (
    <LegalLayout
      current="terminos"
      title="Términos y condiciones"
      lead="Las reglas para usar este sitio y cómo funcionarán los torneos cuando abramos."
      sections={sections}
    />
  );
}

mount(TermsPage);

import '../styles/base.css';
import { mount } from './mount.jsx';
import LegalLayout from './LegalLayout.jsx';
import { CONSENT_KEY, openCookiePreferences } from '../lib/consent.js';
import { SITE } from '../lib/site.js';

const sections = [
  {
    id: 'que-son',
    title: 'Qué son las cookies',
    body: (
      <>
        <p>
          Las cookies son pequeños archivos de texto que un sitio web guarda en tu dispositivo.
          Otras tecnologías parecidas, como el <strong>almacenamiento local</strong> del navegador
          (<code>localStorage</code>), funcionan de forma similar: permiten que un sitio recuerde
          tus preferencias entre visitas. En esta política usamos «cookies» para referirnos a todas
          ellas.
        </p>
      </>
    ),
  },
  {
    id: 'como-usamos',
    title: 'Cómo las usamos',
    body: (
      <>
        <p>
          {SITE.name} todavía no ha abierto: este sitio es una página de presentación sin cuentas,
          sin inicio de sesión y sin pagos. Por eso mantenemos el uso de cookies al mínimo.
        </p>
        <p>
          <strong>Hoy solo usamos almacenamiento estrictamente necesario</strong>: el que guarda tu
          elección sobre cookies. No usamos cookies de analítica, de publicidad ni de redes
          sociales, y no compartimos información de tu navegación con terceros.
        </p>
      </>
    ),
  },
  {
    id: 'tipos',
    title: 'Tipos que usamos',
    body: (
      <>
        <h3>Necesarias · siempre activas</h3>
        <div className="lg-table-wrap">
          <table className="lg-table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Tipo</th>
                <th scope="col">Para qué</th>
                <th scope="col">Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>{CONSENT_KEY}</code></td>
                <td>localStorage</td>
                <td>
                  Recuerda si aceptaste o rechazaste las categorías opcionales, para no preguntarte
                  en cada visita. No contiene datos que te identifiquen.
                </td>
                <td>Hasta que la borres</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Opcionales · solo con tu consentimiento</h3>
        <div className="lg-table-wrap">
          <table className="lg-table">
            <thead>
              <tr>
                <th scope="col">Categoría</th>
                <th scope="col">Estado</th>
                <th scope="col">Para qué servirían</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Analíticas</td>
                <td><span className="lg-tag lg-tag--off">No se usan</span></td>
                <td>
                  Medir de forma agregada qué secciones se visitan para mejorar el sitio.
                </td>
              </tr>
              <tr>
                <td>Marketing</td>
                <td><span className="lg-tag lg-tag--off">No se usan</span></td>
                <td>Medir campañas o mostrar anuncios relevantes.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Si en el futuro añadimos alguna herramienta de estas categorías, solo se cargará
          <strong> después</strong> de que la aceptes, y actualizaremos esta tabla con el nombre del
          proveedor, las cookies que instala y su duración antes de activarla.
        </p>
      </>
    ),
  },
  {
    id: 'terceros',
    title: 'Cookies de terceros',
    body: (
      <p>
        Hoy no incrustamos contenido de terceros que instale cookies (videos, mapas, botones de
        redes sociales ni píxeles de seguimiento). Nuestro proveedor de alojamiento puede registrar
        datos técnicos de cada visita en sus registros de servidor; eso se explica en el{' '}
        <a href="/privacidad.html">Aviso de privacidad</a>.
      </p>
    ),
  },
  {
    id: 'gestionar',
    title: 'Cómo gestionar tu elección',
    body: (
      <>
        <p>
          En tu primera visita verás un aviso con tres opciones con el mismo peso:{' '}
          <strong>Rechazar</strong>, <strong>Configurar</strong> y <strong>Aceptar</strong>.
          Rechazar es tan fácil como aceptar, y puedes cambiar de opinión en cualquier momento:
        </p>
        <button type="button" className="lg-inline-btn" onClick={openCookiePreferences}>
          [ Configurar cookies ]
        </button>
        <ul>
          <li>Desde el enlace «Configurar cookies» en el pie de cada página.</li>
          <li>
            Borrando los datos de este sitio en tu navegador: el aviso volverá a aparecer en tu
            siguiente visita.
          </li>
          <li>
            Bloqueando cookies y almacenamiento desde la configuración de tu navegador. Si bloqueas
            el almacenamiento necesario, el sitio seguirá funcionando, pero te volveremos a
            preguntar en cada visita.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'cambios',
    title: 'Cambios en esta política',
    body: (
      <p>
        Actualizaremos esta política cuando cambie nuestro uso de cookies (por ejemplo, al abrir la
        plataforma o al incorporar analítica) y modificaremos la fecha de «Última actualización».
        Si los cambios afectan a categorías opcionales, te pediremos de nuevo tu consentimiento.
      </p>
    ),
  },
  {
    id: 'contacto',
    title: 'Contacto',
    body: (
      <p>
        Si tienes dudas sobre cookies escríbenos a <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        Para saber cómo tratamos los datos personales en general, consulta el{' '}
        <a href="/privacidad.html">Aviso de privacidad</a>.
      </p>
    ),
  },
];

function CookiesPage() {
  return (
    <LegalLayout
      current="cookies"
      title="Política de cookies"
      lead="Qué guardamos en tu navegador, para qué y cómo cambiar tu elección."
      sections={sections}
    />
  );
}

mount(CookiesPage);

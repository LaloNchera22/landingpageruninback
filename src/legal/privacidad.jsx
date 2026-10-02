import '../styles/base.css';
import { mount } from './mount.jsx';
import LegalLayout from './LegalLayout.jsx';
import { CONSENT_KEY } from '../lib/consent.js';
import { SITE } from '../lib/site.js';

const mail = <a href={`mailto:${SITE.email}`}>{SITE.email}</a>;

const sections = [
  {
    id: 'responsable',
    title: 'Responsable',
    body: (
      <>
        <p>
          {SITE.name} («nosotros») es una plataforma de torneos de videojuegos que aún no ha
          abierto. El responsable del tratamiento de tus datos personales es{' '}
          <strong>[razón social del responsable]</strong>, con domicilio en{' '}
          <strong>[domicilio completo]</strong>.
        </p>
        <p>
          Este aviso de privacidad explica qué datos tratamos a través de este sitio web
          ({SITE.url}), para qué y qué derechos tienes. Se emite conforme a la Ley Federal de
          Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) de México y,
          cuando resulte aplicable, al Reglamento General de Protección de Datos de la Unión
          Europea (RGPD).
        </p>
      </>
    ),
  },
  {
    id: 'datos',
    title: 'Datos que recabamos hoy',
    body: (
      <>
        <p>
          Este sitio es una página de presentación: <strong>no tiene registro, inicio de sesión,
          formularios ni pagos</strong>. Por eso los datos que tratamos son muy pocos:
        </p>
        <ul>
          <li>
            <strong>Registros técnicos del servidor.</strong> Como cualquier sitio web, nuestro
            proveedor de alojamiento registra automáticamente datos de cada solicitud: dirección
            IP, fecha y hora, página solicitada, navegador y sistema operativo. Sirven para entregar
            el sitio y protegerlo frente a abusos.
          </li>
          <li>
            <strong>Tu preferencia de cookies.</strong> Se guarda solo en tu navegador
            (<code>{CONSENT_KEY}</code>) y no se nos envía. Más detalle en la{' '}
            <a href="/cookies.html">Política de cookies</a>.
          </li>
          <li>
            <strong>Mensajes que nos envías.</strong> Si nos escribes por correo electrónico,
            tratamos tu dirección de correo, tu nombre si lo incluyes y el contenido del mensaje.
          </li>
        </ul>
        <p>
          No usamos herramientas de analítica ni de publicidad, y no recabamos datos personales
          sensibles ni datos financieros o patrimoniales.
        </p>
      </>
    ),
  },
  {
    id: 'finalidades',
    title: 'Para qué los usamos',
    body: (
      <>
        <h3>Finalidades primarias</h3>
        <ul>
          <li>Mostrar el sitio web y mantenerlo disponible y seguro.</li>
          <li>Responder a los mensajes y solicitudes que nos envías.</li>
          <li>Recordar tu elección sobre cookies.</li>
          <li>Cumplir obligaciones legales y atender requerimientos de autoridades.</li>
        </ul>
        <h3>Finalidades secundarias</h3>
        <p>
          Si nos lo pides expresamente, podemos avisarte por correo cuando {SITE.name} abra. Puedes
          negarte o retirar tu consentimiento en cualquier momento escribiendo a {mail}; hacerlo no
          afecta a las finalidades primarias.
        </p>
      </>
    ),
  },
  {
    id: 'bases',
    title: 'Bases legales',
    body: (
      <p>
        Tratamos tus datos con base en nuestro interés legítimo en operar y proteger el sitio
        (registros técnicos), en tu solicitud cuando nos escribes, en tu consentimiento para
        cualquier cookie opcional o comunicación de novedades, y en el cumplimiento de obligaciones
        legales. Puedes revocar tu consentimiento en cualquier momento, sin efectos retroactivos.
      </p>
    ),
  },
  {
    id: 'compartir',
    title: 'Con quién los compartimos',
    body: (
      <>
        <p>
          <strong>No vendemos ni rentamos tus datos.</strong> Solo los compartimos con proveedores
          que los tratan por cuenta nuestra (encargados), bajo contrato y para las finalidades
          descritas:
        </p>
        <ul>
          <li>Alojamiento y entrega de contenido: <strong>[proveedor de hosting]</strong>.</li>
          <li>Correo electrónico: <strong>[proveedor de correo]</strong>.</li>
        </ul>
        <p>
          También podemos comunicar datos cuando lo exija la ley o una autoridad competente. Estas
          comunicaciones no requieren tu consentimiento conforme a la LFPDPPP.
        </p>
      </>
    ),
  },
  {
    id: 'internacional',
    title: 'Transferencias internacionales',
    body: (
      <p>
        Nuestros proveedores pueden tratar datos fuera de México o del país donde vives. Cuando
        eso ocurra, procuraremos que existan garantías adecuadas, como cláusulas contractuales
        tipo o mecanismos equivalentes: <strong>[mecanismo de transferencia]</strong>.
      </p>
    ),
  },
  {
    id: 'conservacion',
    title: 'Conservación',
    body: (
      <ul>
        <li>Registros técnicos del servidor: hasta <strong>[30] días</strong>, salvo que se necesiten para investigar un incidente.</li>
        <li>Correos que nos envías: mientras atendemos tu solicitud y hasta <strong>[12] meses</strong> después.</li>
        <li>Preferencia de cookies: en tu navegador, hasta que la borres.</li>
      </ul>
    ),
  },
  {
    id: 'seguridad',
    title: 'Seguridad',
    body: (
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger tus datos, como
        conexiones cifradas (HTTPS) y acceso restringido a los registros. Ningún sistema es
        completamente seguro; si ocurriera una vulneración que afecte de forma significativa tus
        derechos, te lo informaremos conforme a la ley aplicable.
      </p>
    ),
  },
  {
    id: 'derechos',
    title: 'Tus derechos',
    body: (
      <>
        <h3>Derechos ARCO (México)</h3>
        <p>Conforme a la LFPDPPP puedes ejercer en cualquier momento tus derechos de:</p>
        <ul>
          <li><strong>Acceso</strong>: saber qué datos tenemos sobre ti y cómo los tratamos.</li>
          <li><strong>Rectificación</strong>: corregirlos si son inexactos o están incompletos.</li>
          <li><strong>Cancelación</strong>: pedir que los eliminemos cuando ya no sean necesarios.</li>
          <li><strong>Oposición</strong>: oponerte a su tratamiento para fines específicos.</li>
        </ul>
        <p>
          También puedes revocar tu consentimiento y limitar el uso o la divulgación de tus datos.
        </p>
        <h3>Si vives en el Espacio Económico Europeo o en el Reino Unido</h3>
        <p>
          Además de lo anterior, tienes derecho a la limitación del tratamiento y a la portabilidad
          de tus datos, y a presentar una reclamación ante la autoridad de protección de datos de
          tu país.
        </p>
      </>
    ),
  },
  {
    id: 'ejercer',
    title: 'Cómo ejercerlos',
    body: (
      <>
        <p>Envía tu solicitud a {mail} indicando:</p>
        <ol>
          <li>Tu nombre y un correo para responderte.</li>
          <li>Un documento que acredite tu identidad o, en su caso, la de tu representante.</li>
          <li>Qué derecho quieres ejercer y sobre qué datos.</li>
          <li>Cualquier información que nos ayude a localizarlos.</li>
        </ol>
        <p>
          Te responderemos en un plazo máximo de <strong>20 días hábiles</strong> y, si procede,
          haremos efectiva tu solicitud dentro de los 15 días hábiles siguientes, de acuerdo con la
          LFPDPPP. El ejercicio de estos derechos es gratuito. Si no estás conforme con nuestra
          respuesta, puedes acudir a la autoridad de protección de datos competente.
        </p>
      </>
    ),
  },
  {
    id: 'menores',
    title: 'Menores de edad',
    body: (
      <p>
        {SITE.name} estará dirigido a personas mayores de 18 años. No recabamos a sabiendas datos de
        menores de edad. Si crees que un menor nos ha enviado datos, escríbenos y los eliminaremos.
      </p>
    ),
  },
  {
    id: 'lanzamiento',
    title: 'Cuando abramos la plataforma',
    body: (
      <p>
        Al abrir {SITE.name} habrá cuentas, torneos y, eventualmente, pagos, lo que implicará tratar
        más datos (por ejemplo, nombre de usuario, correo, resultados de partidas y apelaciones).
        Antes de recabarlos publicaremos una versión actualizada de este aviso que lo describa con
        detalle, y te la mostraremos al crear tu cuenta.
      </p>
    ),
  },
  {
    id: 'cambios',
    title: 'Cambios a este aviso',
    body: (
      <p>
        Podemos actualizar este aviso de privacidad. Publicaremos la nueva versión en esta página
        con su fecha de «Última actualización» y, si los cambios son relevantes, lo avisaremos de
        forma visible en el sitio.
      </p>
    ),
  },
  {
    id: 'contacto',
    title: 'Contacto',
    body: (
      <p>
        Para cualquier duda sobre privacidad o para ejercer tus derechos escribe a {mail}, o a{' '}
        <strong>[responsable / departamento de datos personales y domicilio]</strong>.
      </p>
    ),
  },
];

function PrivacyPage() {
  return (
    <LegalLayout
      current="privacidad"
      title="Aviso de privacidad"
      lead="Qué datos tratamos, para qué y cómo puedes ejercer tus derechos."
      sections={sections}
    />
  );
}

mount(PrivacyPage);

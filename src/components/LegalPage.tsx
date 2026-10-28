import type { ReactNode } from 'react';
import type { TriviaConfig } from '../config/schema';
import { LEGAL } from '../config/site';

/*
 * Documentos legales de Triviala. Cuatro páginas:
 *   /privacidad          Aviso de privacidad de Triviala (visitantes y negocios que contratan).
 *   /terminos            Términos de servicio para negocios y de uso del sitio.
 *   /privacidad/<slug>   Aviso para quienes juegan la trivia de un negocio (el negocio es el responsable).
 *   /bases/<slug>        Bases de la promoción, armadas con la configuración del premio.
 */

const AUTHORITY = 'la Secretaría Anticorrupción y Buen Gobierno, autoridad que vigila la protección de datos personales en el sector privado';

function LegalShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="legal">
      <header className="legal__top">
        <a href="/" aria-label="Triviala inicio">
          <img src="/brand/triviala-logo.svg" alt="Triviala" width="116" height="32" />
        </a>
      </header>
      <main className="legal__main">
        <p className="legal__eyebrow">{subtitle}</p>
        <h1>{title}</h1>
        <p className="legal__updated">Última actualización: {LEGAL.updated}</p>
        {children}
      </main>
      <footer className="legal__footer">
        <a href="/privacidad">Aviso de privacidad</a>
        <a href="/terminos">Términos de servicio</a>
        <span>© 2026 Triviala</span>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="legal__section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

/* ---------- Aviso de privacidad de Triviala ---------- */

export function TrivialaPrivacy() {
  return (
    <LegalShell title="Aviso de privacidad" subtitle="Triviala">
      <p>
        Este aviso explica qué datos personales recaba Triviala, para qué los usa y cómo puedes ejercer tus derechos, conforme a la Ley Federal
        de Protección de Datos Personales en Posesión de los Particulares.
      </p>

      <Section title="1. Quién es el responsable">
        <p>
          <strong>{LEGAL.owner}</strong>, que opera la marca Triviala, con domicilio en {LEGAL.address}, es responsable del tratamiento de los
          datos que se describen aquí. Contacto de privacidad: <strong>{LEGAL.email}</strong>.
        </p>
      </Section>

      <Section title="2. A quién aplica">
        <ul>
          <li>Personas que visitan este sitio o nos escriben para conocer el servicio.</li>
          <li>Negocios y sus representantes que contratan Triviala.</li>
        </ul>
        <p>
          <strong>Si jugaste la trivia de un negocio</strong>, el responsable de tus datos es ese negocio, no Triviala. Triviala solo los procesa
          por su cuenta. Consulta el aviso de privacidad que aparece en la trivia que jugaste.
        </p>
      </Section>

      <Section title="3. Datos que recabamos">
        <ul>
          <li>Identificación y contacto: nombre, nombre del negocio, teléfono o WhatsApp y correo electrónico.</li>
          <li>Facturación, si contratas: razón social, RFC, domicilio fiscal y régimen fiscal.</li>
          <li>Datos técnicos que genera cualquier sitio web: dirección IP, tipo de navegador y fecha de la visita, en los registros del servidor.</li>
        </ul>
        <p>No recabamos datos personales sensibles. Este sitio no usa cookies de publicidad ni de rastreo.</p>
      </Section>

      <Section title="4. Para qué usamos tus datos">
        <p>
          <strong>Finalidades necesarias</strong> para darte el servicio:
        </p>
        <ul>
          <li>Responder tus mensajes, preparar tu demo y cotizarte.</li>
          <li>Prestar el servicio contratado: configurar la trivia, dar soporte y entregar reportes.</li>
          <li>Facturar y cumplir obligaciones legales y fiscales.</li>
          <li>Mantener la seguridad del sitio y evitar abusos.</li>
        </ul>
        <p>
          <strong>Finalidad voluntaria</strong>: enviarte novedades y promociones de Triviala. Puedes negarte en cualquier momento escribiendo a{' '}
          {LEGAL.email} o respondiendo “ya no” a nuestros mensajes, sin que eso afecte el servicio.
        </p>
      </Section>

      <Section title="5. Con quién compartimos tus datos">
        <p>No vendemos ni rentamos tus datos. Para operar usamos proveedores que los tratan solo por nuestra cuenta y bajo nuestras instrucciones:</p>
        <ul>
          <li>Vercel: alojamiento del sitio.</li>
          <li>Upstash: base de datos.</li>
          <li>Google Fonts: tipografías del sitio (recibe tu dirección IP al cargarlas).</li>
          <li>WhatsApp (Meta): cuando nos escribes por ese medio.</li>
        </ul>
        <p>Algunos de estos proveedores están fuera de México. Solo compartiremos datos con autoridades cuando una ley o una orden lo exijan.</p>
      </Section>

      <Section title="6. Tus derechos (ARCO) y cómo revocar tu consentimiento">
        <p>
          Puedes <strong>acceder</strong> a tus datos, <strong>rectificarlos</strong>, pedir que los <strong>cancelemos</strong> u{' '}
          <strong>oponerte</strong> a su uso, así como revocar tu consentimiento o limitar su uso. Escribe a <strong>{LEGAL.email}</strong> con:
        </p>
        <ul>
          <li>Tu nombre y un medio para responderte.</li>
          <li>Una identificación, o la de tu representante con el documento que lo acredite.</li>
          <li>Qué derecho quieres ejercer y sobre qué datos.</li>
        </ul>
        <p>Te responderemos por el mismo medio dentro de los plazos que marca la ley. El trámite es gratuito.</p>
      </Section>

      <Section title="7. Cuánto tiempo los guardamos">
        <p>
          Mientras exista la relación contigo y después el tiempo que exijan las obligaciones fiscales y legales. Luego los eliminamos.
        </p>
      </Section>

      <Section title="8. Cambios a este aviso">
        <p>Publicaremos cualquier cambio en esta misma página, con la fecha de actualización arriba.</p>
      </Section>

      <Section title="9. Si no estás conforme">
        <p>Si consideras que no respetamos tus derechos, puedes acudir a {AUTHORITY}.</p>
      </Section>
    </LegalShell>
  );
}

/* ---------- Términos de servicio ---------- */

export function TrivialaTerms() {
  return (
    <LegalShell title="Términos de servicio" subtitle="Triviala">
      <p>
        Estos términos regulan el uso de este sitio y la contratación de Triviala por parte de negocios. Al contratar o usar el servicio, los
        aceptas.
      </p>

      <Section title="1. El servicio">
        <p>
          Triviala, operada por <strong>{LEGAL.owner}</strong> (“Triviala”), ofrece trivias digitales con la marca del negocio (“el Negocio”).
          Sus clientes las juegan desde el celular, dejan sus datos de contacto y pueden ganar cupones. El servicio incluye el enlace y QR de la
          trivia, la pantalla de canje con PIN y el panel de resultados, según el plan contratado.
        </p>
      </Section>

      <Section title="2. Planes y pagos">
        <ul>
          <li>Los precios vigentes se publican en este sitio, en pesos mexicanos. El alcance, la fecha de inicio y la forma de pago se confirman por escrito antes de empezar.</li>
          <li>La trivia se activa cuando se recibe el pago acordado.</li>
          <li>El plan mensual se renueva cada mes hasta que el Negocio avise que lo cancela. La cancelación aplica al siguiente periodo.</li>
          <li>Una vez que la trivia está publicada, el periodo pagado no se reembolsa, salvo que Triviala no pueda prestar el servicio.</li>
        </ul>
      </Section>

      <Section title="3. Lo que le corresponde al Negocio">
        <ul>
          <li>
            <strong>Entregar los premios.</strong> El Negocio define el premio, sus condiciones y su vigencia, y está obligado a respetarlos ante
            sus clientes. Triviala no entrega ni paga premios.
          </li>
          <li>
            <strong>Cumplir con la ley de protección al consumidor.</strong> El Negocio es el responsable de la promoción frente a sus clientes y
            ante la Procuraduría Federal del Consumidor.
          </li>
          <li>
            <strong>Ser responsable de los datos de sus jugadores.</strong> El Negocio decide para qué usa esos datos, debe proporcionar sus datos
            de identidad y domicilio para el aviso de privacidad de su trivia y debe atender las solicitudes de sus clientes sobre sus datos.
          </li>
          <li>
            <strong>Contactar solo a quien aceptó.</strong> Enviar promociones únicamente a quienes marcaron que aceptan recibirlas, respetar a
            quien pida no recibir más mensajes y seguir las políticas de WhatsApp.
          </li>
          <li>Cuidar el PIN de canje y del panel, y avisar a Triviala si cree que alguien más lo conoce.</li>
          <li>Garantizar que tiene derecho a usar el logo, nombres e imágenes que entrega para la trivia.</li>
        </ul>
      </Section>

      <Section title="4. Lo que le corresponde a Triviala">
        <ul>
          <li>Configurar y publicar la trivia con el contenido aprobado por el Negocio.</li>
          <li>Tratar los datos de los jugadores solo por cuenta del Negocio y para prestar el servicio, sin venderlos ni usarlos para fines propios.</li>
          <li>Aplicar medidas razonables de seguridad: conexión cifrada, acceso con PIN y límites contra intentos repetidos.</li>
          <li>Entregar al Negocio su lista de contactos cuando la pida y eliminarla dentro de los 30 días siguientes al fin del servicio, salvo que el Negocio pida otra cosa por escrito.</li>
        </ul>
      </Section>

      <Section title="5. Sin garantía de resultados">
        <p>
          Las cifras que aparecen en este sitio son ejemplos ilustrativos. Triviala no garantiza un número de jugadores, contactos, visitas o
          ventas, porque dependen del Negocio, su premio y su flujo de clientes.
        </p>
      </Section>

      <Section title="6. Disponibilidad y límite de responsabilidad">
        <p>
          Triviala procura que el servicio esté disponible todo el tiempo, pero puede haber interrupciones por mantenimiento o por fallas de
          proveedores externos. La responsabilidad total de Triviala frente al Negocio, por cualquier causa, se limita al monto que el Negocio
          haya pagado en los tres meses anteriores al hecho. Triviala no responde por ganancias no obtenidas ni por el incumplimiento de premios
          por parte del Negocio.
        </p>
      </Section>

      <Section title="7. Propiedad">
        <p>
          El logo, la marca y el contenido del Negocio son suyos. La plataforma, el diseño y la marca Triviala son de Triviala. El Negocio
          autoriza a Triviala a mostrar su nombre como cliente, salvo que pida lo contrario.
        </p>
      </Section>

      <Section title="8. Suspensión y terminación">
        <p>
          Cualquiera de las partes puede terminar el servicio avisando por escrito. Triviala puede suspender una trivia que se use para engañar
          a los participantes, para enviar mensajes no solicitados o de forma contraria a la ley.
        </p>
      </Section>

      <Section title="9. Uso de este sitio">
        <p>
          No está permitido intentar acceder a paneles o datos ajenos, automatizar participaciones, adivinar códigos o PIN, ni interferir con el
          funcionamiento del sitio.
        </p>
      </Section>

      <Section title="10. Ley aplicable">
        <p>
          Estos términos se rigen por las leyes de México. Para cualquier controversia, las partes se someten a los tribunales competentes del
          Estado de México.
        </p>
      </Section>

      <Section title="11. Contacto">
        <p>
          {LEGAL.owner} · {LEGAL.address} · {LEGAL.email}
        </p>
      </Section>
    </LegalShell>
  );
}

/* ---------- Aviso para los jugadores de una trivia ---------- */

function businessLegal(config: TriviaConfig) {
  return {
    name: config.legal?.name ?? `${config.brand.name} (PENDIENTE: razón social del negocio)`,
    address: config.legal?.address ?? 'PENDIENTE: domicilio del negocio',
    contact: config.legal?.contact ?? 'PENDIENTE: correo o teléfono del negocio',
  };
}

export function PlayerPrivacy({ config }: { config: TriviaConfig }) {
  const biz = businessLegal(config);
  return (
    <LegalShell title="Aviso de privacidad" subtitle={`Trivia de ${config.brand.name}`}>
      <p>Este aviso explica qué datos se recaban cuando juegas “{config.title}” y cómo puedes ejercer tus derechos.</p>

      <Section title="1. Quién es el responsable">
        <p>
          <strong>{biz.name}</strong>, con domicilio en {biz.address}, es responsable de tus datos. Contacto: <strong>{biz.contact}</strong>.
        </p>
        <p>
          La trivia funciona con Triviala, que trata los datos solo por cuenta de {config.brand.name} y no los usa para fines propios.
        </p>
      </Section>

      <Section title="2. Datos que se recaban">
        <ul>
          <li>Tu nombre y tu número de WhatsApp.</li>
          <li>Tu resultado en la trivia, la fecha en que jugaste y, si ganaste, tu código de cupón y si ya lo canjeaste.</li>
          <li>Si aceptas o no recibir promociones.</li>
        </ul>
        <p>No se recaban datos sensibles. Debes ser mayor de edad para participar.</p>
      </Section>

      <Section title="3. Para qué se usan">
        <p>
          <strong>Finalidades necesarias</strong> para que participes:
        </p>
        <ul>
          <li>Registrar tu participación y tu resultado.</li>
          <li>Entregarte tu cupón, validarlo cuando lo uses y evitar que se use dos veces.</li>
          <li>Evitar que una misma persona juegue más de una vez.</li>
        </ul>
        <p>
          <strong>Finalidad voluntaria</strong>, solo si marcaste la casilla: que {config.brand.name} te envíe promociones por WhatsApp. Puedes
          dejar de recibirlas cuando quieras respondiendo “ya no” o escribiendo a {biz.contact}. Negarte no afecta tu premio.
        </p>
      </Section>

      <Section title="4. Con quién se comparten">
        <p>
          Tus datos no se venden ni se comparten con otros negocios. Se guardan con los proveedores de Triviala (Vercel para el sitio y Upstash
          para la base de datos), que solo los resguardan.
        </p>
      </Section>

      <Section title="5. Cuánto tiempo se guardan">
        <p>
          Mientras dure la promoción y hasta 12 meses después, salvo que antes pidas que se eliminen. Si nunca canjeas tu cupón, se conserva hasta
          su fecha de vencimiento.
        </p>
      </Section>

      <Section title="6. Tus derechos">
        <p>
          Puedes acceder a tus datos, corregirlos, pedir que se eliminen, oponerte a su uso o revocar tu consentimiento. Escribe a{' '}
          <strong>{biz.contact}</strong> con tu nombre, tu número de WhatsApp y lo que necesitas. La respuesta llegará por el mismo medio dentro de
          los plazos que marca la ley. También puedes escribir a {LEGAL.email} y Triviala hará llegar tu solicitud al negocio.
        </p>
      </Section>

      <Section title="7. Cambios y autoridad">
        <p>
          Cualquier cambio se publicará en esta página. Si consideras que no se respetan tus derechos, puedes acudir a {AUTHORITY}.
        </p>
      </Section>

      <p className="legal__links">
        <a href={`/bases/${config.slug}`}>Ver bases de la promoción</a> · <a href={`/t/${config.slug}`}>Volver a la trivia</a>
      </p>
    </LegalShell>
  );
}

/* ---------- Bases de la promoción ---------- */

export function PromoRules({ config }: { config: TriviaConfig }) {
  const biz = businessLegal(config);
  const { prize } = config;
  const total = config.questions.length;
  return (
    <LegalShell title="Bases de la promoción" subtitle={config.title}>
      <Section title="1. Organizador">
        <p>
          La promoción la organiza <strong>{biz.name}</strong> (“{config.brand.name}”), con domicilio en {biz.address}. Contacto: {biz.contact}.{' '}
          {config.brand.name} es el único responsable de entregar los premios. Triviala solo proporciona la plataforma de la trivia.
        </p>
      </Section>

      <Section title="2. Cómo participar">
        <ul>
          <li>
            Contesta las {total} preguntas de la trivia. Tienes {config.secondsPerQuestion} segundos por pregunta.
          </li>
          <li>Al terminar, deja tu nombre y tu número de WhatsApp y acepta el aviso de privacidad.</li>
          <li>Solo hay una participación por número de WhatsApp. Debes ser mayor de edad.</li>
        </ul>
      </Section>

      <Section title="3. Premio">
        <ul>
          <li>
            Premio: <strong>{prize.description}</strong>.
          </li>
          <li>
            Se gana con al menos <strong>{prize.minCorrect} de {total}</strong> respuestas correctas.
          </li>
          <li>Recibes un código único de 6 caracteres en pantalla, que puedes guardar como imagen o enviarte por WhatsApp.</li>
          {prize.maxCoupons !== undefined && (
            <li>
              Hay <strong>{prize.maxCoupons} premios</strong> disponibles en total. Al agotarse, la trivia sigue abierta pero ya no entrega cupones.
            </li>
          )}
        </ul>
      </Section>

      <Section title="4. Canje">
        <ul>
          <li>
            El cupón es válido durante <strong>{prize.validDays} días</strong> desde que lo ganas, hasta las 23:59 h (hora del centro de México) del
            último día.
          </li>
          <li>{prize.redeemInstructions}</li>
          {prize.conditions.map((c) => (
            <li key={c}>{c}</li>
          ))}
          <li>Cada código se canjea una sola vez. No es canjeable por dinero en efectivo.</li>
        </ul>
      </Section>

      <Section title="5. Otras condiciones">
        <ul>
          <li>Se anulan las participaciones hechas con datos falsos, de forma automatizada o para obtener más de un premio.</li>
          <li>{config.brand.name} puede terminar la promoción antes, avisando en la trivia, y respetará los cupones ya entregados hasta su vencimiento.</li>
          <li>Para dudas o aclaraciones, contacta a {config.brand.name} en {biz.contact}. También puedes acudir a la Procuraduría Federal del Consumidor.</li>
        </ul>
      </Section>

      <p className="legal__links">
        <a href={`/privacidad/${config.slug}`}>Aviso de privacidad</a> · <a href={`/t/${config.slug}`}>Volver a la trivia</a>
      </p>
    </LegalShell>
  );
}

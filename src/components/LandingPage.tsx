// Generado a partir del diseño de la página de ventas (HTML + Tailwind). Los estilos salen de src/landing.css.
import { SALES_WHATSAPP } from '../config/site';
import '../landing.css';

function wa(text: string): string {
  return `https://wa.me/52${SALES_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

export function LandingPage() {
  return (
    <div className="landing-tw bg-brand-crema text-slate-800 antialiased selection:bg-brand-mint selection:text-white">

{/* BEGIN: MainHeader */}
<header className="sticky top-0 z-50 bg-[#FAF7F2] border-b border-slate-200">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
{/* Brand Logo & Clean Sector Subtitle */}
<div className="flex items-center gap-3">
<a aria-label="Triviala inicio" className="flex items-center gap-2 group" href="/">
<img src="/brand/triviala-logo.svg" alt="Triviala" width="145" height="40" className="h-10 w-auto group-hover:opacity-90 transition-opacity" />
</a>
</div>
{/* Quick Navigation */}
<nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
<a className="hover:text-brand-forest transition-colors" href="#como-funciona">Cómo funciona</a>
<a className="hover:text-brand-forest transition-colors" href="#beneficios">Beneficios</a>
<a className="hover:text-brand-forest transition-colors" href="#precios">Precios</a>
<a className="hover:text-brand-forest transition-colors" href="#preguntas">FAQ</a>
</nav>
{/* Header CTAs */}
<div className="flex items-center gap-3">
<a className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-brand-forest hover:bg-brand-forestHover text-white transition-colors" href={wa("Hola, me interesa probar Triviala en mi negocio")} target="_blank" rel="noreferrer">
<svg className="w-4 h-4 fill-current text-brand-mint" viewBox="0 0 24 24">
<path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"></path>
</svg>
<span className="">Escríbenos</span>
</a>
</div>
</div>
</header>
{/* END: MainHeader */}
<main>
{/* BEGIN: HeroSection */}
<section className="relative pt-12 pb-20 md:pt-20 md:pb-28">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
{/* Value Proposition & Actions (Left Col) */}
<div className="lg:col-span-7 text-center lg:text-left">
{/* Pure Editorial Category Label */}

{/* Primary Headline */}
<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-forest tracking-tight leading-[1.12] mb-6">
              Convierte cada visita en un cliente que <span className="highlight-word text-brand-emerald">regresa</span>
</h1>
{/* Persuasive Subheadline */}
<p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8 font-normal">
              Una trivia con la marca de tu negocio. Tus clientes juegan en 1 minuto desde su celular, capturas su WhatsApp legítimamente y ganan un cupón para volver.
            </p>
{/* Dual Conversion CTAs */}
<div className="mb-8 max-w-xl mx-auto lg:mx-0 space-y-2 text-left">
  <div className="bg-white rounded-xl px-3 py-2 shadow-sm border border-slate-200/80 flex items-center justify-between gap-3">
    <div className="flex items-center gap-2.5 min-w-0">
      <div className="w-6 h-6 rounded-lg bg-brand-forest text-brand-mint flex items-center justify-center text-[10px] font-black flex-shrink-0">T</div>
      <div className="min-w-0 truncate">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="text-[10px] font-bold text-brand-forest uppercase tracking-wider">TRIVIALA</span>
          <span className="text-[10px] text-slate-400 font-medium">• personalizada</span>
        </div>
        <p className="text-xs font-bold text-slate-800 tracking-tight truncate mt-0.5">Con tu logo, tus colores y tus preguntas</p>
      </div>
    </div>
    <span className="text-[10px] font-semibold text-brand-emerald bg-[#EAF7F2] px-2 py-0.5 rounded-full flex-shrink-0">Tu marca</span>
  </div>

  <div className="bg-white rounded-xl px-3 py-2 shadow-sm border border-slate-200/80 flex items-center justify-between gap-3">
    <div className="flex items-center gap-2.5 min-w-0">
      <div className="w-6 h-6 rounded-lg bg-brand-forest text-brand-mint flex items-center justify-center text-[10px] font-black flex-shrink-0">T</div>
      <div className="min-w-0 truncate">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="text-[10px] font-bold text-brand-forest uppercase tracking-wider">TRIVIALA</span>
          <span className="text-[10px] text-slate-400 font-medium">• 0 fricción</span>
        </div>
        <p className="text-xs font-bold text-slate-800 tracking-tight truncate mt-0.5">100% web nativo sin descargas ni apps</p>
      </div>
    </div>
    <span className="text-[10px] font-semibold text-brand-emerald bg-[#EAF7F2] px-2 py-0.5 rounded-full flex-shrink-0">0 apps</span>
  </div>
</div><div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
<a className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-forest hover:bg-brand-forestHover text-white font-bold text-base transition-colors text-center" href="/t/demo-cafe">
                Probar la demo
              </a>
<a className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-brand-forest border-2 border-brand-forest font-bold text-base transition-colors text-center flex items-center justify-center gap-2" href={wa("Hola! Quiero una trivia para mi negocio")} target="_blank" rel="noreferrer">
<span className="">Quiero una para mi negocio</span>
</a>
</div>
{/* Micro Social Proof Editorial List */}
</div>
{/* Interactive Mockup Visual (Right Col) */}
{/* Mockup del celular: reproduce la pantalla real de la trivia */}
<div className="lg:col-span-5 flex justify-center relative py-6">
  <div className="relative w-[290px] sm:w-[310px]">
    {/* Marco */}
    <div className="relative rounded-[3rem] bg-slate-900 p-[10px] shadow-[0_30px_60px_-20px_rgba(19,57,46,0.45)] ring-1 ring-slate-700">
      {/* Botones laterales */}
      <span className="absolute -left-[3px] top-28 h-10 w-[3px] rounded-l bg-slate-700" aria-hidden="true"></span>
      <span className="absolute -left-[3px] top-44 h-16 w-[3px] rounded-l bg-slate-700" aria-hidden="true"></span>
      <span className="absolute -right-[3px] top-36 h-20 w-[3px] rounded-r bg-slate-700" aria-hidden="true"></span>
      {/* Pantalla */}
      <div className="relative overflow-hidden rounded-[2.4rem] bg-brand-forest aspect-[9/18] flex flex-col select-none" aria-hidden="true">
        {/* Barra de estado con la isla dinámica en medio */}
        <div className="flex items-center justify-between px-6 pt-2.5 text-[10px] font-semibold text-white/90">
          <span className="w-12">9:41</span>
          <span className="h-6 w-20 rounded-full bg-slate-900"></span>
          <span className="w-12 flex items-center justify-end gap-1">
            <span className="flex items-end gap-[2px]">
              <span className="h-1.5 w-[3px] rounded-sm bg-white/90"></span>
              <span className="h-2 w-[3px] rounded-sm bg-white/90"></span>
              <span className="h-2.5 w-[3px] rounded-sm bg-white/90"></span>
            </span>
            <span className="h-2.5 w-5 rounded-[3px] border border-white/80 p-[1px]"><span className="block h-full w-3/4 rounded-[1px] bg-white/90"></span></span>
          </span>
        </div>
        {/* Parte superior con la marca */}
        <div className="px-5 pt-7 pb-5 text-white">
          <p className="text-center text-[11px] font-bold tracking-[0.18em] uppercase text-white/80">Café Alameda</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-white/70">Pregunta 02 de 05</span>
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white">⏱ 00:14</span>
          </div>
          <p className="mt-3 text-[17px] font-extrabold leading-snug">¿Qué grano usamos en nuestro espresso de la casa?</p>
          {/* Tiempo restante */}
          <div className="mt-5 h-1.5 w-full rounded-full bg-white/15">
            <span className="block h-full w-[70%] rounded-full bg-brand-mint"></span>
          </div>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white/90">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-mint"></span>
            Acierta 4 de 5 y gana 10%
          </p>
        </div>
        {/* Hoja blanca con respuestas */}
        <div className="mt-auto rounded-t-[1.75rem] bg-white px-4 pt-5 pb-5 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-slate-200 px-3 min-h-[52px] flex items-center text-[11px] font-semibold text-slate-600">A. Robusta</div>
            <div className="relative rounded-xl border-2 border-brand-emerald bg-[#EAF7F2] px-3 min-h-[52px] flex items-center text-[11px] font-bold leading-tight text-brand-forest">
              B. Arábica de Chiapas
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 ring-2 ring-white items-center justify-center rounded-full bg-brand-emerald text-[10px] text-white">✓</span>
            </div>
            <div className="rounded-xl border border-slate-200 px-3 min-h-[52px] flex items-center text-[11px] font-semibold text-slate-600">C. Liberica</div>
            <div className="rounded-xl border border-slate-200 px-3 min-h-[52px] flex items-center text-[11px] font-semibold text-slate-600">D. Excelsa</div>
          </div>
          <p className="rounded-xl bg-[#EAF7F2] px-3 py-2 text-[10px] leading-snug text-brand-forest"><strong>¡Correcto!</strong> Lo tostamos aquí cada semana.</p>
          <div className="flex gap-1">
            <span className="h-1.5 flex-1 rounded-full bg-brand-emerald"></span>
            <span className="h-1.5 flex-1 rounded-full bg-brand-emerald"></span>
            <span className="h-1.5 flex-1 rounded-full bg-slate-200"></span>
            <span className="h-1.5 flex-1 rounded-full bg-slate-200"></span>
            <span className="h-1.5 flex-1 rounded-full bg-slate-200"></span>
          </div>
          <div className="rounded-full bg-brand-forest py-3 text-center text-[12px] font-bold text-white">Siguiente pregunta</div>
          <div className="mx-auto h-1 w-24 rounded-full bg-slate-300"></div>
        </div>
      </div>
    </div>

    {/* Tarjeta flotante: el premio */}
    <div className="absolute hidden sm:block -right-20 -bottom-16 z-20 w-[200px] rounded-2xl bg-white p-3 shadow-xl ring-1 ring-slate-100 text-left">
      <p className="text-[10px] font-bold uppercase tracking-wider text-brand-emerald">¡Ganaste!</p>
      <p className="mt-0.5 text-xs font-extrabold text-slate-900">10% en tu próxima compra</p>
      <div className="mt-2 flex gap-1">
        {'K7M2Q9'.split('').map((c, i) => (
          <span key={i} className="flex h-6 w-5 items-center justify-center rounded-md border border-slate-200 text-[11px] font-black text-brand-forest">{c}</span>
        ))}
      </div>
    </div>

    {/* Tarjeta flotante: contacto nuevo */}
    <div className="absolute hidden sm:flex -left-24 top-10 z-20 items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-xl ring-1 ring-slate-100">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EAF7F2] text-[11px] font-black text-brand-emerald">+1</span>
      <div className="text-left leading-tight">
        <p className="text-[11px] font-bold text-slate-900">Nuevo contacto</p>
        <p className="text-[10px] text-slate-500">WhatsApp guardado</p>
      </div>
    </div>

    {/* Notificaciones flotantes: cupón arriba-centro a la derecha, comensales abajo-centro a la izquierda */}
    <div className="absolute hidden lg:block -right-20 top-[34%] z-30 w-[220px] text-left rounded-2xl bg-white p-3 shadow-xl ring-1 ring-slate-100">
      <div className="mb-1 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <img src="/brand/triviala-isotipo.svg" alt="" width="16" height="16" className="h-4 w-4" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-forest">Triviala</span>
        </div>
        <span className="text-[10px] font-medium text-slate-400">ahora</span>
      </div>
      <p className="text-xs font-bold tracking-tight text-slate-900">Cupón de regreso emitido</p>
      <p className="mt-0.5 text-[11px] leading-snug text-slate-500">Premio de 10% activado con código único. Válido por 14 días.</p>
    </div>
    <div className="absolute hidden lg:block -left-[160px] top-[60%] z-30 w-[220px] text-left rounded-2xl bg-white p-3 shadow-xl ring-1 ring-slate-100">
      <div className="mb-1 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <img src="/brand/triviala-isotipo.svg" alt="" width="16" height="16" className="h-4 w-4" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-forest">Triviala</span>
        </div>
        <span className="text-[10px] font-medium text-slate-400">hace 3m</span>
      </div>
      <p className="text-xs font-bold tracking-tight text-slate-900">+12 clientes hoy</p>
      <p className="mt-0.5 text-[11px] leading-snug text-slate-500">Dejaron su WhatsApp. Ya aparecen en tu panel.</p>
    </div>
  </div>
</div>
</div>
</div>
</section>
{/* Pure Metric Section */}
<section className="bg-brand-crema border-y border-slate-200 py-16 md:py-20">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
{/* Header Context */}
<div className="mb-12 pb-8 border-b border-slate-200">
<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
<div className="max-w-2xl">
<div className="flex items-center gap-2.5 mb-3">
</div>
<h2 className="text-3xl sm:text-5xl font-extrabold text-brand-forest tracking-tight leading-[1.12]">
        Lo que vas a medir en tu negocio, <span className="highlight-word text-brand-emerald">mes a mes</span>
</h2>
</div>
<div className="max-w-md flex flex-col justify-end text-left lg:text-right">
<p className="text-slate-700 text-sm sm:text-base font-medium leading-snug mb-3">
        Cifras de ejemplo para que veas qué mide tu panel. Tus resultados dependen de tu local, tu premio y tu flujo de clientes.
      </p>
</div>
</div>
</div>
{/* Asymmetric Metrics Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
{/* Highlight Metric 1: +38% (Col span 4) */}
<div className="lg:col-span-4 bg-brand-forest text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-brand-forest">
<div>
<div className="flex items-center justify-between mb-4">
<span className="px-2.5 py-1 rounded-full bg-brand-mint text-brand-forest text-[11px] font-black uppercase tracking-wider">Ejemplo · Retención</span>
<span className="text-xs text-slate-300 font-semibold">Días 1 - 30</span>
</div>
<p className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-none">+38%</p>
<h3 className="text-lg font-bold text-white mt-3">Visitas recurrentes</h3>
<p className="text-xs text-slate-200 mt-1 leading-relaxed">Clientes que regresan antes de 30 días activando su cupón en su segunda visita.</p>
</div>
<div className="mt-8 pt-5 border-t border-brand-emerald">
<div className="flex justify-between text-xs mb-1.5 font-bold">
<span className="text-slate-300">Sin incentivo dinámico</span>
<span className="text-brand-mint">Con Triviala (+38%)</span>
</div>
<div className="w-full bg-[#0E2A22] rounded-full h-2.5 overflow-hidden flex">
<div className="bg-slate-500 h-2.5 w-1/3"></div>
<div className="bg-brand-mint h-2.5 w-2/3"></div>
</div>
</div>
</div>
{/* Velocity Metric 2: 3.2x (Col span 4) */}
<div className="lg:col-span-4 bg-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-slate-200 shadow-md">
<div>
<div className="flex items-center justify-between mb-4">
<span className="px-2.5 py-1 rounded-full bg-[#EAF7F2] text-brand-emerald text-[11px] font-extrabold uppercase tracking-wide">Ejemplo · Contactos</span>
</div>
<p className="text-5xl sm:text-6xl font-black text-brand-forest tracking-tight leading-none">3.2x</p>
<h3 className="text-lg font-bold text-slate-900 mt-3">Contactos capturados</h3>
<p className="text-xs text-slate-600 mt-1 leading-relaxed">Una trivia con premio motiva más a dejar sus datos que un formulario normal.</p>
</div>
<div className="mt-8 pt-5 border-t border-slate-200 space-y-2 text-xs">
<div>
<div className="flex justify-between font-semibold text-slate-500 mb-1">
<span className="">Formularios web tradicionales</span>
<span className="font-mono font-bold text-slate-700">1.0x</span>
</div>
<div className="w-full bg-slate-200 rounded-full h-2">
<div className="bg-slate-400 h-2 rounded-full w-[31%]"></div>
</div>
</div>
<div>
<div className="flex justify-between font-bold text-brand-forest mb-1">
<span className="">Trivia interactiva Triviala</span>
<span className="font-mono font-bold text-brand-emerald">3.2x</span>
</div>
<div className="w-full bg-slate-200 rounded-full h-2">
<div className="bg-brand-emerald h-2 rounded-full w-full"></div>
</div>
</div>
</div>
</div>
{/* Split Column: Metrics 3 & 4 (Col span 4) */}
<div className="lg:col-span-4 flex flex-col gap-6">
{/* Metric 3: 94% Apertura WhatsApp */}
<div className="bg-white rounded-2xl p-6 border border-slate-200 flex-1 flex flex-col justify-between">
<div className="flex items-start justify-between">
<div>
<span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Sin fricción</span>
<p className="text-4xl font-black text-brand-forest mt-1 tracking-tight">0</p>
<h4 className="text-sm font-bold text-slate-900 mt-1">Apps que descargar</h4>
<p className="text-xs text-slate-500 mt-0.5">Escanean el QR y juegan desde el navegador.</p>
</div>
<div className="w-12 h-12 rounded-xl bg-[#EAF7F2] text-brand-forest flex items-center justify-center font-black text-xs flex-shrink-0">
<svg className="w-6 h-6 fill-current text-brand-forest" viewBox="0 0 24 24">
<path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"></path>
</svg>
</div>
</div>
<div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
<span className="text-slate-500 font-medium">iPhone y Android</span>
<span className="font-bold text-brand-emerald bg-[#EAF7F2] px-2 py-0.5 rounded-full">Cualquier celular</span>
</div>
</div>
{/* Metric 4: +15,000 Comensales registrados */}
<div className="bg-white rounded-2xl p-6 border border-slate-200 flex-1 flex flex-col justify-between">
<div className="flex items-start justify-between">
<div>
<span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Tus datos</span>
<p className="text-4xl font-black text-brand-forest mt-1 tracking-tight">$0</p>
<h4 className="text-sm font-bold text-slate-900 mt-1">Comisión por venta</h4>
<p className="text-xs text-slate-500 mt-0.5">Los contactos son tuyos, sin intermediarios.</p>
</div>
<div className="w-12 h-12 rounded-xl bg-brand-forest text-brand-mint flex items-center justify-center flex-shrink-0">
<svg className="w-6 h-6 fill-none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
<path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
</div>
</div>
<div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
<span className="flex items-center gap-1.5 font-bold text-brand-forest">
               Tu base de clientes
            </span>
<span className="text-slate-500 font-semibold">Con aviso de privacidad</span>
</div>
</div>
</div>
</div>
</div>
</section>
{/* END: HeroSection */}
{/* BEGIN: HowItWorks */}
<section className="py-20 bg-[#FAF7F2] border-b border-slate-200" id="como-funciona">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="mb-16 pb-12 border-b border-slate-200"><div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start"><div className="lg:col-span-7"><h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-brand-forest tracking-tight leading-[1.12]">Del mostrador al WhatsApp en <span className="highlight-word text-brand-emerald">60 segundos</span></h2><p className="text-slate-600 text-base sm:text-lg mt-5 leading-relaxed font-normal max-w-2xl">Diseñado meticulosamente para el ritmo real de tu negocio. Sin aplicaciones, sin fricción técnica previa y sin ralentizar un solo segundo la atención de tu equipo.</p></div><div className="lg:col-span-5 flex flex-col justify-center"><div className="w-full max-w-md mx-auto flex flex-col -space-y-1.5">{/* Push Notification 1 */}
<div className="bg-white rounded-2xl p-4 shadow-md relative z-30 transition-transform">
<div className="flex items-center justify-between mb-1.5">
<div className="flex items-center gap-1.5">
<div className="w-4 h-4 rounded-md bg-brand-forest text-brand-mint flex items-center justify-center text-[9px] font-black leading-none">T</div>
<span className="text-[10px] font-bold text-brand-forest uppercase tracking-wider">TRIVIALA</span>
</div>
<span className="text-[10px] text-slate-400 font-medium">ahora</span>
</div>
<div className="text-left leading-tight pl-0.5 mt-1">
<p className="text-xs font-bold text-slate-900 tracking-tight">0 Fricción Técnica</p>
<p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Sin descargas de App Store ni contraseñas. El cliente juega de inmediato con la cámara nativa de su teléfono.</p>
</div>
</div>
{/* Push Notification 2 */}
<div className="bg-white rounded-2xl p-4 shadow-md relative z-20">
<div className="flex items-center justify-between mb-1.5">
<div className="flex items-center gap-1.5">
<div className="w-4 h-4 rounded-md bg-brand-forest text-brand-mint flex items-center justify-center text-[9px] font-black leading-none">T</div>
<span className="text-[10px] font-bold text-brand-forest uppercase tracking-wider">TRIVIALA</span>
</div>
<span className="text-[10px] text-slate-400 font-medium">hace 1 min</span>
</div>
<div className="text-left leading-tight pl-0.5 mt-1">
<p className="text-xs font-bold text-slate-900 tracking-tight">100% Web Nativo</p>
<p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Abre al instante en cualquier navegador, validando el WhatsApp legítimo del cliente y entregando el cupón.</p>
</div>
</div></div></div></div></div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
{/* Step 01: Table Stand & QR */}
<div className="flex flex-col bg-white rounded-2xl p-6 sm:p-8 border border-slate-200">
<div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100"><div className="flex items-baseline gap-2"><span className="text-4xl sm:text-5xl font-black text-brand-emerald tracking-tight">01</span><span className="text-xs font-extrabold uppercase tracking-wider text-brand-emerald">PASO</span></div><span className="text-xs font-semibold text-slate-500">En tu local • 0 seg</span></div>
<h3 className="text-xl font-extrabold text-brand-forest mb-2">Escanean el QR mientras esperan</h3>
<p className="text-slate-600 text-sm leading-relaxed mb-6">
          Un QR en el mostrador, la mesa, el probador o la recepción. El cliente apunta la cámara de su smartphone; sin registros pesados ni formularios molestos.
        </p>
{/* Artifact 1: Table Standee Mockup */}
<div className="mt-auto bg-[#FAF7F2] rounded-xl p-4 border border-slate-200 flex items-center gap-4">
<div className="w-12 h-12 rounded-lg bg-white border border-slate-300 p-1 flex items-center justify-center flex-shrink-0">
<svg className="w-8 h-8 text-brand-forest" fill="currentColor" viewBox="0 0 24 24">
<path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h-4v2h2v4h-2v2h4v-2h2v-4h-2v-2zm-4-4h2v2h-2v-2zm4 0h4v2h-4v-2zm-2 4v2h2v-2h-2z"></path>
</svg>
</div>
<div className="text-xs">
<p className="font-bold text-slate-800 leading-tight">QR en mostrador</p>
<p className="text-slate-500 mt-0.5">"Responde 5 preguntas y gana 10% en tu próxima compra"</p>
</div>
</div>
</div>
{/* Step 02: 1-Minute Trivia Game & WhatsApp capture */}
<div className="flex flex-col bg-white rounded-2xl p-6 sm:p-8 border-2 border-brand-emerald">
<div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100"><div className="flex items-baseline gap-2"><span className="text-4xl sm:text-5xl font-black text-brand-emerald tracking-tight">02</span><span className="text-xs font-extrabold uppercase tracking-wider text-brand-emerald">PASO</span></div><span className="text-xs font-semibold text-slate-500">En celular • 45 seg</span></div>
<h3 className="text-xl font-extrabold text-brand-forest mb-2">Juegan, aprenden y dejan WhatsApp</h3>
<p className="text-slate-600 text-sm leading-relaxed mb-6">
          5 preguntas entretenidas sobre tu negocio, tus productos o datos curiosos. Para guardar el cupón ganado ingresan su número con aviso de privacidad.
        </p>
{/* Artifact 2: WhatsApp Chat Push Notification Bubble */}
<div className="mt-auto bg-[#FAF7F2] rounded-xl p-4 border border-slate-200 flex flex-col gap-2">
<p className="text-[11px] font-bold text-brand-forest">Mensaje directo al celular del cliente</p>
<div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
<p className="font-bold text-brand-forest">Tu negocio</p>
<p className="text-slate-600 mt-0.5">¡Felicidades Sofia! 🎉 Tienes un <strong>10% en tu próxima compra</strong> guardado. Código PIN de activación: <strong>K7M2Q9</strong></p>
</div>
</div>
</div>
{/* Step 03: Cashier PIN Redemption & Repeat Visit */}
<div className="flex flex-col bg-white rounded-2xl p-6 sm:p-8 border border-slate-200">
<div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100"><div className="flex items-baseline gap-2"><span className="text-4xl sm:text-5xl font-black text-brand-emerald tracking-tight">03</span><span className="text-xs font-extrabold uppercase tracking-wider text-brand-emerald">PASO</span></div><span className="text-xs font-semibold text-slate-500">En caja • Visita #2</span></div>
<h3 className="text-xl font-extrabold text-brand-forest mb-2">Regresan y validan con PIN en caja</h3>
<p className="text-slate-600 text-sm leading-relaxed mb-6">
          Vuelven en días flojos antes del vencimiento. Tu mesero valida en 3 segundos tecleando su PIN maestro en el teléfono del cliente. Cada código se usa una sola vez.
        </p>
{/* Artifact 3: Ticket / PIN Verification Voucher */}
<div className="mt-auto bg-white rounded-xl border border-slate-200 shadow-md p-4 flex flex-col gap-3 relative select-none"><div className="flex items-center justify-between border-b border-slate-100 pb-2.5"><div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand-emerald"></span><span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">TERMINAL CAJA • TPV</span></div><span className="font-mono text-[10px] font-bold text-slate-400">TICKET #V-4092</span></div><div className="space-y-1.5 text-xs"><div className="flex items-center justify-between"><span className="text-slate-500 text-[11px]">Cupón aplicado:</span><span className="font-bold text-brand-forest text-xs">10% próxima compra</span></div><div className="flex items-center justify-between"><span className="text-slate-500 text-[11px]">Método validación:</span><span className="font-mono font-bold text-slate-700 text-[11px]">PIN Maestro (****)</span></div></div><div className="pt-2.5 border-t border-dashed border-slate-200 flex items-center justify-between"><div className="flex items-center gap-1 text-brand-forest"><svg className="w-3.5 h-3.5 text-brand-emerald flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg><span className="text-[10px] font-bold text-brand-forest tracking-tight">+1 Venta recurrente</span></div><span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-brand-forest text-white text-[10px] font-bold uppercase tracking-wide">Aprobado</span></div></div>
</div>
</div>
</div>
</section>
{/* END: HowItWorks */}
{/* BEGIN: ValueBenefits */}
<section className="py-20 md:py-28" id="beneficios">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
{/* Editorial Section Header */}
<div className="max-w-3xl mb-14"><h2 className="text-3xl sm:text-5xl font-extrabold text-brand-forest tracking-tight leading-[1.12]">Lo que puede pasar en tu negocio, <span className="highlight-word text-brand-emerald">sin complicaciones</span></h2><p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">Mira cómo un negocio local promedio convierte visitas ocasionales en ventas recurrentes todos los meses.</p></div>
{/* Integrated Operational Console Shell */}
<div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md"><div className="bg-brand-forest px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4 text-white"><div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-brand-mint"></span><span className="text-sm font-bold tracking-wide">Proyección estimada para un local promedio</span></div><div className="flex items-center gap-4 text-xs font-semibold"><span className="text-slate-200">Negocio típico • 42 clientes al día</span></div></div><div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200"><div className="lg:col-span-7 p-6 sm:p-8 bg-white flex flex-col justify-between"><div><div className="mb-6"><span className="text-xs font-extrabold uppercase tracking-wider text-brand-emerald bg-[#EAF7F2] px-2.5 py-1 rounded-full">Estimación mensual</span><h3 className="text-xl sm:text-2xl font-extrabold text-brand-forest mt-2.5 tracking-tight">El viaje del cliente en 3 momentos clave</h3><p className="text-xs sm:text-sm text-slate-500 mt-1">Así es como un QR en tu local genera visitas recurrentes sin esfuerzo operativo.</p></div><div className="space-y-4"><div className="p-4 rounded-xl border border-slate-200 bg-[#FAF7F2] flex items-start gap-4"><div className="w-10 h-10 rounded-xl bg-brand-forest text-brand-mint flex items-center justify-center font-black text-sm flex-shrink-0 mt-0.5">1</div><div className="flex-1 min-w-0"><div className="flex flex-wrap items-center justify-between gap-2"><h4 className="text-sm font-bold text-slate-900">Clientes que juegan</h4><span className="text-base font-black text-brand-forest">1,260 clientes</span></div><p className="text-xs text-slate-600 mt-1 leading-relaxed">Un promedio de 42 clientes al día descubren la trivia en 1 minuto mientras esperan su pedido y dejan su contacto para recibir el cupón.</p></div></div><div className="p-4 rounded-xl border border-slate-200 bg-[#FAF7F2] flex items-start gap-4"><div className="w-10 h-10 rounded-xl bg-brand-emerald text-white flex items-center justify-center font-black text-sm flex-shrink-0 mt-0.5">2</div><div className="flex-1 min-w-0"><div className="flex flex-wrap items-center justify-between gap-2"><h4 className="text-sm font-bold text-slate-900">Vuelven con su cupón</h4><span className="text-base font-black text-brand-emerald">438 visitas que regresan</span></div><p className="text-xs text-slate-600 mt-1 leading-relaxed">Si 35% regresa en menos de 14 días. Vuelven entre semana a canjear su cupón, reactivando horarios flojos.</p></div></div><div className="p-4 rounded-xl border-2 border-brand-emerald bg-white flex items-start gap-4"><div className="w-10 h-10 rounded-xl bg-brand-forest text-white flex items-center justify-center font-black text-sm flex-shrink-0 mt-0.5">3</div><div className="flex-1 min-w-0"><div className="flex flex-wrap items-center justify-between gap-2"><h4 className="text-sm font-bold text-brand-forest">Dinero extra en caja</h4><span className="text-lg font-black text-brand-forest">+$38,400 MXN</span></div><p className="text-xs text-slate-600 mt-1 leading-relaxed">Consumo promedio adicional directo en tu punto de venta al redimir el cupón. Ventas que no habrías tenido sin este incentivo.</p></div></div></div></div><div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs"><span className="text-slate-500 font-medium">Cálculo basado en ticket promedio de $220 MXN.</span><a className="font-bold text-brand-emerald hover:underline flex items-center gap-1" href={wa("Hola, quisiera calcular el retorno de Triviala en mi local")} target="_blank" rel="noreferrer">Calcular los números de mi local →</a></div></div><div className="lg:col-span-5 p-6 sm:p-8 bg-[#FAF7F2] flex flex-col justify-between"><div className="space-y-6"><div><div className="flex items-center justify-between mb-3"><h3 className="text-sm font-extrabold uppercase tracking-wider text-brand-forest">Tu lista de clientes es 100% tuya</h3><span className="text-xs font-bold text-brand-emerald bg-[#EAF7F2] px-2 py-0.5 rounded-full">$0 Comisiones</span></div><div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3"><div className="border-b border-slate-100 pb-2.5"><div className="flex items-center justify-between text-xs mb-1"><span className="font-bold text-slate-500">Apps de delivery</span><span className="font-bold text-amber-700">15% - 30% comisión</span></div><p className="text-xs text-slate-500 leading-snug">✕ Los clientes no son tuyos, no te dan sus teléfonos y dependes de pagar anuncios para que te vean.</p></div><div><div className="flex items-center justify-between text-xs mb-1"><span className="font-bold text-brand-forest">Con Triviala</span><span className="font-bold text-brand-emerald">$0 de comisión por venta</span></div><p className="text-xs text-slate-700 font-medium leading-snug">✓ Eres dueño de su WhatsApp legítimo para enviar promociones directas siempre que quieras.</p></div></div></div><div><div className="flex items-center justify-between mb-3"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-brand-emerald"></span><span className="text-xs font-bold uppercase tracking-wider text-brand-forest">Registro en vivo de tus clientes</span></div><span className="text-[11px] font-semibold text-slate-500">Tiempo real</span></div><div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100"><div className="p-3 flex items-center justify-between text-xs"><div className="flex items-center gap-2.5"><div className="w-7 h-7 rounded-lg bg-[#EAF7F2] text-brand-forest flex items-center justify-center font-bold text-[11px]">02</div><div><p className="font-bold text-slate-800">Carlos M.</p><p className="text-[11px] text-slate-500">WhatsApp capturado (3/3 trivia)</p></div></div><span className="text-[11px] font-medium text-slate-400">hace 3 min</span></div><div className="p-3 flex items-center justify-between text-xs"><div className="flex items-center gap-2.5"><div className="w-7 h-7 rounded-lg bg-brand-forest text-brand-mint flex items-center justify-center font-bold text-[11px]">08</div><div><p className="font-bold text-slate-800">Mariana G.</p><p className="text-[11px] text-brand-emerald font-semibold">PIN validado en caja • Canje 10%</p></div></div><span className="text-[11px] font-medium text-slate-400">hace 15 min</span></div><div className="p-3 flex items-center justify-between text-xs"><div className="flex items-center gap-2.5"><div className="w-7 h-7 rounded-lg bg-[#EAF7F2] text-brand-forest flex items-center justify-center font-bold text-[11px]">05</div><div><p className="font-bold text-slate-800">Rodrigo T.</p><p className="text-[11px] text-slate-500">Opt-in verificado para promociones</p></div></div><span className="text-[11px] font-medium text-slate-400">hace 32 min</span></div></div></div></div><div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs"><span className="text-slate-500 font-medium">Exporta tu base cuando quieras</span><a className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-300 font-bold text-brand-forest hover:bg-slate-100 transition-colors" href={wa("Quiero ver un reporte demo en Excel")} target="_blank" rel="noreferrer"><svg className="w-3.5 h-3.5 text-brand-emerald" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round"></path></svg>Descargar en Excel (.XLS)</a></div></div></div></div>
</div>
</section>
{/* END: ValueBenefits */}
{/* BEGIN: PricingSection */}
<section className="py-20 bg-[#FAF7F2] border-t border-slate-200" id="precios">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
{/* Header */}
<div className="text-center max-w-3xl mx-auto mb-16 pt-4">
  
  <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-forest tracking-tight leading-[1.12] mb-4">
    Planes claros. Sin <span className="highlight-word text-brand-emerald">comisiones</span> por venta.
  </h2>
  <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
    Precios en pesos mexicanos (MXN). El premio y la vigencia los decides tú. Empieza sin ataduras de permanencia obligatoria.
  </p>
</div>
{/* Pricing Matrix (Solid backgrounds only) */}
<div className="space-y-12">
  {/* 3 Independent Spaced Cards */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8 items-stretch">
    {/* Tier 1 */}
    <div className="p-8 sm:p-10 flex flex-col justify-between bg-white rounded-2xl border border-slate-200 shadow-md">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="px-2.5 py-1 rounded-full bg-[#EAF7F2] text-brand-emerald text-[11px] font-extrabold uppercase tracking-wide">Plan Inicial</span>
        </div>
        <h3 className="text-2xl font-extrabold text-brand-forest mt-3">Piloto 14 Días</h3>
        <div className="mt-6 mb-4 flex items-baseline gap-2">
          <span className="text-5xl font-black text-brand-forest tracking-tight">$600</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">pago único</span>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed font-normal pt-2 border-t border-slate-100">Perfecto para probar la dinámica con tus clientes y comprobar cuántos WhatsApps capturas de inmediato.</p>
      </div>
      <div className="mt-8 pt-6 border-t border-slate-100">
        <a className="block w-full py-3.5 px-6 rounded-full text-center text-sm font-bold bg-white text-brand-forest border-2 border-slate-300 hover:border-brand-forest transition-colors shadow-sm" href={wa("Hola, me interesa contratar el Plan Piloto de $600")} target="_blank" rel="noreferrer">
          Activar Piloto
        </a>
      </div>
    </div>

    {/* Tier 2 (Highlighted Solid Green) */}
    <div className="p-8 sm:p-10 bg-brand-forest text-white rounded-2xl flex flex-col justify-between border border-brand-forest shadow-md relative">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="px-2.5 py-1 rounded-full bg-brand-mint text-brand-forest text-[11px] font-black uppercase tracking-wider">Recomendado</span>
          <span className="text-xs text-brand-mint font-semibold">Más elegido</span>
        </div>
        <h3 className="text-2xl font-extrabold text-white mt-3">Mes Completo</h3>
        <div className="mt-6 mb-4 flex items-baseline gap-2">
          <span className="text-5xl font-black text-white tracking-tight">$1,200</span>
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">1 mes de juego</span>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-normal pt-2 border-t border-brand-emerald">Ideal para festivales de aniversario, meses de alta temporada o para renovar la experiencia a mitad de mes.</p>
      </div>
      <div className="mt-8 pt-6 border-t border-brand-emerald">
        <a className="block w-full py-3.5 px-6 rounded-full text-center text-sm font-extrabold bg-white hover:bg-slate-100 text-brand-forest transition-colors shadow-sm" href={wa("Hola, quiero el Plan Campaña de $1,200")} target="_blank" rel="noreferrer">
          Comenzar Campaña
        </a>
      </div>
    </div>

    {/* Tier 3 */}
    <div className="p-8 sm:p-10 flex flex-col justify-between bg-white rounded-2xl border border-slate-200 shadow-md">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="px-2.5 py-1 rounded-full bg-[#FAF7F2] text-slate-700 border border-slate-200 text-[11px] font-extrabold uppercase tracking-wide">Continuidad</span>
        </div>
        <h3 className="text-2xl font-extrabold text-brand-forest mt-3">Suscripción Continua</h3>
        <div className="mt-6 mb-4 flex items-baseline gap-2">
          <span className="text-5xl font-black text-brand-forest tracking-tight">$690</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">al mes</span>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed font-normal pt-2 border-t border-slate-100">Para marcas que adoptan la trivia como su canal permanente y automatizado de fidelización de clientes.</p>
      </div>
      <div className="mt-8 pt-6 border-t border-slate-100">
        <a className="block w-full py-3.5 px-6 rounded-full text-center text-sm font-bold bg-white text-brand-forest border-2 border-brand-forest hover:bg-brand-forest hover:text-white transition-colors shadow-sm" href={wa("Hola, me interesa el Plan Mensual de $690")} target="_blank" rel="noreferrer">
          Suscribirme Mensual
        </a>
      </div>
    </div>
  </div>

  {/* Deliverables Checklist Table */}
  <div className="p-8 sm:p-10 bg-white rounded-2xl border border-slate-200 shadow-md">
    <div className="mb-6 pb-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <h4 className="text-base font-extrabold text-brand-forest tracking-tight">Detalle de entregables y características</h4>
      <span className="text-xs font-semibold text-slate-500">Sin costos ocultos ni cargos por comisiones</span>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs sm:text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[11px]">
            <th className="py-4">Qué incluye cada opción</th>
            <th className="py-4 text-center">Piloto (14 días)</th>
            <th className="py-4 text-center text-brand-forest font-black">Campaña (1 mes)</th>
            <th className="py-4 text-center">Suscripción ($690/m)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
          <tr>
            <td className="py-4 font-semibold text-slate-900">Trivia personalizada (logo, colores y preguntas de tu marca)</td>
            <td className="py-4 text-center text-brand-forest font-bold">✓</td>
            <td className="py-4 text-center text-brand-forest font-bold">✓</td>
            <td className="py-4 text-center text-brand-forest font-bold">✓</td>
          </tr>
          <tr>
            <td className="py-4 font-semibold text-slate-900">QR en alta resolución listo para imprimir</td>
            <td className="py-4 text-center text-brand-forest font-bold">✓</td>
            <td className="py-4 text-center text-brand-forest font-bold">✓</td>
            <td className="py-4 text-center text-brand-forest font-bold">✓</td>
          </tr>
          <tr>
            <td className="py-4 font-semibold text-slate-900">Validación segura con código PIN de mesero/caja</td>
            <td className="py-4 text-center text-brand-forest font-bold">✓</td>
            <td className="py-4 text-center text-brand-forest font-bold">✓</td>
            <td className="py-4 text-center text-brand-forest font-bold">✓</td>
          </tr>
          <tr>
            <td className="py-4 font-semibold text-slate-900">Renovación de preguntas y premios a mitad de periodo</td>
            <td className="py-4 text-center text-slate-400">—</td>
            <td className="py-4 text-center text-brand-forest font-bold">Incluido</td>
            <td className="py-4 text-center text-brand-forest font-bold">Cada mes nuevo</td>
          </tr>
          <tr>
            <td className="py-4 font-semibold text-slate-900">Entrega de base de contactos en Excel (.XLS)</td>
            <td className="py-4 text-center text-slate-700">Al finalizar</td>
            <td className="py-4 text-center text-brand-forest font-bold">Reporte completo</td>
            <td className="py-4 text-center text-brand-forest font-bold">Sincronización mensual</td>
          </tr>
          <tr>
            <td className="py-4 font-semibold text-slate-900">Atención prioritaria y ajustes de soporte</td>
            <td className="py-4 text-center text-slate-600">Estándar</td>
            <td className="py-4 text-center text-brand-forest font-bold">Prioritario WhatsApp</td>
            <td className="py-4 text-center text-brand-forest font-bold">Continuo</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</div>
</section>
{/* END: PricingSection */}
{/* BEGIN: FAQSection */}
<section className="py-20 md:py-28 bg-[#FAF7F2]" id="preguntas">
<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
{/* Editorial Header */}
<div className="text-center mb-14"><div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF7F2] border border-slate-200 mb-3">
<span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-emerald">Resolviendo tus dudas</span>
</div>
<h2 className="text-3xl sm:text-5xl font-extrabold text-brand-forest tracking-tight leading-[1.12]">
Preguntas <span className="highlight-word text-brand-emerald">frecuentes</span>
</h2>
<p className="text-slate-600 mt-3 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-normal">
Todo lo que necesitas saber sobre la dinámica, validación y seguridad antes de colocar los QR en tu negocio.
</p></div>
{/* Refined Accordion List */}
<div className="space-y-4">
{/* Q1 */}
<details className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm transition-colors">
<summary className="flex justify-between items-center cursor-pointer list-none select-none gap-4">
<div className="flex items-center gap-3.5">

<h3 className="text-base sm:text-lg font-bold text-brand-forest group-open:text-brand-emerald transition-colors tracking-tight">¿Mis clientes tienen que descargar alguna app?</h3>
</div>
<div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-500 group-open:text-brand-forest group-open:rotate-180 transition-transform">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
</summary>
<div className="mt-4 pt-4 border-t border-slate-100 pl-0 text-slate-600 text-sm sm:text-base leading-relaxed">
No, absolutamente nada. Escanean el código QR con la cámara nativa de cualquier teléfono (iOS o Android) y la trivia abre al instante en el navegador web. Todo el proceso toma menos de 60 segundos y no satura la memoria del celular.
</div>
</details>
{/* Q2 */}
<details className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm transition-colors">
<summary className="flex justify-between items-center cursor-pointer list-none select-none gap-4">
<div className="flex items-center gap-3.5">

<h3 className="text-base sm:text-lg font-bold text-brand-forest group-open:text-brand-emerald transition-colors tracking-tight">¿Cómo se valida el cupón para evitar que lo usen dos veces?</h3>
</div>
<div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-500 group-open:text-brand-forest group-open:rotate-180 transition-transform">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
</summary>
<div className="mt-4 pt-4 border-t border-slate-100 pl-0 text-slate-600 text-sm sm:text-base leading-relaxed">
Cada cupón cuenta con un código único intransferible y vigencia limitada. Al pagar la cuenta en caja, tu mesero o cajero ingresa un código PIN de 4 dígitos propio del local directamente en la pantalla del cliente. El cupón queda quemado y marcado en el sistema de inmediato.
</div>
</details>
{/* Q3 */}
<details className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm transition-colors">
<summary className="flex justify-between items-center cursor-pointer list-none select-none gap-4">
<div className="flex items-center gap-3.5">

<h3 className="text-base sm:text-lg font-bold text-brand-forest group-open:text-brand-emerald transition-colors tracking-tight">¿Quién es dueño de la base de datos de números capturados?</h3>
</div>
<div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-500 group-open:text-brand-forest group-open:rotate-180 transition-transform">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
</summary>
<div className="mt-4 pt-4 border-t border-slate-100 pl-0 text-slate-600 text-sm sm:text-base leading-relaxed">
Los datos son 100% de tu negocio. Los clientes aceptan explícitamente el aviso de privacidad de tu negocio antes de recibir su cupón. Te entregamos la base en Excel limpia, estructurada y lista para usar en tus campañas de WhatsApp o mailing.
</div>
</details>
{/* Q4 */}
<details className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm transition-colors">
<summary className="flex justify-between items-center cursor-pointer list-none select-none gap-4">
<div className="flex items-center gap-3.5">

<h3 className="text-base sm:text-lg font-bold text-brand-forest group-open:text-brand-emerald transition-colors tracking-tight">¿Cuánto tiempo toma tener todo listo?</h3>
</div>
<div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-500 group-open:text-brand-forest group-open:rotate-180 transition-transform">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
</summary>
<div className="mt-4 pt-4 border-t border-slate-100 pl-0 text-slate-600 text-sm sm:text-base leading-relaxed">
En menos de 48 horas hábiles configuramos las preguntas, adaptamos tu paleta de colores y logo, y te entregamos los archivos de QR en alta resolución listos para imprimir en el formato de tu elección (acrílico de mostrador, tarjeta de mesa, póster o sticker).
</div>
</details>
</div>
</div>
</section>
{/* END: FAQSection */}
{/* BEGIN: FinalCTA */}
<section className="py-12 md:py-20 bg-[#FAF7F2]" id="demo">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="bg-brand-forest rounded-3xl p-8 sm:p-12 lg:p-20 text-white border border-brand-forest relative shadow-md overflow-hidden">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center text-left">
  {/* Left Column: Copy, Quick Benefits & CTA Button */}
  <div className="lg:col-span-7 flex flex-col items-start justify-center">
    
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12] mb-6 text-white">
      ¿Lo probamos en tu negocio <span className="highlight-word highlight-word--on-dark text-brand-mint">hoy mismo</span>?
    </h2>
    <p className="text-slate-200 text-base sm:text-lg mb-8 leading-relaxed font-normal">
      Creamos una demo interactiva con el logo y estilo de tu marca en minutos. Pruébala tú mismo en tu celular antes de decidir.
    </p>
    
    {/* Quick Benefits Checklist */}
    <div className="space-y-4 mb-10 w-full">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 rounded-full bg-brand-mint flex items-center justify-center flex-shrink-0 text-brand-forest text-xs font-black">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </div>
        <span className="text-sm font-semibold text-slate-100">Demo personalizada con la identidad de tu local en 15 min</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 rounded-full bg-brand-mint flex items-center justify-center flex-shrink-0 text-brand-forest text-xs font-black">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </div>
        <span className="text-sm font-semibold text-slate-100">Sin costo, sin tarjeta de crédito ni compromiso de permanencia</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 rounded-full bg-brand-mint flex items-center justify-center flex-shrink-0 text-brand-forest text-xs font-black">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </div>
        <span className="text-sm font-semibold text-slate-100">Lista para escanear y probar directamente en tu smartphone</span>
      </div>
    </div>

    {/* CTA Action Button & Reassurance note */}
    <div className="w-full sm:w-auto flex flex-col items-start gap-4 mt-2">
      <a className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-white hover:bg-slate-100 text-brand-forest font-extrabold text-base sm:text-lg transition-colors shadow-md" href={wa("Hola Triviala, quiero ver la demo gratuita con el logo de mi negocio")} target="_blank" rel="noreferrer">
        <svg className="w-5 h-5 fill-current text-brand-forest" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"></path>
        </svg>
        <span className="">Escríbenos por WhatsApp</span>
      </a>
      <span className="text-xs text-slate-300 font-medium pl-1 mt-1">
        Sin contratos forzosos • Atención directa en menos de 15 minutos
      </span>
    </div>
  </div>

  {/* Right Column: Interactive Chat / Instant Demo Preview Mockup */}
  <div className="lg:col-span-5 flex flex-col justify-center items-center w-full py-4 lg:py-6">
    <div className="w-full max-w-sm bg-white rounded-2xl p-6 border border-slate-200 text-slate-800 shadow-md flex flex-col gap-4 select-none">
      {/* Top WhatsApp chat header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-brand-forest flex items-center justify-center text-brand-mint font-black text-sm">
            T
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 leading-tight">Triviala • Activaciones</p>
            <p className="text-[10px] text-brand-emerald font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-mint"></span> En línea ahora
            </p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded bg-[#FAF7F2] text-slate-500 font-mono text-[10px] font-bold">DEMO LIVE</span>
      </div>

      {/* Message bubble: Customer request */}
      <div className="self-end max-w-[85%] bg-[#EAF7F2] border border-brand-emerald/20 p-3 rounded-2xl rounded-tr-sm text-xs text-slate-800">
        <p className="font-medium leading-relaxed">Hola, quiero ver la demo de Triviala adaptada a mi negocio.</p>
        <span className="block text-right text-[9px] text-slate-500 mt-1 font-mono">14:20 • Enviado</span>
      </div>

      {/* Message bubble: Triviala instant reply with interactive preview */}
      <div className="self-start max-w-[90%] bg-[#FAF7F2] border border-slate-200 p-3 rounded-2xl rounded-tl-sm text-xs text-slate-800">
        <p className="font-semibold text-brand-forest mb-1.5">¡Hola! Claro que sí ☕</p>
        <p className="text-slate-600 leading-relaxed mb-2.5">
          Aquí tienes tu trivia de prueba personalizada en 1 clic lista para probar en tu móvil:
        </p>
        <div className="bg-white rounded-xl p-2.5 border border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-brand-forest text-brand-mint flex items-center justify-center font-black text-xs flex-shrink-0">
            <svg className="w-5 h-5 text-brand-mint" fill="currentColor" viewBox="0 0 24 24"><path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h-4v2h2v4h-2v2h4v-2h2v-4h-2v-2zm-4-4h2v2h-2v-2zm4 0h4v2h-4v-2zm-2 4v2h2v-2h-2z"></path></svg>
          </div>
          <div className="text-left flex-1 min-w-0">
            <p className="text-[11px] font-bold text-slate-900 truncate">trivia.tu-local.com</p>
            <p className="text-[10px] text-brand-emerald font-semibold">Demo interactiva activa</p>
          </div>
        </div>
        <span className="block text-right text-[9px] text-slate-400 mt-1 font-mono">14:21 • Entregado</span>
      </div>

      {/* Bottom status bar */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-brand-emerald"></span> Tiempo estimado: 2 min
        </span>
        <span className="font-bold text-brand-forest">100% Gratuito</span>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</section>
{/* END: FinalCTA */}
</main>
{/* BEGIN: Footer */}
<footer className="bg-[#FAF7F2] border-t border-slate-200 py-12">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
<div className="flex items-center gap-2">
<img src="/brand/triviala-logo.svg" alt="Triviala" width="116" height="32" className="h-8 w-auto" />
</div>
<p className="text-xs text-slate-500 text-center md:text-left">
        © 2026 Triviala. Trivias con premio para negocios locales. Todos los derechos reservados.
      </p>
<div className="flex items-center gap-6 text-xs text-slate-500 font-medium">
<a className="hover:text-brand-forest" href="#como-funciona">Cómo funciona</a>
<a className="hover:text-brand-forest" href="#precios">Precios</a>
<a className="hover:text-brand-forest" href="/privacidad">Aviso de privacidad</a>
<a className="hover:text-brand-forest" href="/terminos">Términos</a>
<a className="hover:text-brand-forest" href={wa("Hola Triviala")} target="_blank" rel="noreferrer">Contacto</a>
<a className="hover:text-brand-forest" href="mailto:trivialamexico@gmail.com">trivialamexico@gmail.com</a>
</div>
</div>
</footer>
{/* END: Footer */}



    </div>
  );
}

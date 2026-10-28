export type Route =
  | { view: 'landing' }
  | { view: 'trivia'; slug: string }
  | { view: 'redeem'; slug: string }
  | { view: 'panel'; slug: string }
  | { view: 'poster'; slug: string }
  | { view: 'legal'; doc: 'privacidad' | 'terminos' }
  | { view: 'legal-trivia'; doc: 'privacidad' | 'bases'; slug: string }
  | { view: 'not-found' };

const SLUG = '([a-z0-9-]+)';
const TRIVIA_PATH = new RegExp(`^/t/${SLUG}/?$`);
const REDEEM_PATH = new RegExp(`^/canje/${SLUG}/?$`);
const PANEL_PATH = new RegExp(`^/panel/${SLUG}/?$`);
const POSTER_PATH = new RegExp(`^/cartel/${SLUG}/?$`);
const LEGAL_PATH = /^\/(privacidad|terminos)\/?$/;
const LEGAL_TRIVIA_PATH = new RegExp(`^/(privacidad|bases)/${SLUG}/?$`);

/** "/" → página de ventas · "/t/<slug>" → trivia · "/canje/<slug>" → canje · "/panel/<slug>" → resultados del negocio. */
export function parseRoute(pathname: string): Route {
  if (pathname === '/' || pathname === '') return { view: 'landing' };

  const trivia = TRIVIA_PATH.exec(pathname);
  if (trivia?.[1]) return { view: 'trivia', slug: trivia[1] };

  const redeem = REDEEM_PATH.exec(pathname);
  if (redeem?.[1]) return { view: 'redeem', slug: redeem[1] };

  const legal = LEGAL_PATH.exec(pathname);
  if (legal?.[1] === 'privacidad' || legal?.[1] === 'terminos') return { view: 'legal', doc: legal[1] };

  const legalTrivia = LEGAL_TRIVIA_PATH.exec(pathname);
  if ((legalTrivia?.[1] === 'privacidad' || legalTrivia?.[1] === 'bases') && legalTrivia[2]) {
    return { view: 'legal-trivia', doc: legalTrivia[1], slug: legalTrivia[2] };
  }

  const poster = POSTER_PATH.exec(pathname);
  if (poster?.[1]) return { view: 'poster', slug: poster[1] };

  const panel = PANEL_PATH.exec(pathname);
  if (panel?.[1]) return { view: 'panel', slug: panel[1] };

  return { view: 'not-found' };
}

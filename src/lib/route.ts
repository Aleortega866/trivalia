import { DEFAULT_TRIVIA_SLUG } from '../config/trivias';

export type Route =
  | { view: 'trivia'; slug: string }
  | { view: 'redeem'; slug: string }
  | { view: 'not-found' };

const SLUG = '([a-z0-9-]+)';
const TRIVIA_PATH = new RegExp(`^/t/${SLUG}/?$`);
const REDEEM_PATH = new RegExp(`^/canje/${SLUG}/?$`);

/** "/" → demo · "/t/<slug>" → trivia · "/canje/<slug>" → canje del negocio. */
export function parseRoute(pathname: string): Route {
  if (pathname === '/' || pathname === '') return { view: 'trivia', slug: DEFAULT_TRIVIA_SLUG };

  const trivia = TRIVIA_PATH.exec(pathname);
  if (trivia?.[1]) return { view: 'trivia', slug: trivia[1] };

  const redeem = REDEEM_PATH.exec(pathname);
  if (redeem?.[1]) return { view: 'redeem', slug: redeem[1] };

  return { view: 'not-found' };
}

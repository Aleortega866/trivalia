import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animaciones de la página de ventas.
 * - La página se ve completa sin JS: todo usa gsap.from(), así que el estado final es el CSS normal.
 * - Con "reducir movimiento" activado no se anima nada.
 */
export function useLandingAnimations() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // 1. Hero: entrada en cascada y trazo a mano que se dibuja.
      const hero = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });
      hero
        .from('#hero h1', { y: 40, autoAlpha: 0 })
        .fromTo('#hero h1 .highlight-word', { '--draw': '0%' }, { '--draw': '100%', duration: 0.9, ease: 'power2.inOut' }, '-=0.2')
        .from('#hero h1 + p', { y: 24, autoAlpha: 0 }, '-=0.9')
        .from('#hero h1 ~ div > div', { y: 16, autoAlpha: 0, stagger: 0.08 }, '-=0.6')
        .from('#hero h1 ~ div a', { y: 16, autoAlpha: 0, stagger: 0.08 }, '-=0.5')
        .from('[data-anim="phone"]', { y: 60, rotate: -3, autoAlpha: 0, duration: 1.1 }, 0.15)
        .from('[data-anim="float"]', { scale: 0.85, y: 20, autoAlpha: 0, stagger: 0.15, ease: 'back.out(1.7)', duration: 0.6 }, 0.8);

      // Flotación suave y continua de las tarjetas del celular.
      gsap.utils.toArray<HTMLElement>('[data-anim="float"]').forEach((el, i) => {
        gsap.to(el, { y: i % 2 ? 8 : -8, duration: 2.4 + i * 0.3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.6 + i * 0.2 });
      });

      // 2. Títulos de cada sección: suben y su palabra destacada se subraya al entrar.
      gsap.utils.toArray<HTMLElement>('section:not(#hero) h2').forEach((h2) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: h2, start: 'top 85%', once: true } });
        tl.from(h2, { y: 30, autoAlpha: 0, duration: 0.7, ease: 'power3.out' });
        const word = h2.querySelector('.highlight-word');
        if (word) tl.fromTo(word, { '--draw': '0%' }, { '--draw': '100%', duration: 0.8, ease: 'power2.inOut' }, '-=0.3');
      });

      // 3. Tarjetas y bloques: aparecen en grupo conforme se hace scroll.
      const cards = gsap.utils.toArray<HTMLElement>(
        'section:not(#hero) .rounded-2xl:not(.rounded-2xl .rounded-2xl), section:not(#hero) details',
      );
      gsap.set(cards, { autoAlpha: 1 });
      ScrollTrigger.batch(cards, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => gsap.from(batch, { y: 36, autoAlpha: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', overwrite: true }),
      });

      // 4. Cifras de ejemplo que cuentan hacia arriba.
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const target = Number(el.dataset.count);
        const decimals = Number(el.dataset.decimals ?? 0);
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            el.textContent = `${el.dataset.prefix ?? ''}${counter.v.toFixed(decimals)}${el.dataset.suffix ?? ''}`;
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return rootRef;
}

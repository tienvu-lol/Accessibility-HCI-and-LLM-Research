import { gsap } from 'gsap'

/** GSAP demo variables. The Motion panel edits these live; replay() reads them fresh each time. */
export const MOTION = {
  duration: 0.7, // seconds per element
  stagger: 0.09, // seconds between pipeline steps
  distance: 18, // px the steps travel in from below
  ease: 'power3.out',
}

export const EASES = ['power3.out', 'expo.out', 'back.out(1.6)', 'elastic.out(1, 0.6)', 'none']

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * The one orchestrated moment: the study pipeline fills in left to right (as on the poster), then the
 * spend bar, then the status matrix. Call inside a gsap context so everything is cleaned up on revert.
 */
export function buildIntro(root: HTMLElement) {
  const q = <T extends Element>(s: string) => gsap.utils.toArray<T>(s, root)
  const { duration, stagger, distance, ease } = MOTION
  const tl = gsap.timeline({ defaults: { ease, duration } })

  tl.from(q('[data-step]'), { y: distance, opacity: 0, stagger })
    .from(q('[data-bar]'), { scaleX: 0, transformOrigin: 'left center', stagger, duration: duration * 1.4 }, '<0.15')
    .addLabel('spend', '>-0.2')
    .from(q('[data-spend-fill]'), { scaleX: 0, transformOrigin: 'left center', duration: duration * 1.6 }, 'spend')
    .from(q('[data-spend-mark]'), { opacity: 0, scaleY: 0, stagger: 0.12 }, '>-0.4')
    .from(q('[data-cell]'), { opacity: 0, scale: 0.4, duration: duration * 0.6, stagger: { each: 0.012, grid: [6, 12], from: 'start' } }, '<0.1')

  // Repair loop is the active step: a slow ring keeps it readable as "in progress".
  gsap.to(q('[data-pulse]'), { boxShadow: '0 0 0 5px rgb(255 100 6 / 0)', duration: 1.4, repeat: -1, ease: 'power1.out', startAt: { boxShadow: '0 0 0 0 rgb(255 100 6 / 0.55)' } })

  const spend = { v: 0 }
  tl.to(spend, { v: 128.4, duration: duration * 1.6, onUpdate: () => q('[data-spend-value]').forEach((el) => (el.textContent = `$${spend.v.toFixed(2)}`)) }, 'spend')
  return tl
}

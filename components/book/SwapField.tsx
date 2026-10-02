import React from 'react';
import { createPortal } from 'react-dom';
import type * as MatterNS from 'matter-js';
import { PHONE_SWAPS, SWAPS, type Swap } from '../../content/replaced';

// The falling blocks on the booking page: each is an app people pay for; tap one and it flips to what takes its place.
// They're real page elements moved by a 2D physics engine (Matter.js, loaded with this page only): they drop in, land
// on the calendar card and the floor, and can be grabbed and thrown. The calendar card is solid, so a block can rest
// on it but never cover it. Nothing runs while the field is off screen or everything has settled, and with reduced
// motion the blocks just sit in a row above the calendar.

type Props = {
  /** The section the blocks live in (their coordinates are relative to it). */
  stage: React.RefObject<HTMLElement>;
  /** Elements the blocks collide with (the calendar card). */
  solids: React.RefObject<HTMLElement>[];
  /** The band above the calendar: where blocks sit for reduced motion, and the target for the first drops. */
  ledge: React.RefObject<HTMLElement>;
  /** Flip every block to its replacement (after a booking). */
  flipAll?: boolean;
};

const PHONE = 768;

export const SwapField: React.FC<Props> = ({ stage, solids, ledge, flipAll = false }) => {
  const [phone, setPhone] = React.useState(() => typeof window !== 'undefined' && window.innerWidth < PHONE);
  const [still, setStill] = React.useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const swaps = React.useMemo<Swap[]>(() => (phone ? SWAPS.filter((s) => PHONE_SWAPS.includes(s.paid)) : SWAPS), [phone]);
  const [flipped, setFlipped] = React.useState<Set<string>>(new Set());
  const els = React.useRef<(HTMLButtonElement | null)[]>([]);
  els.current.length = swaps.length;
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const toggle = (k: string) => setFlipped((f) => { const n = new Set(f); if (n.has(k)) n.delete(k); else n.add(k); return n; });

  React.useEffect(() => { if (flipAll) setFlipped(new Set(SWAPS.map((s) => s.paid))); }, [flipAll]);

  React.useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setStill(m.matches);
    const r = () => setPhone(window.innerWidth < PHONE);
    m.addEventListener('change', on); window.addEventListener('resize', r);
    return () => { m.removeEventListener('change', on); window.removeEventListener('resize', r); };
  }, []);

  // the physics
  React.useEffect(() => {
    if (still) return;
    const host = stage.current; if (!host) return;
    let dead = false, raf = 0;
    let stopAll = () => {};
    // sizes are measured from the elements, so wait for the theme's fonts first
    Promise.all([import('matter-js'), document.fonts?.ready]).then(([M]: [typeof MatterNS, unknown]) => {
      if (dead) return;
      const { Engine, Bodies, Body, Composite, Constraint, Sleeping, Events } = M;
      const engine = Engine.create({ enableSleeping: true, positionIterations: 8, velocityIterations: 6 });
      engine.gravity.y = phone ? 0.9 : 1;
      const world = engine.world;
      let visible = true, last = 0, acc = 0, running = false;
      let drag: { c: MatterNS.Constraint; b: Block; x0: number; y0: number; t0: number; moved: boolean; id: number } | null = null;
      type Block = { el: HTMLButtonElement | null; body: MatterNS.Body; w: number; h: number };
      let blocks: Block[] = [];
      const rel = (r: DOMRect) => { const h = host.getBoundingClientRect(); return { x: r.left - h.left, y: r.top - h.top, w: r.width, h: r.height }; };

      // the walls, the floor and the solids, rebuilt whenever the layout moves
      let statics: MatterNS.Body[] = [];
      let solidRects: { x: number; y: number; w: number; h: number }[] = [];
      const build = () => {
        Composite.remove(world, statics);
        const W = host.clientWidth, H = host.clientHeight, t = 200;
        solidRects = solids.map((s) => s.current).filter(Boolean).map((e) => rel((e as HTMLElement).getBoundingClientRect()));
        statics = [
          Bodies.rectangle(W / 2, H + t / 2, W * 3, t, { isStatic: true, friction: 0.9 }),
          Bodies.rectangle(-t / 2, H / 2 - H, t, H * 4, { isStatic: true }),
          Bodies.rectangle(W + t / 2, H / 2 - H, t, H * 4, { isStatic: true }),
          ...solidRects.map((r) => Bodies.rectangle(r.x + r.w / 2, r.y + r.h / 2, r.w, r.h, { isStatic: true, friction: 0.8 })),
        ];
        Composite.add(world, statics);
        // everything wakes (a block asleep on a ledge that moved would hang in the air), and a block the layout grew
        // into gets lifted out on top
        for (const b of blocks) Sleeping.set(b.body, false);
        for (const b of blocks) for (const r of solidRects) {
          if (b.body.position.x > r.x && b.body.position.x < r.x + r.w && b.body.position.y > r.y && b.body.position.y < r.y + r.h) {
            Body.setPosition(b.body, { x: b.body.position.x, y: r.y - b.h }); Sleeping.set(b.body, false);
          }
        }
        wake();
      };

      // one body per block, sized to the element (both faces are stacked in it, so it's as wide as the wider one)
      const W0 = host.clientWidth;
      const ledgeR = ledge.current ? rel(ledge.current.getBoundingClientRect()) : { x: W0 * 0.2, y: 0, w: W0 * 0.6, h: 80 };
      const cal = solids[0]?.current ? rel(solids[0].current.getBoundingClientRect()) : ledgeR;
      const gutterL = cal.x, gutterR = W0 - (cal.x + cal.w);
      const avgW = els.current.reduce((a, e) => a + (e?.offsetWidth ?? 120), 0) / Math.max(1, els.current.length);
      const onLedge = gutterL < avgW + 24 ? Infinity : Math.max(3, Math.floor(cal.w / (avgW + 14)));
      let ledgeCount = 0, side = 0;
      blocks = els.current.map((el, i): Block => {
        const w = el?.offsetWidth ?? 120, h = el?.offsetHeight ?? 44;
        let x: number;
        if (ledgeCount < onLedge) { ledgeCount++; x = cal.x + w / 2 + 6 + Math.random() * Math.max(1, cal.w - w - 12); }
        else {
          const left = side++ % 2 === 0 && gutterL > w ? true : gutterR <= w;
          x = left ? 6 + w / 2 + Math.random() * Math.max(1, gutterL - w - 12) : cal.x + cal.w + 6 + w / 2 + Math.random() * Math.max(1, gutterR - w - 12);
        }
        const body = Bodies.rectangle(x, -h - i * (phone ? 34 : 26) - Math.random() * 40, w, h, {
          chamfer: { radius: Math.min(6, h / 4) }, friction: 0.6, frictionAir: 0.012, restitution: 0.12, density: 0.0016,
          angle: (Math.random() - 0.5) * 0.9, sleepThreshold: 50,
        });
        return { el, body, w, h };
      });
      Composite.add(world, blocks.map((b) => b.body));

      // draw: the elements follow their bodies
      const draw = () => {
        for (const b of blocks) {
          if (!b.el) continue;
          const { x, y } = b.body.position;
          b.el.style.transform = `translate3d(${(x - b.w / 2).toFixed(1)}px, ${(y - b.h / 2).toFixed(1)}px, 0) rotate(${b.body.angle.toFixed(4)}rad)`;
        }
      };
      const STEP = 1000 / 60;
      const loop = (t: number) => {
        if (!running) return;
        acc += Math.min(64, last ? t - last : STEP); last = t;
        while (acc >= STEP) { Engine.update(engine, STEP); acc -= STEP; }
        draw();
        const asleep = !drag && blocks.every((b) => b.body.isSleeping || b.body.position.y > host.clientHeight + 400);
        if (asleep || !visible || document.hidden) { running = false; return; }
        raf = requestAnimationFrame(loop);
      };
      function wake() { if (running || !visible || dead) return; running = true; last = 0; raf = requestAnimationFrame(loop); }

      // grab, drag and throw; a tap flips
      const local = (e: PointerEvent) => { const h = host.getBoundingClientRect(); return { x: e.clientX - h.left, y: e.clientY - h.top }; };
      const down = (b: Block) => (e: PointerEvent) => {
        if (drag || (e.pointerType === 'mouse' && e.button !== 0)) return;
        e.preventDefault();
        const p = local(e);
        Sleeping.set(b.body, false);
        const c = Constraint.create({ pointA: p, bodyB: b.body, pointB: { x: p.x - b.body.position.x, y: p.y - b.body.position.y }, stiffness: 0.12, damping: 0.08, length: 0 });
        Composite.add(world, c);
        drag = { c, b, x0: e.clientX, y0: e.clientY, t0: performance.now(), moved: false, id: e.pointerId };
        try { b.el?.setPointerCapture(e.pointerId); } catch { /* the window listeners still see the drag */ }
        b.el?.classList.add('is-grabbed');
        wake();
      };
      const move = (e: PointerEvent) => {
        if (!drag || e.pointerId !== drag.id) return;
        drag.c.pointA = local(e);
        if (Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) > 6) drag.moved = true;
      };
      const up = (e: PointerEvent) => {
        if (!drag || e.pointerId !== drag.id) return;
        const d = drag; drag = null;
        Composite.remove(world, d.c);
        d.b.el?.classList.remove('is-grabbed');
        if (!d.moved && performance.now() - d.t0 < 450) { const k = d.b.el?.dataset.k; if (k) toggle(k); Body.setAngularVelocity(d.b.body, (Math.random() - 0.5) * 0.15); }
        wake();
      };
      const offs = blocks.map((b) => {
        const h = down(b);
        b.el?.addEventListener('pointerdown', h);
        return () => b.el?.removeEventListener('pointerdown', h);
      });
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
      window.addEventListener('pointercancel', up);

      // a block that settles off-stage (thrown hard) comes back from the top
      Events.on(engine, 'afterUpdate', () => {
        const H = host.clientHeight;
        for (const b of blocks) if (b.body.position.y > H + 300 || b.body.position.x < -200 || b.body.position.x > host.clientWidth + 200) {
          Body.setPosition(b.body, { x: Math.min(host.clientWidth - b.w, Math.max(b.w, host.clientWidth / 2 + (Math.random() - 0.5) * host.clientWidth * 0.8)), y: -b.h * 2 });
          Body.setVelocity(b.body, { x: 0, y: 0 });
        }
      });

      const ro = new ResizeObserver(() => build());
      ro.observe(host); solids.forEach((s) => s.current && ro.observe(s.current));
      // a theme switch changes the fonts, so the blocks change size: reshape each body to match (unrotated, so the
      // rectangle stays a rectangle)
      const bro = new ResizeObserver((entries) => {
        for (const en of entries) {
          const b = blocks.find((x) => x.el === en.target); if (!b?.el) continue;
          const w = b.el.offsetWidth, h = b.el.offsetHeight;
          if (Math.abs(w - b.w) < 0.5 && Math.abs(h - b.h) < 0.5) continue;
          const a = b.body.angle; Body.setAngle(b.body, 0); Body.scale(b.body, w / b.w, h / b.h); Body.setAngle(b.body, a);
          b.w = w; b.h = h; Sleeping.set(b.body, false);
        }
        wake();
      });
      blocks.forEach((b) => b.el && bro.observe(b.el));
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) wake(); }, { threshold: 0 });
      io.observe(host);
      const vis = () => { if (!document.hidden) wake(); };
      document.addEventListener('visibilitychange', vis);
      // the floor, walls and calendar go in last (building wakes the loop), then the drop starts
      build();

      stopAll = () => {
        cancelAnimationFrame(raf); running = false;
        offs.forEach((f) => f()); ro.disconnect(); bro.disconnect(); io.disconnect();
        window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
        document.removeEventListener('visibilitychange', vis);
        Engine.clear(engine); Composite.clear(world, false);
      };
    });
    return () => { dead = true; stopAll(); };
  }, [still, phone, stage, solids, ledge]);

  const block = (s: Swap, i: number, staticMode: boolean) => {
    const on = flipped.has(s.paid);
    return (
      <button key={s.paid} ref={(e) => { els.current[i] = e; }} data-k={s.paid} type="button" tabIndex={-1} aria-hidden="true"
        onClick={staticMode ? () => toggle(s.paid) : undefined}
        className={`swap-block ${staticMode ? 'relative' : 'absolute left-0 top-0 will-change-transform'} ${on ? 'is-flipped' : ''}`}
        style={staticMode ? undefined : { transform: 'translate3d(-9999px,-9999px,0)' }}>
        <span className="swap-face swap-front"><span className="swap-tag">{phone ? '$' : 'Paying for'}</span><span className="swap-name">{s.paid}</span></span>
        <span className="swap-face swap-back"><span className="swap-tag">{s.kind === 'module' ? 'Module' : 'Open source'}</span><span className="swap-name">→ {s.with}</span></span>
      </button>
    );
  };

  if (still) return mounted && ledge.current ? createPortal(
    <div className="flex flex-wrap justify-center gap-2 px-4 py-3">{swaps.slice(0, phone ? 8 : 14).map((s, i) => block(s, i, true))}</div>, ledge.current,
  ) : null;
  return <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 [&>button]:pointer-events-auto">{swaps.map((s, i) => block(s, i, false))}</div>;
};

import { useEffect, useRef } from 'react';
import './SwingingSign.css';

const HANGER_SPRITE = 'https://i.imgur.com/ifk0SLH.png';

/** A rope-and-hanger sign that swings gently and pays out as the page
 *  scrolls, like something hanging from a shelf above the fold.
 *
 *  `hangerWidth`/`hangerHeight` size the hanger frame; the sprite sheet is
 *  six of those frames wide, so its background-size/position derive from
 *  them. Pass `scrollRef` when the swinging happens inside a scrollable
 *  panel rather than the window itself. */
export default function SwingingSign({
  left = '6%',
  ropeLength = 300,
  hangerWidth = 120,
  hangerHeight = 168,
  swingDeg = 4,
  scrollRef,
}) {
  const ropeRef = useRef(null);
  const hangerRef = useRef(null);

  useEffect(() => {
    const scroller = () => scrollRef?.current || null;
    const readY = () => {
      const el = scroller();
      return el ? el.scrollTop : window.scrollY || document.documentElement.scrollTop || 0;
    };

    let target = readY();
    let current = target;
    let raf = 0;

    const onScroll = () => {
      target = readY();
    };

    const scrollTarget = scroller() || window;
    scrollTarget.addEventListener('scroll', onScroll, { passive: true });

    const loop = () => {
      current += (target - current) * 0.06;
      if (ropeRef.current) ropeRef.current.style.height = `${ropeLength + current}px`;
      if (hangerRef.current) hangerRef.current.style.top = `${ropeLength - hangerWidth / 5 + current}px`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      scrollTarget.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [scrollRef, ropeLength, hangerWidth]);

  return (
    <div className="swinging-sign" style={{ left, '--sway-deg': `${swingDeg}deg` }}>
      <div ref={ropeRef} className="swinging-sign__rope" />
      <div
        ref={hangerRef}
        className="swinging-sign__hanger"
        style={{
          left: -0.3 * hangerWidth - 2,
          width: hangerWidth,
          height: hangerHeight,
          backgroundImage: `url(${HANGER_SPRITE})`,
          backgroundSize: `${hangerWidth * 6}px ${hangerHeight}px`,
          backgroundPosition: `-${hangerWidth}px 0`,
        }}
      />
    </div>
  );
}

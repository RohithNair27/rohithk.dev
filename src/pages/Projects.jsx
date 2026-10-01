import { useEffect, useRef } from 'react';
import HomeButton from '../components/HomeButton/HomeButton';
import BackLink from '../components/BackLink/BackLink';
import Billboard from '../components/Billboard/Billboard';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import { projects } from '../data/projects';
import './Projects.css';

const CLOUD_SPRITE = 'https://assets.codepen.io/721952/clouds.png';
const WALK_SPRITE = 'https://i.imgur.com/ifk0SLH.png';

const CLOUDS = [
  { left: '4%', top: '6%', scale: 0.55, offset: 0 },
  { left: '44%', top: '3%', scale: 0.68, offset: 240 },
  { left: '78%', top: '12%', scale: 0.5, offset: 480 },
  { left: '24%', top: '20%', scale: 0.42, offset: 1080 },
];

/**
 * Projects, reimagined as billboards along a roadside: a horizontally
 * scrolling track of signs, each one styled by its `type` (see
 * `BOARD_TYPES` in data/projects.js), with a walking figure that paces the
 * scroll and a progress bar tracking how far down the road you are.
 */
export default function Projects() {
  const trackRef = useRef(null);
  const cloudsRef = useRef(null);
  const barRef = useRef(null);
  const walkRef = useRef(null);
  const walkerRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let target = 0;
    let current = 0;
    let dir = 1;
    let frame = 0;
    let lastFrame = 0;
    let raf = 0;

    const max = () => Math.max(0, track.scrollWidth - window.innerWidth);

    const onWheel = (e) => {
      const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      target = Math.min(max(), Math.max(0, target + d * 0.35));
      e.preventDefault();
    };
    const onKey = (e) => {
      const step = window.innerWidth * 0.5;
      if (e.key === 'ArrowRight') target = Math.min(max(), target + step);
      else if (e.key === 'ArrowLeft') target = Math.max(0, target - step);
      else return;
      e.preventDefault();
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);

    const loop = () => {
      const prev = current;
      current += (target - current) * 0.055;
      const delta = current - prev;

      track.style.transform = `translateX(${-current}px)`;
      if (cloudsRef.current) {
        cloudsRef.current.style.transform = `translateX(${-current * 0.22}px)`;
      }
      if (barRef.current) {
        const m = max();
        barRef.current.style.width = `${m ? (current / m) * 100 : 0}%`;
      }
      if (Math.abs(delta) > 0.4) {
        if (delta > 0 && dir !== 1) dir = 1;
        else if (delta < 0 && dir !== -1) dir = -1;
        if (walkerRef.current) {
          walkerRef.current.style.transform = `translateX(-50%) scaleX(${dir})`;
        }
        const now = performance.now();
        if (walkRef.current && now - lastFrame > 133) {
          lastFrame = now;
          frame = (frame + 1) % 6;
          walkRef.current.style.backgroundPosition = `${-196 * frame}px 0px`;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="billboard-scene">
      <div className="billboard-scene__clouds" ref={cloudsRef} aria-hidden="true">
        {CLOUDS.map((cloud, i) => (
          <div
            key={i}
            className="billboard-scene__cloud"
            style={{
              left: cloud.left,
              top: cloud.top,
              transform: `scale(${cloud.scale})`,
              backgroundImage: `url(${CLOUD_SPRITE})`,
              backgroundPosition: `0 -${cloud.offset}px`,
            }}
          />
        ))}
      </div>

      <div className="billboard-scene__ground" />

      <div className="billboard-scene__track" ref={trackRef}>
        <div className="billboard-scene__intro">
          <h1 className="billboard-scene__title">Projects</h1>
          <p className="billboard-scene__intro-copy">
            Signs along the road. Scroll sideways to walk past them.
          </p>
          <div className="billboard-scene__hint">scroll &rarr;</div>
        </div>

        {projects.map((project, i) => (
          <Billboard key={project.id} project={project} index={i} />
        ))}

        <div className="billboard-scene__outro">
          <div className="billboard-scene__outro-title">end of the road</div>
          <div className="billboard-scene__outro-link">
            <BackLink />
          </div>
        </div>
      </div>

      <div className="billboard-scene__walker" ref={walkerRef} aria-hidden="true">
        <div
          className="billboard-scene__walk"
          ref={walkRef}
          style={{ backgroundImage: `url(${WALK_SPRITE})` }}
        />
      </div>

      <ProgressBar ref={barRef} />

      <HomeButton />
      <div className="billboard-scene__vignette" aria-hidden="true" />
    </div>
  );
}

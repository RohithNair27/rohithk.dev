import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import { TITLE_LETTERS, CLOUD_POSITIONS, NAV } from '../data/kaiju';
import './Home.css';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const CLOUD_SPRITE = 'https://assets.codepen.io/721952/clouds.png';
const DEBRIS_SPRITE = 'https://assets.codepen.io/721952/debris.png';
const DUST_SPRITE = 'https://assets.codepen.io/721952/filmDust.png';
const WALK_SPRITE = 'https://i.imgur.com/ifk0SLH.png';

const LABELS = [
  { sel: '.homesTxt', at: 1308 },
  { sel: '.hutTxt', at: 1496 },
  { sel: '.pagodaTxt', at: 2000 },
  { sel: '.towerTxt', at: 2400 },
  { sel: '.gatesTxt', at: 2730 },
];

/**
 * The animated "walk" landing scene: scrolling drags a walking figure
 * along a path through a hillside, past labelled buildings that link out
 * to the other pages. Ported from the original GSAP/ScrollTrigger build,
 * scoped to this component's own DOM subtree via refs instead of global
 * ids so it can mount and unmount cleanly as a route.
 */
export default function Home() {
  const navigate = useNavigate();
  const sceneRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const qs = (sel) => scene.querySelectorAll(sel);
    const qs1 = (sel) => scene.querySelector(sel);

    // This scene drives its "scroll" horizontally off a very wide track;
    // every other page in the app scrolls normally, so the body's
    // scroll behavior is scoped (via this class, see index.css) to this
    // page's lifetime only.
    document.documentElement.classList.add('kaiju-scroll');

    let walkDir = 1;
    let povMoving = false;
    let tick;
    let dustLoopTl;
    const timers = [];
    // Cloud/debris/dust bits are plain DOM nodes appended imperatively below;
    // track them so cleanup can remove them. Without this, StrictMode's
    // double-invoked effect (or a route revisit) appends a second set on
    // top of the first, stacking duplicate clouds on screen.
    const appendedEls = [];

    gsap
      .timeline()
      .set(qs1('#scrollDist'), { width: '750%', height: '100%' })
      .set(qs1('#container'), {
        position: 'fixed',
        width: 4100,
        height: 3000,
        transformOrigin: '0 0',
        left: window.innerWidth / 2,
        top: window.innerHeight / 2 + 100,
      })
      .set(qs('.seq'), { xPercent: -50, yPercent: -50, scale: 0.6, transformOrigin: '50% 50%' })
      .set(qs1('#mouth'), { x: 35, y: -240 })
      .set(qs1('#bg'), { left: 100, top: 1000 })
      .set(qs('.breakable'), { xPercent: -50, yPercent: -100, draggable: false, cursor: 'pointer' })
      .set(qs1('#tower'), { x: 2400, y: 1750 })
      .set(qs('.towerTxt'), { x: 2400, y: 1360, xPercent: -50 })
      .set(qs1('#pagoda'), { x: 2000, y: 1702 })
      .set(qs('.pagodaTxt'), { x: 2000, y: 1520, xPercent: -50 })
      .set(qs1('#hut'), { x: 1496, y: 1860 })
      .set(qs('.hutTxt'), { x: 1440, y: 1665 })
      .set(qs1('#homes'), { x: 1308, y: 1923 })
      .set(qs('.homesTxt'), { x: 1308, y: 1800, xPercent: -50 })
      .set(qs1('#gates'), { x: 2730, y: 1584 })
      .set(qs('.gatesTxt'), { x: 2660, y: 1404 })
      .set(qs('.endTxt'), { x: 3300, y: 1500 })
      .to(qs1('#container'), { opacity: 1, ease: 'power1.inOut', duration: 1 }, 0.3);

    const onResize = () =>
      gsap.set(qs1('#container'), {
        left: window.innerWidth / 2,
        top: window.innerHeight / 2 + 100,
      });
    window.addEventListener('resize', onResize);

    CLOUD_POSITIONS.forEach((pos, i) => {
      const cloud = document.createElement('div');
      gsap.set(cloud, {
        attr: { class: 'cloud' },
        width: 440,
        height: 120,
        scale: 0.3 + 0.5 * Math.random(),
        left: pos[0],
        top: pos[1],
        xPercent: -50,
        yPercent: -100,
        backgroundImage: `url(${CLOUD_SPRITE})`,
        backgroundPosition: `0 -${(i % 15) * 120}px`,
      });
      qs1('#bg').append(cloud);
      appendedEls.push(cloud);
    });

    for (let i = 0; i < 15; i++) {
      const bit = document.createElement('div');
      gsap.set(bit, {
        attr: { class: 'debris' },
        width: 70,
        height: 70,
        scale: 0,
        backgroundImage: `url(${DEBRIS_SPRITE})`,
        backgroundPosition: `-${(i % 15) * 70}px 0`,
      });
      qs1('#container').append(bit);
      appendedEls.push(bit);
    }

    gsap
      .timeline({
        scrollTrigger: {
          trigger: qs1('#scrollDist'),
          horizontal: true,
          start: 1800,
          end: 1801,
          toggleActions: 'play none reverse reverse',
        },
      })
      .to(qs('.titleChar'), { duration: 0.6, scale: 0, stagger: 0.1, ease: 'expo.in' }, 0)
      .to(qs1('.kicker'), { duration: 0.4, opacity: 0, ease: 'power1.inOut' }, 0)
      .to(qs1('.resumeBtn'), { duration: 0.5, x: -500, y: 6, ease: 'power2.inOut' }, 0)
      .to(qs1('.intro'), { duration: 0.1, autoAlpha: 0 }, '-=0.1')
      .to(qs1('.clickHint'), { duration: 0.4, autoAlpha: 1, ease: 'power1.out' }, 0.4);

    gsap
      .timeline({
        defaults: { ease: 'none', duration: 0.1 },
        scrollTrigger: {
          trigger: qs1('#scrollDist'),
          horizontal: true,
          start: 'left left',
          end: 'right right',
          scrub: 0.5,
          onUpdate: (s) => {
            walkDir = s.direction;
            if (barRef.current) barRef.current.style.width = `${s.progress * 100}%`;
          },
        },
      })
      .to(
        qs1('.kaiju'),
        {
          duration: 10,
          motionPath: { path: qs1('.walkPath'), start: 0.09, end: 1, alignOrigin: [0.5, 0.5], autoRotate: true },
          immediateRender: true,
        },
        0,
      )
      .from(qs('.endTxt'), { opacity: 0, yPercent: 75, ease: 'power1' }, 9.3);

    const labels = LABELS.map((l) => {
      const el = qs1(l.sel);
      gsap.set(el, { opacity: 0, yPercent: 75, transformOrigin: '50% 100%' });
      return { ...l, el, shown: false };
    });

    const walkEl = qs1('.walk');
    let frame = 0;
    let lastFrameTime = 0;

    tick = () => {
      gsap.to(qs1('#container'), {
        duration: 0.5,
        ease: 'sine',
        x: -gsap.getProperty(qs1('.kaiju'), 'x'),
        y: -gsap.getProperty(qs1('.kaiju'), 'y'),
      });
      povMoving =
        Math.abs(gsap.getProperty(qs1('#container'), 'x') + gsap.getProperty(qs1('.kaiju'), 'x')) > 5;
      if (walkEl && povMoving) {
        const now = performance.now();
        if (now - lastFrameTime > 133) {
          lastFrameTime = now;
          frame = (frame + 1) % 6;
          walkEl.style.backgroundPosition = `${-196 * frame}px 0px`;
        }
      }
      const kx = gsap.getProperty(qs1('.kaiju'), 'x');
      labels.forEach((l) => {
        if (!l.el || getComputedStyle(l.el).visibility === 'hidden') return;
        const near = Math.abs(kx - l.at) < 340;
        if (near !== l.shown) {
          l.shown = near;
          gsap.to(l.el, { opacity: near ? 1 : 0, yPercent: near ? 0 : 75, duration: 0.35, ease: 'power1.out', overwrite: true });
        }
      });

      gsap.set(qs1('#mouth'), { transformOrigin: '-35px 0', scaleX: walkDir });
      gsap.set(qs1('.walk'), { transformOrigin: '50% 0', scaleX: walkDir });
      gsap.set(qs('.seq'), { xPercent: -50 });
    };
    gsap.ticker.add(tick);

    for (let i = 0; i < 8; i++) {
      const d = document.createElement('div');
      qs1('.dust').appendChild(d);
      appendedEls.push(d);
      gsap.set(d, {
        attr: { class: 'd' },
        width: 30,
        height: 30,
        backgroundImage: `url(${DUST_SPRITE})`,
        backgroundPosition: `0 -${(8 % i) * 30}px`,
      });
    }
    const dustLoop = () => {
      dustLoopTl = gsap.timeline({ onComplete: dustLoop }).set(
        qs('.d'),
        {
          x: () => window.innerWidth * Math.random(),
          y: () => window.innerHeight * Math.random(),
          rotation: () => 360 * Math.random(),
          scale: () => Math.random(),
          opacity: () => Math.random(),
        },
        0.07,
      );
    };
    dustLoop();

    return () => {
      window.removeEventListener('resize', onResize);
      timers.forEach(clearTimeout);
      if (tick) gsap.ticker.remove(tick);
      if (dustLoopTl) dustLoopTl.kill();
      ScrollTrigger.getAll().forEach((s) => s.kill());
      appendedEls.forEach((el) => el.remove());
      document.documentElement.classList.remove('kaiju-scroll');
    };
  }, []);

  const go = (path) => (e) => {
    e.stopPropagation();
    navigate(path);
  };
  const mail = (e) => {
    e.stopPropagation();
    window.location.href = NAV.email;
  };

  return (
    <div id="kaijuScene" className="kaiju-scene" ref={sceneRef}>
      <div id="scrollDist" />

      <div id="container" style={{ opacity: 0 }}>
        <div id="bg">
          <img src="https://assets.codepen.io/721952/hillside.png" alt="hillside" />
        </div>

        <img className="breakable" id="homes" src="https://assets.codepen.io/721952/homes.png" alt="homes" onClick={go('/about')} />
        <img className="breakable" id="hut" src="https://assets.codepen.io/721952/hut.png" alt="huts" onClick={go('/experience')} />
        <img className="breakable" id="pagoda" src="https://assets.codepen.io/721952/pagoda.png" alt="pagoda" />
        <img className="breakable" id="gates" src="https://assets.codepen.io/721952/gates.png" alt="palace gates" onClick={mail} />

        <NavLabel className="homesTxt" onActivate={go('/about')}>
          About Me
        </NavLabel>
        <NavLabel className="hutTxt" onActivate={go('/experience')}>
          Experience
        </NavLabel>
        <NavLabel className="pagodaTxt" onActivate={go('/projects')}>
          Projects
        </NavLabel>
        <NavLabel className="towerTxt" onActivate={go('/qa-lab')}>
          QA Lab
        </NavLabel>
        <NavLabel className="gatesTxt" onActivate={mail}>
          Contact Me
        </NavLabel>
        <div className="endTxt" style={{ whiteSpace: 'nowrap' }}>
          still a lot of way to climb
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <clipPath id="seqBox">
            <rect width="196" height="273" />
          </clipPath>
          <path
            className="walkPath"
            fill="none"
            stroke="none"
            d="M251.5,2231.5c262,0,373.7-41.5,498.5-41.8c124.5-0.2,215.8-52,247.5-76.2s164.2-113.8,225-135s141-36,262-125 c46.5-34.2,137-93,236-114s347.2-31.8,435-32s287.2-73.8,354-83s238.2-17.8,277.2-23.8s177-12,219-33s232.3-150.3,293.8-187.2"
          />
          <g className="kaiju">
            <foreignObject className="seq" width="196" height="273">
              <div
                className="walk"
                style={{
                  position: 'relative',
                  width: 196,
                  height: 273,
                  backgroundImage: `url(${WALK_SPRITE})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1176px 273px',
                }}
              />
            </foreignObject>
            <image id="mouth" opacity="0" href="https://assets.codepen.io/721952/mouth.png" />
          </g>
        </svg>

        <img className="breakable" id="tower" src="https://assets.codepen.io/721952/tower.png" alt="radio tower" onClick={go('/qa-lab')} />
      </div>

      <div className="dust" />

      <ProgressBar ref={barRef} />

      <a className="resumeBtn" href={NAV.linkedin} target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>

      <div className="clickHint">click a building to explore</div>
      <div className="moveHint">
        <kbd>&larr;</kbd>
        <kbd>&rarr;</kbd>
        <span>arrow keys or scroll to walk</span>
      </div>

      <div className="intro">
        <div className="kicker">hello my name is</div>
        <div className="preTitle" aria-label="Rohith">
          {TITLE_LETTERS.map((l, i) => (
            <span
              key={i}
              className="titleChar"
              style={{
                fontSize: l.fontSize,
                transform: `rotate(${l.rotate}deg) translateY(${l.translateY}px)`,
              }}
            >
              {l.char}
            </span>
          ))}
        </div>
      </div>

      <div className="blurb">
        <div className="blurbLine">
          <div className="blurbTxt">Frontend and QA Engineer</div>
        </div>
        <div className="blurbLinks">
          <a href={NAV.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

/** A proximity-revealed nav label near a building — clickable and, since
 *  it's a plain positioned div rather than a link, keyboard-reachable too. */
function NavLabel({ className, onActivate, children }) {
  return (
    <div
      className={className}
      role="button"
      tabIndex={0}
      style={{ whiteSpace: 'nowrap', cursor: 'pointer', pointerEvents: 'auto' }}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onActivate(e);
        }
      }}
    >
      {children}
    </div>
  );
}

import { useLayoutEffect, useRef, useState } from 'react';
import './Timeline.css';

/**
 * A vertical timeline: a dot per entry, connected by a rule that spans
 * from the center of the first dot to the center of the last. `glow`
 * entries get a pulsing double-ring accent (used for "current" items).
 */
export default function Timeline({ entries }) {
  const wrapRef = useRef(null);
  const dotRefs = useRef([]);
  const [line, setLine] = useState({ top: 0, height: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      const dots = dotRefs.current.filter(Boolean);
      if (!wrap || dots.length < 2) return;
      const wrapTop = wrap.getBoundingClientRect().top;
      const a = dots[0].getBoundingClientRect();
      const b = dots[dots.length - 1].getBoundingClientRect();
      const top = a.top - wrapTop + a.height / 2;
      const bottom = b.top - wrapTop + b.height / 2;
      setLine({ top, height: bottom - top });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [entries]);

  return (
    <div className="timeline" ref={wrapRef}>
      <div
        className="timeline__rule"
        style={{ top: line.top, height: line.height }}
      />
      {entries.map((entry, i) => (
        <div className="timeline__row" key={entry.id}>
          <div
            ref={(el) => (dotRefs.current[i] = el)}
            className={`timeline__dot ${entry.glow ? 'timeline__dot--glow' : ''}`}
          />
          <div className="timeline__body">
            <label className="timeline__label">{entry.label}</label>
            <p className="timeline__text">
              {entry.lines.map((text, li) => (
                <span key={li}>
                  {text}
                  {li < entry.lines.length - 1 && <br />}
                </span>
              ))}
            </p>
            {entry.courses && (
              <ul className="timeline__courses">
                {entry.courses.map((course) => (
                  <li key={course}>{course}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

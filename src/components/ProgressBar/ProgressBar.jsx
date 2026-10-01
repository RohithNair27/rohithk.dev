import './ProgressBar.css';

/** Thin red bar pinned to the bottom of the viewport. The parent drives
 *  the fill imperatively (it updates every animation frame, so a prop
 *  would mean a re-render per frame): `ref` lands on the fill element,
 *  whose `style.width` the parent sets as a percentage. */
export default function ProgressBar({ ref }) {
  return (
    <div className="progress-bar" aria-hidden="true">
      <div className="progress-bar__fill" ref={ref} />
    </div>
  );
}

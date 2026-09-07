import './CloudsBackground.css';

const CLOUD_SPRITE = 'https://assets.codepen.io/721952/clouds.png';

const DEFAULT_CLOUDS = [
  { left: '2%', top: '4%', scale: 0.5, offset: 0 },
  { left: '40%', top: '2%', scale: 0.6, offset: 240 },
  { left: '72%', top: '10%', scale: 0.5, offset: 480 },
  { left: '58%', top: '40%', scale: 0.68, offset: 720 },
  { left: '4%', top: '52%', scale: 0.42, offset: 1080 },
  { left: '70%', top: '72%', scale: 0.55, offset: 1320 },
];

/** Decorative drifting-cloud backdrop, tiled from a single sprite sheet.
 *  Sits absolutely within its parent, ignoring pointer events. */
export default function CloudsBackground({ clouds = DEFAULT_CLOUDS }) {
  return (
    <div className="clouds-backdrop" aria-hidden="true">
      {clouds.map((cloud, i) => (
        <div
          key={i}
          className="clouds-backdrop__cloud"
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
  );
}

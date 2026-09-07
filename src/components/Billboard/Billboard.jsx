import { MOCKUPS } from './Mockups';
import './Billboard.css';

/**
 * One roadside sign in the Projects billboard scene, ported 1:1 from the
 * "Projects Billboards" design: a hand-built mockup illustration next to a
 * title/description/tags/links block, sitting on a pair of support-post
 * legs. Every board's shape (radius, shadow, border, outline, height cap)
 * and legs come from its entry in `data/projects.js` — this component just
 * lays them out, plus the one structural exception the source design has:
 * the "desktop" board (`layout: 'meta-row'`) puts its tags and links in a
 * separate row below the mock+title grid instead of beside it.
 */
export default function Billboard({ project }) {
  const {
    tag,
    num,
    mock,
    title,
    description,
    tags = [],
    links = [],
    layout = 'default',
    width,
    paddingBottom,
    board = {},
    creak = {},
    legs = [],
    titleSize,
    descSize,
    descMaxWidth,
    gridGap,
  } = project;

  const Mock = MOCKUPS[mock];
  const isMetaRow = layout === 'meta-row';

  const chips = tags.length > 0 && (
    <div className="billboard__chips">
      {tags.map((chip) => (
        <span key={chip} className="billboard__chip">
          {chip}
        </span>
      ))}
    </div>
  );
  const linkRow = links.length > 0 && (
    <div className="billboard__links">
      {links.map((link) => (
        <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
          {link.label}
        </a>
      ))}
    </div>
  );

  return (
    <div className="billboard" style={{ width, paddingBottom }}>
      <div
        className="billboard__board"
        style={{
          borderRadius: board.radius,
          boxShadow: board.shadow,
          border: board.borderWidth ? `${board.borderWidth} solid #111` : undefined,
          outline: board.outline,
          outlineOffset: board.outlineOffset,
          maxHeight: board.maxHeight,
          padding: board.padding,
          animationDuration: creak.duration,
          animationDelay: creak.delay,
        }}
      >
        <div className="billboard__head">
          <span className="billboard__eyebrow">{tag}</span>
          <span className="billboard__num">{num}</span>
        </div>

        <div className="billboard__grid" style={{ gap: gridGap }}>
          {Mock && <Mock />}
          <div>
            <h3 className="billboard__title" style={{ fontSize: titleSize }}>
              {title}
            </h3>
            <p className="billboard__desc" style={{ fontSize: descSize, maxWidth: descMaxWidth }}>
              {description}
            </p>
            {!isMetaRow && chips}
            {!isMetaRow && linkRow}
          </div>
        </div>

        {isMetaRow && (
          <div className="billboard__meta">
            {chips}
            {linkRow}
          </div>
        )}
      </div>

      {legs.map((leg) => (
        <div
          key={leg.side}
          className="billboard__leg"
          style={{ [leg.side]: leg.at, height: leg.height, width: leg.width }}
        />
      ))}
    </div>
  );
}

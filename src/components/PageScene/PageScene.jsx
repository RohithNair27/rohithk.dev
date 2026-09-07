import CloudsBackground from '../CloudsBackground/CloudsBackground';
import SwingingSign from '../SwingingSign/SwingingSign';
import HomeButton from '../HomeButton/HomeButton';
import { cloudPresets, ropePresets } from '../../data/decor';
import './PageScene.css';

/**
 * Shared subpage shell: the grey-to-cream gradient backdrop, drifting
 * clouds, a swaying rope-and-hanger sign, the fixed Home button, and the
 * vignette overlay. Every subpage (About, Experience, Projects, QA Lab)
 * renders its own content as `children` inside this frame.
 */
export default function PageScene({
  children,
  cloudPreset = 'scene',
  ropePreset = 'scene',
  paddingTop = 180,
  paddingBottom = 90,
  gap = 32,
  homeTo = '/',
  className = '',
}) {
  return (
    <div
      className={`page-scene ${className}`}
      style={{ paddingTop, paddingBottom, gap }}
    >
      <CloudsBackground clouds={cloudPresets[cloudPreset]} />
      <SwingingSign {...ropePresets[ropePreset]} />

      {children}

      <HomeButton to={homeTo} />
      <div className="page-scene__vignette" aria-hidden="true" />
    </div>
  );
}

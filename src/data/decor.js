/** Shared decorative presets reused across the subpages: cloud layouts for
 *  <CloudsBackground> and rope/hanger sizing for <SwingingSign>. Projects
 *  moved to its own full-screen billboard scene (see pages/Projects.jsx)
 *  and no longer uses either — only About Me, Experience, and QA Lab do. */

export const cloudPresets = {
  scene: [
    { left: '2%', top: '6%', scale: 0.5, offset: 0 },
    { left: '34%', top: '2%', scale: 0.62, offset: 240 },
    { left: '62%', top: '16%', scale: 0.5, offset: 480 },
    { left: '44%', top: '38%', scale: 0.72, offset: 720 },
    { left: '8%', top: '46%', scale: 0.42, offset: 1080 },
    { left: '66%', top: '56%', scale: 0.58, offset: 1320 },
  ],
};

export const ropePresets = {
  scene: { left: '9%', ropeLength: 400, hangerWidth: 140, hangerHeight: 195, swingDeg: 14 },
};

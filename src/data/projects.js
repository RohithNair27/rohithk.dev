/** Content for the Projects page's billboard scene, ported from the
 *  "Projects Billboards" design. Each entry drives one sign on the road:
 *  which hand-built mockup illustration it shows (`mock`, matched to a
 *  component in `components/Billboard/Mockups.jsx`), its shape (corner
 *  radius, shadow, border, outline), its post legs, and its copy. Edit
 *  this list to add, remove, or reorder boards — everything about how one
 *  renders comes from its entry here, not from the component. */
export const projects = [
  {
    id: 'design',
    num: '01',
    mock: 'design',
    title: 'Poke-battle',
    description:
      'A Pokémon-style battle game where players attack by performing American Sign Language (ASL) words in front of their webcam.',
    tags: ['React JS', 'Machine Learning', 'Flask'],
    links: [
      { label: 'GitHub', href: 'https://github.com/PokeBattle-An-ASL-Game/Poke-battle' },
      { label: 'Link', href: 'https://www.youtube.com/watch?v=NJechzEHjQ4' },
    ],
    width: 'min(84vw, 600px)',
    paddingBottom: 52,
    board: { radius: '0', shadow: '13px 15px 0 #111', padding: '30px 32px' },
    creak: { duration: '7s', delay: '0s' },
    legs: [
      { side: 'left', at: '12%', height: 80, width: 15 },
      { side: 'right', at: '12%', height: 80, width: 15 },
    ],
  },
  {
    id: 'api',
    num: '02',
    mock: 'api',
    title: 'Compendia',
    description:
      'A custom app to set a study curriculum. Compendia is a web application designed to combat "doom scrolling" and information overload.',
    tags: ['RAG', 'React JS', 'FastAPI'],
    links: [
      { label: 'GitHub', href: 'https://github.com/RohithNair27/compendia' },
      { label: 'Link', href: 'https://www.youtube.com/watch?v=3TTQhyxBCLw' },
    ],
    width: 'min(80vw, 520px)',
    paddingBottom: 74,
    board: { radius: '22px', shadow: '8px 10px 0 #111', padding: '28px 30px' },
    creak: { duration: '6.2s', delay: '0.5s' },
    legs: [{ side: 'left', at: '46%', height: 104, width: 20 }],
  },
  {
    id: 'mobile',
    num: '03',
    mock: 'mobile',
    title: 'WTF (Where is the Food)',
    description:
      'WTF (Where’s The Food) is a mobile-first application that helps users identify where they can find a dish they see online or in real life, using computer vision, LLM reasoning and the Yelp AI API.',
    tags: ['React Native', 'Multi-agent'],
    links: [
      { label: 'GitHub', href: 'https://github.com/RohithNair27/WTF-Where-is-the-food-' },
      { label: 'Demo', href: 'https://youtube.com/your-demo-video' },
      { label: 'App', href: 'https://your-hosted-apk-link.com' },
    ],
    titleSize: 'clamp(28px, 3.6vw, 44px)',
    descSize: '16px',
    descMaxWidth: '38ch',
    gridGap: 34,
    width: 'min(92vw, 760px)',
    paddingBottom: 44,
    board: { radius: '6px', shadow: '10px 12px 0 #111', maxHeight: '68vh', padding: '20px 24px' },
    creak: { duration: '6.8s', delay: '1.4s' },
    legs: [
      { side: 'left', at: '22%', height: 74, width: 12 },
      { side: 'right', at: '22%', height: 74, width: 12 },
    ],
  },
  {
    id: 'cypress',
    num: '04',
    mock: 'testing',
    title: 'Cypress Testing',
    description:
      'A simple login application with both End-to-End (E2E) and Component Testing implemented using Cypress, following testing best practices.',
    tags: ['Cypress', 'React'],
    links: [{ label: 'GitHub', href: 'https://github.com/RohithNair27/Cypress-Testing' }],
    width: 'min(82vw, 540px)',
    paddingBottom: 62,
    board: {
      radius: '2px',
      shadow: '6px 8px 0 #111',
      borderWidth: '7px',
      maxHeight: '72vh',
      padding: '26px 30px',
    },
    creak: { duration: '7.2s', delay: '0.3s' },
    legs: [
      { side: 'left', at: '15%', height: 92, width: 9 },
      { side: 'right', at: '15%', height: 92, width: 9 },
    ],
  },
  {
    id: 'native-audio',
    num: '05',
    mock: 'mobile',
    title: 'Native Audio',
    description:
      'Implementation of the Music-style UI in React Native using Expo, focusing on replicating smooth animations and a sleek music player experience.',
    tags: ['React Native', 'Expo'],
    links: [{ label: 'GitHub', href: 'https://github.com/RohithNair27/Native-audio' }],
    titleSize: 'clamp(28px, 3.6vw, 44px)',
    descSize: '16px',
    descMaxWidth: '38ch',
    gridGap: 34,
    width: 'min(88vw, 580px)',
    paddingBottom: 58,
    board: { radius: '14px', shadow: '12px 14px 0 #111', maxHeight: '68vh', padding: '20px 24px' },
    creak: { duration: '6.4s', delay: '0.7s' },
    legs: [{ side: 'left', at: '48%', height: 88, width: 18 }],
  },
  // Hidden for now — uncomment to bring these boards back.
  /*
  {
    id: 'desktop',
    tag: 'desktop',
    num: '04',
    mock: 'desktop',
    title: 'Project three',
    description: 'One or two lines on what it does, who it is for, and what was hard about it.',
    tags: ['Python', 'AWS'],
    links: [{ label: 'Code', href: '#' }],
    layout: 'meta-row',
    width: 'min(86vw, 640px)',
    paddingBottom: 26,
    board: {
      radius: '4px',
      shadow: '15px 17px 0 #111',
      outline: '2px solid #111',
      outlineOffset: '-12px',
      padding: '34px 36px',
    },
    creak: { duration: '7.6s', delay: '1s' },
    legs: [
      { side: 'left', at: '20%', height: 52, width: 10 },
      { side: 'right', at: '20%', height: 52, width: 10 },
    ],
  },
  {
    id: 'testing',
    tag: 'testing',
    num: '05',
    mock: 'testing',
    title: 'Test suite',
    description: 'What the suite covers, how it runs in CI, and what it caught.',
    tags: ['Playwright', 'CI'],
    links: [{ label: 'Code', href: '#' }],
    width: 'min(82vw, 540px)',
    paddingBottom: 62,
    board: {
      radius: '2px',
      shadow: '6px 8px 0 #111',
      borderWidth: '7px',
      maxHeight: '72vh',
      padding: '26px 30px',
    },
    creak: { duration: '7.2s', delay: '0.3s' },
    legs: [
      { side: 'left', at: '15%', height: 92, width: 9 },
      { side: 'right', at: '15%', height: 92, width: 9 },
    ],
  },
  {
    id: 'python',
    tag: 'python',
    num: '06',
    mock: 'python',
    title: 'Python tooling',
    description: 'What the script or service does, the data it moves, and why it was needed.',
    tags: ['Python', 'Pandas'],
    links: [{ label: 'Code', href: '#' }],
    width: 'min(84vw, 580px)',
    paddingBottom: 32,
    board: {
      radius: '40px 40px 6px 6px',
      shadow: '11px 13px 0 #111',
      maxHeight: '72vh',
      padding: '34px 30px 28px',
    },
    creak: { duration: '6.6s', delay: '0.9s' },
    legs: [{ side: 'left', at: '47%', height: 60, width: 16 }],
  },
  */
];

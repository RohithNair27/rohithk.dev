/** Content and canned results for the QA Lab page's simulated Playwright
 *  suite and Postman collection — a self-contained demo, not a real
 *  runner. */

export const GROUPS = [
  {
    name: 'Walk page smoke',
    tests: [
      'loads with the intro visible',
      'hello my name is renders',
      'Rohith wordmark renders all six letters',
      'LinkedIn button is reachable',
      'no console errors on load',
    ],
  },
  {
    name: 'Scroll driven walk',
    tests: [
      'scrolling right advances the walker',
      'walk cycle frames advance while moving',
      'walker faces the direction of travel',
      'scrolling back restores the intro',
      'arrow keys move the walker',
    ],
  },
  {
    name: 'Proximity labels',
    tests: [
      'About Me appears near the homes',
      'Experience appears near the hut',
      'University of Maryland appears near the tower',
      'Contact Me appears near the gates',
      'labels hide again once the walker passes',
    ],
  },
  {
    name: 'Navigation',
    tests: [
      'About Me label opens the About page',
      'Experience label opens the Experience page',
      'clicking a building navigates like its label',
      'every subpage links back to the walk',
    ],
  },
  {
    name: 'Contact',
    tests: [
      'Contact Me exposes a mailto link',
      'the address is rohithnair2711@gmail.com',
      'LinkedIn and GitHub open in a new tab',
    ],
  },
  {
    name: 'Subpage layout',
    tests: [
      'the hanging figure trails the scroll',
      'the rope grows with scroll position',
      'the Experience timeline renders every entry',
      'the timeline rule spans first to last dot',
      'course list renders nine courses',
    ],
  },
  {
    name: 'Responsive',
    tests: [
      'content stays inside the viewport at 1280px',
      'content stays inside the viewport at 390px',
      'no horizontal scrollbar on subpages',
      'hint box never covers the intro copy',
    ],
  },
];

export const API_TESTS = [
  { name: 'Status code is 200 OK', ms: '182ms' },
  { name: 'Response time is under 400ms', ms: '182ms' },
  { name: 'Content-Type is application/json', ms: '1ms' },
  { name: 'Body matches the segment schema', ms: '6ms' },
  { name: 'segments array returns 25 items', ms: '2ms' },
  { name: 'Every segment has an id, name and speed', ms: '4ms' },
  { name: 'Pagination cursor is present', ms: '1ms' },
  { name: 'Request without a token returns 401', ms: '96ms' },
  { name: 'Unknown segment id returns 404', ms: '88ms' },
  { name: 'POST with a bad payload returns 422', ms: '104ms' },
  { name: 'Load run of 50 requests stays under 500ms p95', ms: '2.4s' },
];

export const API_BODY = `{
  "count": 25,
  "cursor": "eyJwYWdlIjoyfQ",
  "segments": [
    {
      "id": "MD-95-N-014",
      "name": "I-95 N at MD-198",
      "speed": 61,
      "travelTime": 148,
      "updatedAt": "2026-09-06T14:22:03Z"
    },
    {
      "id": "MD-495-O-071",
      "name": "I-495 Outer at MD-201",
      "speed": 34,
      "travelTime": 262,
      "updatedAt": "2026-09-06T14:22:03Z"
    }
  ]
}`;

export const API_URL = 'https://api.trafficdata.dev/v1/segments?state=MD&limit=25';
export const RUN_ID = '34065442858';

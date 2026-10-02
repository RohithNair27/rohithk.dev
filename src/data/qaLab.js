/** Content for the QA Lab page: the simulated Playwright suite (canned
 *  results) and a real API suite whose assertions run live in the browser
 *  against JSONPlaceholder, a free public REST API. */

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

export const API_BASE = 'https://jsonplaceholder.typicode.com';
export const API_URL = `${API_BASE}/posts?_limit=10`;

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

/** Times a fetch and parses its JSON body (null when there isn't one). */
async function timedFetch(url, init) {
  const t0 = performance.now();
  const res = await fetch(url, init);
  const ms = performance.now() - t0;
  const body = await res.json().catch(() => null);
  return { res, body, ms };
}

/** Live assertions, run in order. Each gets a shared `ctx`; the first one
 *  makes the main request and stores it as `ctx.main` for the others to
 *  check. An assertion fails by throwing — its message is shown inline. */
export const API_TESTS = [
  {
    name: 'GET /posts returns 200 OK',
    run: async (ctx) => {
      ctx.main = await timedFetch(API_URL);
      assert(ctx.main.res.status === 200, `expected 200, got ${ctx.main.res.status}`);
    },
  },
  {
    name: 'Response time is under 1000ms',
    run: async ({ main }) => {
      assert(main.ms < 1000, `took ${Math.round(main.ms)}ms`);
    },
  },
  {
    name: 'Content-Type is application/json',
    run: async ({ main }) => {
      const type = main.res.headers.get('content-type') || '';
      assert(type.includes('application/json'), `got "${type}"`);
    },
  },
  {
    name: 'Body is an array of 10 posts (_limit=10)',
    run: async ({ main }) => {
      assert(Array.isArray(main.body), 'body is not an array');
      assert(main.body.length === 10, `got ${main.body.length} items`);
    },
  },
  {
    name: 'Every post has a numeric id, userId and a string title, body',
    run: async ({ main }) => {
      const bad = main.body.find(
        (p) =>
          typeof p.id !== 'number' ||
          typeof p.userId !== 'number' ||
          typeof p.title !== 'string' ||
          typeof p.body !== 'string',
      );
      assert(!bad, `post ${bad?.id} does not match the schema`);
    },
  },
  {
    name: 'GET /posts/1 returns the post with id 1',
    run: async () => {
      const { res, body } = await timedFetch(`${API_BASE}/posts/1`);
      assert(res.status === 200, `expected 200, got ${res.status}`);
      assert(body?.id === 1, `got id ${body?.id}`);
    },
  },
  {
    name: 'Filtering by ?userId=1 returns only that user\'s posts',
    run: async () => {
      const { body } = await timedFetch(`${API_BASE}/posts?userId=1`);
      assert(Array.isArray(body) && body.length > 0, 'no posts returned');
      assert(body.every((p) => p.userId === 1), 'found a post from another user');
    },
  },
  {
    name: 'Unknown post id returns 404',
    run: async () => {
      const { res } = await timedFetch(`${API_BASE}/posts/999999`);
      assert(res.status === 404, `expected 404, got ${res.status}`);
    },
  },
  {
    name: 'POST /posts returns 201 and echoes the payload',
    run: async () => {
      const payload = { title: 'qa lab', body: 'live assertion', userId: 1 };
      const { res, body } = await timedFetch(`${API_BASE}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(payload),
      });
      assert(res.status === 201, `expected 201, got ${res.status}`);
      assert(body?.title === payload.title, 'title was not echoed back');
      assert(typeof body?.id === 'number', 'no id assigned');
    },
  },
  {
    name: '5 parallel requests all return 200 in under 1500ms',
    run: async () => {
      const runs = await Promise.all(
        [1, 2, 3, 4, 5].map((id) => timedFetch(`${API_BASE}/posts/${id}`)),
      );
      const failed = runs.find((r) => r.res.status !== 200);
      assert(!failed, `a request returned ${failed?.res.status}`);
      const slowest = Math.max(...runs.map((r) => r.ms));
      assert(slowest < 1500, `slowest took ${Math.round(slowest)}ms`);
    },
  },
];

export const RUN_ID = '34065442858';

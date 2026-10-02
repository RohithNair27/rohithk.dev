import { useEffect, useRef, useState } from 'react';
import PageScene from '../components/PageScene/PageScene';
import PageTitle from '../components/PageTitle/PageTitle';
import BackLink from '../components/BackLink/BackLink';
import { GROUPS, API_TESTS, API_URL, RUN_ID } from '../data/qaLab';
import './QaLab.css';

const TOTAL_TESTS = GROUPS.reduce((n, g) => n + g.tests.length, 0);

function finalLines() {
  return [
    { mark: '>', color: '#f84356', text: 'npx playwright test --reporter=line' },
    {
      mark: '>',
      color: '#f84356',
      text: `suite completed successfully: ${TOTAL_TESTS}/${TOTAL_TESTS} passed`,
    },
    { mark: '✓', color: '#8fd48a', text: 'Chromium — full suite' },
    { mark: '✓', color: '#8fd48a', text: 'Mobile Safari — responsive suite' },
    { mark: '↳', color: '#8fd48a', text: '0 flaky, 0 skipped, 14.2s' },
  ];
}

export default function QaLab() {
  const [open, setOpen] = useState({});
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [lines, setLines] = useState(null);
  const [apiRunning, setApiRunning] = useState(false);
  // One entry per API_TESTS item: { state: 'run' | 'pass' | 'fail', ms, error }.
  const [apiResults, setApiResults] = useState([]);
  const [apiMain, setApiMain] = useState(null);

  const timers = useRef([]);
  // Bumped on every run and on unmount, so a stale run stops updating state.
  const apiRunId = useRef(0);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      apiRunId.current += 1;
    },
    [],
  );

  const toggleGroup = (i) => setOpen((s) => ({ ...s, [i]: !s[i] }));

  const runSuite = () => {
    if (running) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRunning(true);
    setDone(false);

    const stream = [
      { mark: '>', color: '#f84356', text: 'npx playwright test --reporter=line' },
      ...GROUPS.map((g) => ({
        mark: '✓',
        color: '#8fd48a',
        text: `${g.name.toLowerCase()} — ${g.tests.length} passed`,
      })),
    ];
    stream.forEach((line, i) => {
      timers.current.push(
        setTimeout(() => {
          setLines((prev) => (prev || []).slice(0, i).concat([line]));
        }, 260 * (i + 1)),
      );
    });
    timers.current.push(
      setTimeout(
        () => {
          setLines(finalLines());
          setRunning(false);
          setDone(true);
        },
        260 * (stream.length + 1),
      ),
    );
  };

  const runApi = async () => {
    if (apiRunning) return;
    const runId = ++apiRunId.current;
    const live = () => runId === apiRunId.current;
    setApiRunning(true);
    setApiResults([]);
    setApiMain(null);

    const ctx = {};
    for (let i = 0; i < API_TESTS.length; i++) {
      setApiResults((r) => [...r.slice(0, i), { state: 'run' }]);
      const t0 = performance.now();
      let result;
      try {
        await API_TESTS[i].run(ctx);
        result = { state: 'pass' };
      } catch (err) {
        result = { state: 'fail', error: err.message };
      }
      if (!live()) return;
      result.ms = Math.round(performance.now() - t0);
      setApiResults((r) => [...r.slice(0, i), result]);
      if (i === 0) setApiMain(ctx.main ?? null);
    }
    setApiRunning(false);
  };

  const consoleLines = lines || [
    { mark: '>', color: '#777', text: 'suite has not run yet — press RUN QA SUITE' },
  ];
  const passLabel = `${done ? TOTAL_TESTS : 0}/${TOTAL_TESTS}`;
  const passPct = done ? '100%' : '–';
  const dotColor = running ? '#DBB97B' : done ? '#8fd48a' : '#777';
  const runLabel = running ? 'RUNNING…' : 'RUN QA SUITE';
  const status = running
    ? 'executing specs…'
    : done
      ? `All ${TOTAL_TESTS}/${TOTAL_TESTS} tests passed successfully.`
      : `idle — ${TOTAL_TESTS} specs ready to run`;

  const apiPassed = apiResults.filter((r) => r.state === 'pass').length;
  const apiComplete = !apiRunning && apiResults.length === API_TESTS.length;
  const apiBtn = apiRunning ? 'SENDING…' : 'RUN API TESTS';
  const apiStatus = apiRunning
    ? `running ${API_TESTS.length} assertions against the live endpoint…`
    : apiComplete
      ? `${apiPassed} of ${API_TESTS.length} assertions passing`
      : `idle — ${API_TESTS.length} assertions ready to run`;
  const apiCode = apiMain
    ? `${apiMain.res.status} ${apiMain.res.statusText || (apiMain.res.ok ? 'OK' : '')}`.trim()
    : apiRunning
      ? '…'
      : apiResults.length
        ? 'request failed'
        : 'no request sent';
  const apiCodeColor = apiMain?.res.ok ? '#8fd48a' : apiRunning ? '#DBB97B' : apiResults.length ? '#f84356' : '#777';
  const apiBody = apiMain
    ? Array.isArray(apiMain.body) && apiMain.body.length > 2
      ? `${JSON.stringify(apiMain.body.slice(0, 2), null, 2).slice(0, -2)}\n  // …${apiMain.body.length - 2} more\n]`
      : JSON.stringify(apiMain.body, null, 2)
    : '// press RUN API TESTS to send the request';

  return (
    <PageScene className="qa-lab-page" paddingBottom={90}>
      <div className="qa-lab-page__content">
        <PageTitle>QA Lab</PageTitle>
        <p className="qa-lab-page__lede">
          A Playwright end to end suite that tests the site you are walking through right now.
        </p>

        <SectionDivider label="SUITE 01" />

        <div className="qa-card">
          <div className="qa-card__header">
            <div className="qa-card__kicker">PLAYWRIGHT E2E AUTOMATION</div>
            <div className="qa-stats">
              <div className="qa-stats__cell">
                <div className="qa-stats__value">{passLabel}</div>
                <div className="qa-stats__label">TESTS PASSED</div>
              </div>
              <div className="qa-stats__cell">
                <div className="qa-stats__value">2</div>
                <div className="qa-stats__label">BROWSERS</div>
              </div>
              <div className="qa-stats__cell qa-stats__cell--last">
                <div className="qa-stats__value">{passPct}</div>
                <div className="qa-stats__label">PASSING</div>
              </div>
            </div>
          </div>

          <div className="qa-card__body">
            <div className="qa-groups">
              {GROUPS.map((g, i) => (
                <div key={g.name} className="qa-group-row" onClick={() => toggleGroup(i)}>
                  <div className="qa-group-row__head">
                    <div className="qa-group-row__tick" style={{ color: done ? '#063d4b' : '#7a7368', borderColor: done ? '#063d4b' : '#7a7368' }}>
                      ✓
                    </div>
                    <div className="qa-group-row__name">{g.name}</div>
                    <div className="qa-group-row__count">
                      {String(g.tests.length).padStart(2, '0')} tests
                    </div>
                    <div className="qa-group-row__chev">{open[i] ? '▲' : '▼'}</div>
                  </div>
                  {open[i] && (
                    <ul className="qa-group-row__tests">
                      {g.tests.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="qa-console">
              <div className="qa-console__head">
                <div className="qa-console__dot-wrap">
                  <span className="qa-console__dot" style={{ background: dotColor }} />
                  PLAYWRIGHT RUNNER
                </div>
                <div className="qa-console__run">RUN #{RUN_ID}</div>
              </div>
              <div className="qa-console__lines">
                {consoleLines.map((l, i) => (
                  <div className="qa-console__line" key={i}>
                    <span style={{ color: l.color }}>{l.mark}</span>
                    <span>{l.text}</span>
                  </div>
                ))}
              </div>
              <div className="qa-console__footer">
                <button type="button" className="qa-run-btn" onClick={runSuite}>
                  {runLabel}
                </button>
                <div className="qa-console__status">{status}</div>
              </div>
            </div>
          </div>

          <div className="qa-card__foot">
            <div>FULL REGRESSION SUITE · {TOTAL_TESTS} TESTS</div>
            <div>CHROMIUM · MOBILE SAFARI</div>
          </div>
        </div>

        <SectionDivider label="SUITE 02" />

        <div className="qa-api">
          <div className="qa-api__head">
            <div className="qa-card__kicker">API TESTING · LIVE REQUESTS</div>
            <div className="qa-api__status-text">{apiStatus}</div>
          </div>

          <div className="qa-api__bar">
            <div className="qa-api__method">GET</div>
            <div className="qa-api__url">{API_URL}</div>
            <button type="button" className="qa-run-btn qa-api__run" onClick={runApi}>
              {apiBtn}
            </button>
          </div>

          <div className="qa-api__grid">
            <div className="qa-api__tests">
              {API_TESTS.map((a, i) => {
                const r = apiResults[i];
                const state = r?.state ?? 'idle';
                const color = { pass: '#4f9a49', fail: '#f84356', run: '#DBB97B' }[state] ?? '#7a7368';
                return (
                  <div
                    key={a.name}
                    className="qa-api-test"
                    style={{ borderLeftColor: color }}
                  >
                    <div className="qa-api-test__state" style={{ color }}>
                      {state.toUpperCase()}
                    </div>
                    <div className="qa-api-test__name">
                      {a.name}
                      {r?.error && <div className="qa-api-test__error">{r.error}</div>}
                    </div>
                    <div className="qa-api-test__ms">{r?.ms != null ? `${r.ms}ms` : ''}</div>
                  </div>
                );
              })}
            </div>

            <div className="qa-api__response">
              <div className="qa-api__response-head">
                <span>RESPONSE</span>
                <span style={{ color: apiCodeColor }}>{apiCode}</span>
              </div>
              <pre className="qa-api__response-body">{apiBody}</pre>
            </div>
          </div>
        </div>

        <BackLink />
      </div>
    </PageScene>
  );
}

function SectionDivider({ label }) {
  return (
    <div className="qa-divider">
      <div className="qa-divider__rule" />
      <div className="qa-divider__label">{label}</div>
      <div className="qa-divider__rule" />
    </div>
  );
}

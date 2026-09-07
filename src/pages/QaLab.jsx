import { useEffect, useRef, useState } from 'react';
import PageScene from '../components/PageScene/PageScene';
import PageTitle from '../components/PageTitle/PageTitle';
import BackLink from '../components/BackLink/BackLink';
import { GROUPS, API_TESTS, API_BODY, API_URL, RUN_ID } from '../data/qaLab';
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
  const [apiShown, setApiShown] = useState(0);

  const timers = useRef([]);
  const apiTimers = useRef([]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      apiTimers.current.forEach(clearTimeout);
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

  const runApi = () => {
    if (apiRunning) return;
    apiTimers.current.forEach(clearTimeout);
    apiTimers.current = [];
    setApiRunning(true);
    setApiShown(0);
    API_TESTS.forEach((_, i) => {
      apiTimers.current.push(setTimeout(() => setApiShown(i + 1), 220 * (i + 1)));
    });
    apiTimers.current.push(
      setTimeout(() => setApiRunning(false), 220 * (API_TESTS.length + 1)),
    );
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

  const apiComplete = apiShown === API_TESTS.length;
  const apiBtn = apiRunning ? 'SENDING…' : 'RUN API TESTS';
  const apiStatus = apiRunning
    ? `running ${API_TESTS.length} assertions against the live endpoint…`
    : apiComplete
      ? `${API_TESTS.length} of ${API_TESTS.length} assertions passing`
      : `idle — ${API_TESTS.length} assertions ready to run`;
  const apiCode = apiRunning ? '…' : apiComplete ? '200 OK' : 'no request sent';
  const apiCodeColor = apiRunning ? '#DBB97B' : apiComplete ? '#8fd48a' : '#777';
  const apiBody = apiComplete ? API_BODY : '// press RUN API TESTS to send the request';

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
            <div className="qa-card__kicker">API TESTING · POSTMAN COLLECTION</div>
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
                const passed = i < apiShown;
                const isRunning = apiRunning && i === apiShown;
                const color = passed ? '#4f9a49' : '#7a7368';
                return (
                  <div
                    key={a.name}
                    className="qa-api-test"
                    style={{ borderLeftColor: color }}
                  >
                    <div className="qa-api-test__state" style={{ color }}>
                      {passed ? 'PASS' : isRunning ? 'RUN' : 'IDLE'}
                    </div>
                    <div className="qa-api-test__name">{a.name}</div>
                    <div className="qa-api-test__ms">{passed ? a.ms : ''}</div>
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

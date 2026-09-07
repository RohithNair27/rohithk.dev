/**
 * The six hand-built mockup illustrations from the "Projects Billboards"
 * design — a little canvas editor, a service diagram, a browser window, a
 * phone screen, a test runner, and a shell — each reproduced exactly (same
 * nesting, same pixel values) so the billboards look identical to the
 * source design. Selected by a project's `mock` key in data/projects.js.
 */

export function DesignMockup() {
  return (
    <div
      style={{
        width: 'clamp(150px, 21vh, 215px)',
        border: '4px solid #111',
        borderRadius: 6,
        background: '#efefef',
        boxShadow: '6px 8px 0 #111',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 8px',
          borderBottom: '3px solid #111',
          background: '#f6f6f6',
          fontFamily: "'Roboto Condensed', sans-serif",
          fontSize: 10,
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          color: '#4a4a4a',
        }}
      >
        <span>canvas</span>
        <span style={{ color: '#f84356' }}>100%</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '22px 1fr' }}>
        <div
          style={{
            borderRight: '3px solid #111',
            padding: '8px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div style={{ width: 10, height: 10, border: '2px solid #f84356' }} />
          <div style={{ width: 10, height: 10, border: '2px solid #111', borderRadius: '50%' }} />
          <div style={{ width: 10, height: 2, background: '#111' }} />
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '9px solid #111',
            }}
          />
        </div>
        <div style={{ position: 'relative', padding: '14px 12px', background: '#f6f6f6' }}>
          <div
            style={{
              position: 'relative',
              height: 74,
              border: '3px solid #111',
              background: '#fcfcfc',
              display: 'flex',
              flexDirection: 'column',
              gap: 7,
              padding: 9,
            }}
          >
            <div style={{ height: 7, width: '66%', background: '#d6d6d6', borderRadius: 2 }} />
            <div style={{ height: 7, width: '44%', background: '#e2e2e2', borderRadius: 2 }} />
            <div style={{ marginTop: 'auto', display: 'flex', gap: 6 }}>
              <div style={{ width: 34, height: 11, border: '2px solid #f84356' }} />
              <div style={{ width: 22, height: 11, border: '2px solid #b9b9b9' }} />
            </div>
            {[
              { left: -5, top: -5 },
              { right: -5, top: -5 },
              { left: -5, bottom: -5 },
              { right: -5, bottom: -5 },
            ].map((pos, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: 7,
                  height: 7,
                  background: '#fcfcfc',
                  border: '2px solid #f84356',
                  ...pos,
                }}
              />
            ))}
          </div>
          <div
            style={{
              marginTop: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontFamily: "'Roboto Condensed', sans-serif",
              fontSize: 9,
              color: '#7a7a7a',
            }}
          >
            <div style={{ flex: 1, height: 2, background: '#111', opacity: 0.55 }} />
            <span>1440</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ApiMockup() {
  const box = {
    width: '100%',
    padding: '8px 0',
    textAlign: 'center',
    border: '3px solid #111',
    background: '#f6f6f6',
    boxShadow: '4px 5px 0 #111',
  };
  return (
    <div
      style={{
        width: 'clamp(140px, 20vh, 200px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: "'Roboto Condensed', sans-serif",
        fontSize: 10,
        letterSpacing: '.08em',
        textTransform: 'uppercase',
        color: '#3d3d3d',
      }}
    >
      <div style={box}>client</div>
      <div style={{ width: 3, height: 16, background: '#111' }} />
      <div style={{ ...box, border: '3px solid #f84356', background: '#fcfcfc', color: '#111' }}>api</div>
      <div style={{ width: 3, height: 16, background: '#111' }} />
      <div style={{ width: '100%', display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, padding: '7px 0', textAlign: 'center', border: '3px solid #111', background: '#f6f6f6' }}>
          cache
        </div>
        <div style={{ flex: 1, padding: '7px 0', textAlign: 'center', border: '3px solid #111', background: '#f6f6f6' }}>
          db
        </div>
      </div>
      <div style={{ marginTop: 10, width: '100%', display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ flex: 1, height: 2, background: '#111', opacity: 0.6 }} />
        <span style={{ color: '#f84356' }}>120ms</span>
      </div>
    </div>
  );
}

export function DesktopMockup() {
  const bars = [
    { height: '40%', bg: undefined },
    { height: '72%', bg: '#f84356' },
    { height: '55%', bg: undefined },
    { height: '88%', bg: undefined },
  ];
  return (
    <div style={{ width: 'clamp(200px, 27vh, 264px)' }}>
      <div
        style={{
          padding: '8px 8px 10px',
          background: '#2b2b2b',
          border: '4px solid #111',
          borderRadius: 8,
          boxShadow: '6px 8px 0 #111',
        }}
      >
        <div
          style={{
            aspectRatio: '16 / 10',
            background: '#f6f6f6',
            borderRadius: 3,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              padding: '6px 8px',
              borderBottom: '3px solid #111',
              background: '#efefef',
            }}
          >
            <div style={{ width: 7, height: 7, border: '2px solid #111', borderRadius: '50%' }} />
            <div style={{ width: 7, height: 7, border: '2px solid #b9b9b9', borderRadius: '50%' }} />
            <div style={{ marginLeft: 6, flex: 1, height: 7, background: '#dcdcdc', borderRadius: 2 }} />
          </div>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '30% 1fr', minHeight: 0 }}>
            <div
              style={{
                borderRight: '3px solid #111',
                padding: '8px 6px',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <div style={{ height: 6, background: '#f84356', borderRadius: 2 }} />
              <div style={{ height: 6, background: '#dcdcdc', borderRadius: 2 }} />
              <div style={{ height: 6, background: '#e4e4e4', borderRadius: 2 }} />
            </div>
            <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ height: 6, width: '80%', background: '#d6d6d6', borderRadius: 2 }} />
              <div style={{ height: 6, width: '60%', background: '#e2e2e2', borderRadius: 2 }} />
              <div style={{ marginTop: 2, height: 2, background: '#111', opacity: 0.85 }} />
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 22 }}>
                {bars.map((bar, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: bar.height,
                      border: '2px solid #111',
                      background: bar.bg,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          margin: '0 auto',
          width: '16%',
          height: 14,
          background: '#2b2b2b',
          borderLeft: '3px solid #111',
          borderRight: '3px solid #111',
          boxSizing: 'border-box',
        }}
      />
      <div
        style={{
          margin: '0 auto',
          width: '52%',
          height: 7,
          background: '#2b2b2b',
          border: '3px solid #111',
          borderRadius: 3,
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}

export function MobileMockup() {
  return (
    <div
      style={{
        position: 'relative',
        height: 'clamp(190px, 34vh, 330px)',
        aspectRatio: '1 / 2.05',
        padding: 10,
        boxSizing: 'border-box',
        background: '#2b2b2b',
        border: '4px solid #111',
        borderRadius: 28,
        boxShadow: '6px 8px 0 #111',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 16,
          transform: 'translateX(-50%)',
          width: '34%',
          height: 5,
          background: '#efefef',
          borderRadius: 3,
          zIndex: 2,
        }}
      />
      <div style={{ height: '100%', background: '#f6f6f6', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '26%', background: '#f84356', borderBottom: '3px solid #111' }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 9, padding: '12px 12px 0' }}>
          <div style={{ height: 8, width: '70%', background: '#d6d6d6', borderRadius: 2 }} />
          <div style={{ height: 8, width: '52%', background: '#e2e2e2', borderRadius: 2 }} />
          <div style={{ marginTop: 6, height: 2, background: '#111', opacity: 0.85 }} />
          <div style={{ height: 8, width: '64%', background: '#e2e2e2', borderRadius: 2 }} />
          <div style={{ height: 8, width: '44%', background: '#e8e8e8', borderRadius: 2 }} />
        </div>
        <div style={{ height: '12%', borderTop: '3px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          <div style={{ width: 10, height: 10, border: '2px solid #111', borderRadius: 2 }} />
          <div style={{ width: 10, height: 10, border: '2px solid #b9b9b9', borderRadius: 2 }} />
          <div style={{ width: 10, height: 10, border: '2px solid #b9b9b9', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );
}

export function TestingMockup() {
  const rows = [
    { bar: '#d6d6d6', mark: 'check' },
    { bar: '#dcdcdc', mark: 'check' },
    { bar: '#f84356', barOpacity: 0.5, mark: 'cross' },
    { bar: '#e2e2e2', mark: 'check' },
  ];
  return (
    <div
      style={{
        width: 'clamp(140px, 20vh, 200px)',
        border: '4px solid #111',
        borderRadius: 6,
        background: '#f6f6f6',
        boxShadow: '6px 8px 0 #111',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 8px',
          borderBottom: '3px solid #111',
          background: '#efefef',
          fontFamily: "'Roboto Condensed', sans-serif",
          fontSize: 10,
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          color: '#4a4a4a',
        }}
      >
        <span>test run</span>
        <span style={{ color: '#f84356' }}>3 / 4</span>
      </div>
      <div style={{ padding: '9px 9px 11px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {rows.map((row, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 11,
                height: 11,
                border: `2px solid ${row.mark === 'cross' ? '#f84356' : '#111'}`,
                borderRadius: 2,
                position: 'relative',
              }}
            >
              {row.mark === 'check' ? (
                <div
                  style={{
                    position: 'absolute',
                    left: 1,
                    top: 3,
                    width: 6,
                    height: 3,
                    borderLeft: '2px solid #111',
                    borderBottom: '2px solid #111',
                    transform: 'rotate(-45deg)',
                  }}
                />
              ) : (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      left: 4,
                      top: 0,
                      width: 2,
                      height: 11,
                      background: '#f84356',
                      transform: 'rotate(45deg)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: 4,
                      top: 0,
                      width: 2,
                      height: 11,
                      background: '#f84356',
                      transform: 'rotate(-45deg)',
                    }}
                  />
                </>
              )}
            </div>
            <div style={{ flex: 1, height: 6, background: row.bar, opacity: row.barOpacity, borderRadius: 2 }} />
          </div>
        ))}
        <div style={{ marginTop: 2, height: 2, background: '#111', opacity: 0.85 }} />
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ flex: 3, height: 8, border: '2px solid #111' }} />
          <div style={{ flex: 1, height: 8, border: '2px solid #f84356', background: '#f84356' }} />
        </div>
      </div>
    </div>
  );
}

export function PythonMockup() {
  const prompt = { fontFamily: "'Roboto Condensed', sans-serif", fontSize: 11, color: '#f84356' };
  return (
    <div
      style={{
        width: 'clamp(150px, 21vh, 215px)',
        border: '4px solid #111',
        borderRadius: 6,
        background: '#2b2b2b',
        boxShadow: '6px 8px 0 #111',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          padding: '6px 8px',
          borderBottom: '3px solid #111',
          background: '#3a3a3a',
        }}
      >
        <div style={{ width: 7, height: 7, border: '2px solid #efefef', borderRadius: '50%' }} />
        <div style={{ width: 7, height: 7, border: '2px solid #7a7a7a', borderRadius: '50%' }} />
        <div
          style={{
            marginLeft: 'auto',
            fontFamily: "'Roboto Condensed', sans-serif",
            fontSize: 9,
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            color: '#c9c9c9',
          }}
        >
          shell
        </div>
      </div>
      <div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={prompt}>&gt;&gt;&gt;</div>
          <div style={{ flex: 1, height: 6, background: '#6f6f6f', borderRadius: 2 }} />
        </div>
        <div style={{ height: 6, width: '72%', marginLeft: 24, background: '#4f4f4f', borderRadius: 2 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={prompt}>&gt;&gt;&gt;</div>
          <div style={{ flex: 1, height: 6, background: '#6f6f6f', borderRadius: 2 }} />
        </div>
        <div style={{ height: 6, width: '54%', marginLeft: 24, background: '#4f4f4f', borderRadius: 2 }} />
        <div style={{ height: 6, width: '64%', marginLeft: 24, background: '#4f4f4f', borderRadius: 2 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={prompt}>&gt;&gt;&gt;</div>
          <div style={{ width: 8, height: 12, background: '#f84356' }} />
        </div>
      </div>
    </div>
  );
}

export const MOCKUPS = {
  design: DesignMockup,
  api: ApiMockup,
  desktop: DesktopMockup,
  mobile: MobileMockup,
  testing: TestingMockup,
  python: PythonMockup,
};

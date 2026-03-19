import { useRef, useState, useEffect } from 'react';

const ITEMS = [
  {
    id: 0, date: '2024 — Present', badge: 'Current',
    role: 'Full Stack Developer Intern',
    company: 'YourCompany', location: 'Nagpur, MH', type: 'Work',
    desc: 'Building production features for a SaaS platform used by 50k+ users. Engineered REST APIs, cut MongoDB query times by 40%, and shipped React components adopted across the app in bi-weekly sprints.',
    points: [
      'Built 8 REST API endpoints consumed by 50k+ users',
      'Optimized MongoDB aggregation pipelines — 40% faster queries',
      'Shipped 3 React feature modules in Agile sprints',
      'Participated in daily standups, code reviews & sprint planning',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
    accent: '#00e5a0',
  },
  {
    id: 1, date: 'Summer 2023', badge: null,
    role: 'Web Development Intern',
    company: 'AnotherCo', location: 'Remote', type: 'Work',
    desc: 'Shipped 3 client-facing features end-to-end. Integrated Razorpay and Twilio SMS APIs, wrote Jest tests with 85% code coverage.',
    points: [
      'Integrated Razorpay payment gateway',
      'Built Twilio SMS notification system',
      'Wrote Jest unit tests — 85% coverage',
      'Deployed features to production with zero downtime',
    ],
    tech: ['Express', 'MySQL', 'React', 'Jest', 'Postman'],
    accent: '#7c6fff',
  },
  {
    id: 2, date: 'Oct 2023', badge: '🏆 1st Place',
    role: 'Hackathon Champion',
    company: 'CodeFest NIT Nagpur', location: '36-hr Sprint', type: 'Achievement',
    desc: 'Built a real-time disaster management dashboard with live maps, SMS alerts, and resource allocation — won first place among 80+ teams.',
    points: [
      'Built real-time map with Google Maps API',
      'SMS alert system via Twilio',
      'Resource allocation algorithm with priority queues',
      'Won 1st place out of 80+ competing teams',
    ],
    tech: ['Next.js', 'Socket.io', 'Twilio', 'Maps API', 'MongoDB'],
    accent: '#ffd93d',
  },
  {
    id: 3, date: '2021 — 2025', badge: null,
    role: 'B.E. Computer Science',
    company: 'Your University', location: 'Nagpur', type: 'Education',
    desc: 'CGPA: 8.7/10. Led the Coding Club, participated in inter-university hackathons. Core CS fundamentals and practical project experience.',
    points: [
      'CGPA: 8.7 / 10.0',
      'Led College Coding Club (80+ members)',
      'Coursework: DSA, DBMS, OS, CN, Cloud Computing',
      'Final Year Project: MERN Stack SaaS Platform',
    ],
    tech: ['Java', 'Python', 'C++', 'SQL', 'Data Structures'],
    accent: '#60d0ff',
  },
];

const TYPE_COLORS = {
  Work: '#00e5a0', Achievement: '#ffd93d', Education: '#60d0ff',
};

export default function Experience() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const item = ITEMS[active];

  return (
    <section id="experience" style={{ position: 'relative', zIndex: 1 }}>
      <div className="sw" ref={ref}>
        <div className="sh">
          <span className="sn">03 /</span>
          <h2 className="st">Experience</h2>
          <div className="sl" />
        </div>

        {/* ── Stepper nav ── */}
        <div style={{
          display: 'flex', gap: '0', marginBottom: '32px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          opacity: vis ? 1 : 0,
          transform: vis ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s ease',
          overflowX: 'auto', scrollbarWidth: 'none',
        }}>
          {ITEMS.map((it, i) => (
            <button key={it.id} onClick={() => setActive(i)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '16px 28px', textAlign: 'left',
                borderBottom: active === i ? `2px solid ${it.accent}` : '2px solid transparent',
                borderRight: i < ITEMS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                transition: 'all 0.2s', flexShrink: 0,
                background: active === i ? `${it.accent}08` : 'transparent',
              }}
            >
              <div style={{
                fontFamily: "'Space Mono',monospace", fontSize: '9px',
                color: active === i ? it.accent : 'var(--muted)',
                letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px',
                transition: 'color 0.2s',
              }}>{it.date}</div>
              <div style={{
                fontSize: '13px', fontWeight: 700,
                color: active === i ? 'var(--text)' : 'var(--text2)',
                transition: 'color 0.2s', whiteSpace: 'nowrap',
              }}>{it.role.split(' ').slice(0, 3).join(' ')}</div>
              {it.badge && (
                <div style={{
                  fontFamily: "'Space Mono',monospace", fontSize: '9px',
                  color: it.accent, marginTop: '4px',
                }}>{it.badge}</div>
              )}
            </button>
          ))}
        </div>

        {/* ── Detail panel ── */}
        <div
          key={active}
          style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.5s ease 0.1s',
            animation: 'fadeup 0.4s ease both',
          }}
        >
          {/* Left: main info */}
          <div style={{
            background: 'var(--bg3)',
            border: `1px solid ${item.accent}30`,
            padding: '36px', position: 'relative', overflow: 'hidden',
          }}>
            {/* Left accent bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, bottom: 0, width: '3px',
              background: item.accent,
            }} />

            {/* Type badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{
                background: `${item.accent}18`, border: `1px solid ${item.accent}40`,
                color: item.accent, padding: '4px 12px',
                fontFamily: "'Space Mono',monospace", fontSize: '9px',
                letterSpacing: '2px', textTransform: 'uppercase',
              }}>{item.type}</span>
              {item.badge && (
                <span style={{
                  background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)',
                  color: '#ffd93d', padding: '4px 12px',
                  fontFamily: "'Space Mono',monospace", fontSize: '9px',
                  letterSpacing: '2px',
                }}>{item.badge}</span>
              )}
            </div>

            <div style={{
              fontFamily: "'Space Mono',monospace", fontSize: '11px',
              color: item.accent, letterSpacing: '2px',
              textTransform: 'uppercase', marginBottom: '10px',
            }}>{item.date}</div>

            <h3 style={{
              fontSize: '26px', fontWeight: 800, lineHeight: 1.2, marginBottom: '6px',
            }}>{item.role}</h3>
            <div style={{
              fontFamily: "'Space Mono',monospace", fontSize: '12px',
              color: 'var(--muted)', marginBottom: '20px',
            }}>{item.company} · {item.location}</div>

            <p style={{
              fontSize: '14px', color: 'var(--text2)', lineHeight: 1.85, marginBottom: '24px',
            }}>{item.desc}</p>

            {/* Tech stack */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {item.tech.map(t => (
                <span key={t} style={{
                  background: `${item.accent}10`, border: `1px solid ${item.accent}30`,
                  color: item.accent, padding: '4px 12px',
                  fontFamily: "'Space Mono',monospace", fontSize: '11px',
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Right: bullet points + nav */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Achievements */}
            <div style={{
              background: 'var(--bg3)',
              border: '1px solid rgba(255,255,255,0.07)',
              padding: '28px', flex: 1,
            }}>
              <div style={{
                fontFamily: "'Space Mono',monospace", fontSize: '10px',
                color: item.accent, letterSpacing: '3px',
                textTransform: 'uppercase', marginBottom: '20px',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <span style={{ display: 'block', width: '16px', height: '1px', background: item.accent }} />
                Key Highlights
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {item.points.map((pt, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: '14px', alignItems: 'flex-start',
                    animation: `fadeup 0.4s ease ${i * 0.08}s both`,
                  }}>
                    <div style={{
                      width: '20px', height: '20px', flexShrink: 0,
                      background: `${item.accent}15`,
                      border: `1px solid ${item.accent}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'Space Mono',monospace",
                      fontSize: '9px', color: item.accent, fontWeight: 700,
                      marginTop: '1px',
                    }}>{String(i + 1).padStart(2, '0')}</div>
                    <span style={{
                      fontSize: '13px', color: 'var(--text2)', lineHeight: 1.7,
                    }}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prev / Next nav */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setActive(a => Math.max(0, a - 1))}
                disabled={active === 0}
                style={{
                  flex: 1, padding: '12px',
                  background: active === 0 ? 'transparent' : 'var(--bg3)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: active === 0 ? 'var(--muted)' : 'var(--text)',
                  fontFamily: "'Space Mono',monospace", fontSize: '11px',
                  letterSpacing: '2px', textTransform: 'uppercase',
                  cursor: active === 0 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s', opacity: active === 0 ? 0.4 : 1,
                }}
                onMouseEnter={e => { if (active > 0) e.currentTarget.style.borderColor = item.accent + '50'; }}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
              >← Prev</button>

              {/* Dot indicators */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 16px' }}>
                {ITEMS.map((it, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    style={{
                      width: active === i ? '20px' : '6px', height: '6px',
                      borderRadius: '3px', border: 'none',
                      background: active === i ? it.accent : 'rgba(255,255,255,0.15)',
                      transition: 'all 0.3s', cursor: 'pointer', padding: 0,
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => setActive(a => Math.min(ITEMS.length - 1, a + 1))}
                disabled={active === ITEMS.length - 1}
                style={{
                  flex: 1, padding: '12px',
                  background: active === ITEMS.length - 1 ? 'transparent' : 'var(--bg3)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: active === ITEMS.length - 1 ? 'var(--muted)' : 'var(--text)',
                  fontFamily: "'Space Mono',monospace", fontSize: '11px',
                  letterSpacing: '2px', textTransform: 'uppercase',
                  cursor: active === ITEMS.length - 1 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s', opacity: active === ITEMS.length - 1 ? 0.4 : 1,
                }}
                onMouseEnter={e => { if (active < ITEMS.length - 1) e.currentTarget.style.borderColor = item.accent + '50'; }}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
              >Next →</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

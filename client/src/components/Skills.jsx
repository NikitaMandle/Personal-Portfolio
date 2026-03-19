import { useEffect, useRef, useState } from 'react';

const BARS = [
  { name: 'React / Next.js',    pct: 88, color: '#00e5a0', cat: 'Frontend' },
  { name: 'Node.js / Express',  pct: 85, color: '#00e5a0', cat: 'Backend'  },
  { name: 'MongoDB / Mongoose', pct: 82, color: '#7c6fff', cat: 'Database' },
  { name: 'TypeScript',         pct: 74, color: '#7c6fff', cat: 'Frontend' },
  { name: 'Docker / CI-CD',     pct: 65, color: '#ff9090', cat: 'DevOps'   },
  { name: 'AWS / Cloud',        pct: 58, color: '#ff9090', cat: 'DevOps'   },
  { name: 'PostgreSQL',         pct: 72, color: '#60d0ff', cat: 'Database' },
  { name: 'Java / Spring Boot', pct: 68, color: '#ffd93d', cat: 'Backend'  },
];

const CATS = [
  { key: 'Frontend',  color: '#00e5a0', items: ['React.js','Next.js','TypeScript','Tailwind','HTML5','CSS3','Framer Motion'] },
  { key: 'Backend',   color: '#7c6fff', items: ['Node.js','Express','REST APIs','Java','Spring Boot','Python','Socket.io'] },
  { key: 'Database',  color: '#60d0ff', items: ['MongoDB','PostgreSQL','MySQL','Redis','Firebase','Prisma'] },
  { key: 'DevOps',    color: '#ffd93d', items: ['Git','Docker','AWS','CI/CD','Linux','Nginx','Postman'] },
  { key: 'Learning',  color: '#ff9090', items: ['Kubernetes','GraphQL','Microservices','System Design','Kafka'] },
  { key: 'Interests', color: '#ff6bcb', items: ['Open Source','DSA','Clean Code','Problem Solving','Tech Blogs'] },
];

function Bar({ name, pct, color, animate, delay, active }) {
  return (
    <div style={{
      padding: '14px 20px',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      opacity: active ? 1 : 0.35,
      transition: 'opacity 0.3s, background 0.2s',
      background: active ? 'rgba(255,255,255,0.015)' : 'transparent',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '8px',
      }}>
        <span style={{
          fontFamily: "'Space Mono',monospace",
          fontSize: '12px', color: active ? 'var(--text)' : 'var(--muted)',
          transition: 'color 0.3s',
        }}>{name}</span>
        <span style={{
          fontFamily: "'Space Mono',monospace",
          fontSize: '11px', color, fontWeight: 700,
        }}>{pct}%</span>
      </div>
      <div style={{
        height: '4px', background: 'rgba(255,255,255,0.05)',
        borderRadius: '2px', overflow: 'hidden', position: 'relative',
      }}>
        <div style={{
          height: '100%', borderRadius: '2px',
          background: `linear-gradient(90deg,${color}80,${color})`,
          width: animate ? pct + '%' : '0%',
          transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
          boxShadow: `0 0 6px ${color}60`,
        }} />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const tabs = ['All', ...CATS.map(c => c.key)];
  const activeCat = CATS.find(c => c.key === activeTab);

  return (
    <section id="skills" style={{ position: 'relative', zIndex: 1 }} ref={ref}>
      <div className="sw">
        <div className="sh">
          <span className="sn">01 /</span>
          <h2 className="st">Skills</h2>
          <div className="sl" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

          {/* ── LEFT: Skill bars panel ── */}
          <div style={{
            background: 'var(--bg3)',
            border: '1px solid rgba(255,255,255,0.07)',
            overflow: 'hidden',
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease',
          }}>
            {/* Panel header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              background: 'var(--bg4)',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <div style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: 'var(--accent)', animation: 'glow 2s infinite',
              }} />
              <span style={{
                fontFamily: "'Space Mono',monospace", fontSize: '11px',
                color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase',
              }}>Proficiency Index</span>
            </div>

            {/* Bars */}
            <div>
              {BARS.map((b, i) => (
                <Bar
                  key={b.name} {...b} animate={vis} delay={i * 0.1}
                  active={activeTab === 'All' || activeTab === b.cat}
                />
              ))}
            </div>

            {/* Legend */}
            <div style={{
              padding: '14px 20px',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', gap: '20px', flexWrap: 'wrap',
            }}>
              {[['#00e5a0','Frontend/Backend'],['#7c6fff','TypeScript/DB'],['#ff9090','DevOps'],['#60d0ff','Database'],['#ffd93d','Java']].map(([c,l]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: c, display: 'block' }} />
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '9px', color: 'var(--muted)' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Stack category explorer ── */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '0',
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease 0.15s',
          }}>
            {/* Tabs */}
            <div style={{
              display: 'flex', overflowX: 'auto', gap: '0',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              scrollbarWidth: 'none',
            }}>
              {tabs.map(tab => {
                const cat = CATS.find(c => c.key === tab);
                const isActive = activeTab === tab;
                return (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    style={{
                      fontFamily: "'Space Mono',monospace",
                      fontSize: '10px', letterSpacing: '1.5px',
                      textTransform: 'uppercase', padding: '12px 16px',
                      border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                      background: isActive ? 'var(--bg3)' : 'transparent',
                      color: isActive ? (cat?.color || 'var(--accent)') : 'var(--muted)',
                      borderBottom: isActive ? `2px solid ${cat?.color || 'var(--accent)'}` : '2px solid transparent',
                      transition: 'all 0.2s',
                    }}>
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Category content */}
            <div style={{
              background: 'var(--bg3)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderTop: 'none', flex: 1,
              padding: '28px 24px',
            }}>
              {activeTab === 'All' ? (
                /* All view: all categories stacked */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {CATS.map(cat => (
                    <div key={cat.key}>
                      <div style={{
                        fontFamily: "'Space Mono',monospace", fontSize: '10px',
                        color: cat.color, letterSpacing: '2px',
                        textTransform: 'uppercase', marginBottom: '10px',
                        display: 'flex', alignItems: 'center', gap: '8px',
                      }}>
                        <span style={{ width: '12px', height: '1px', background: cat.color, display: 'block' }} />
                        {cat.key}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                        {cat.items.map(item => (
                          <span key={item} style={{
                            background: `${cat.color}0d`,
                            border: `1px solid ${cat.color}28`,
                            color: 'var(--text2)', padding: '4px 11px',
                            fontFamily: "'Space Mono',monospace", fontSize: '11px',
                          }}>{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Single category view */
                <div>
                  <div style={{
                    display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px',
                  }}>
                    <h3 style={{
                      fontSize: '28px', fontWeight: 800,
                      color: activeCat?.color,
                    }}>{activeTab}</h3>
                    <span style={{
                      fontFamily: "'Space Mono',monospace", fontSize: '11px', color: 'var(--muted)',
                    }}>{activeCat?.items.length} tools</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {activeCat?.items.map((item, i) => (
                      <span key={item} style={{
                        background: `${activeCat.color}10`,
                        border: `1px solid ${activeCat.color}35`,
                        color: activeCat.color,
                        padding: '8px 16px',
                        fontFamily: "'Space Mono',monospace", fontSize: '12px',
                        animation: `fadeup 0.4s ease ${i * 0.05}s both`,
                      }}>{item}</span>
                    ))}
                  </div>

                  {/* Matching proficiency bars for this category */}
                  {BARS.filter(b => b.cat === activeTab).length > 0 && (
                    <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{
                        fontFamily: "'Space Mono',monospace", fontSize: '10px',
                        color: 'var(--muted)', letterSpacing: '2px',
                        textTransform: 'uppercase', marginBottom: '14px',
                      }}>Proficiency</div>
                      {BARS.filter(b => b.cat === activeTab).map((b, i) => (
                        <div key={b.name} style={{ marginBottom: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '12px', color: 'var(--text2)' }}>{b.name}</span>
                            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '11px', color: activeCat.color, fontWeight: 700 }}>{b.pct}%</span>
                          </div>
                          <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{
                              height: '100%', borderRadius: '2px',
                              background: `linear-gradient(90deg,${activeCat.color}80,${activeCat.color})`,
                              width: vis ? b.pct + '%' : '0%',
                              transition: `width 1s ease ${i * 0.15}s`,
                            }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

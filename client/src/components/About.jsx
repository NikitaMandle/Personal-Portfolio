import { useEffect, useRef, useState } from 'react';

const TRAITS = [
  { icon: '⚡', label: 'Fast Learner',      desc: 'New tech in days, not weeks',       color: '#00e5a0' },
  { icon: '🔗', label: 'API Architect',     desc: 'RESTful, clean, versioned',          color: '#7c6fff' },
  { icon: '🧱', label: 'Clean Coder',       desc: 'SOLID principles, readable commits', color: '#60d0ff' },
  { icon: '🚀', label: 'Ship-First',        desc: 'Build MVPs, iterate with feedback',  color: '#ffd93d' },
  { icon: '🏆', label: 'Hackathon Winner',  desc: '3× first place podium finishes',     color: '#ff9090' },
  { icon: '🌐', label: 'Open Source',       desc: 'Contributor & community member',     color: '#ff6bcb' },
];

const COUNTERS = [
  { end: 12, suffix: '+', label: 'Projects shipped' },
  { end: 8,  suffix: '.7', label: 'CGPA out of 10' },
  { end: 6,  suffix: 'mo', label: 'Internship exp' },
  { end: 3,  suffix: '×',  label: 'Hackathon wins' },
];

function Counter({ end, suffix, label, run }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let start = 0;
    const step = end / 40;
    const t = setInterval(() => {
      start += step;
      if (start >= end) { setVal(end); clearInterval(t); }
      else setVal(Math.floor(start));
    }, 35);
    return () => clearInterval(t);
  }, [run, end]);

  return (
    <div style={{
      background: 'var(--bg3)', border: '1px solid rgba(255,255,255,0.07)',
      padding: '20px 16px', textAlign: 'center', flex: 1,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(0,229,160,0.03) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>
        {val}{suffix}
      </div>
      <div style={{
        fontFamily: "'Space Mono',monospace", fontSize: '9px',
        color: 'var(--muted)', letterSpacing: '1.5px',
        textTransform: 'uppercase', marginTop: '6px',
      }}>{label}</div>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" style={{ background: 'var(--bg2)', position: 'relative', zIndex: 1 }}>
      <div className="sw" ref={ref}>
        <div className="sh">
          <span className="sn">00 /</span>
          <h2 className="st">About</h2>
          <div className="sl" />
        </div>

        {/* ── TOP ROW ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: '300px 1fr',
          gap: '52px', marginBottom: '52px', alignItems: 'start',
        }}>

          {/* Profile card */}
          <div style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease',
          }}>
            {/* Avatar placeholder */}
            <div style={{
              width: '100%', aspectRatio: '1',
              background: 'var(--bg3)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
              marginBottom: '16px',
            }}>
              {/* Grid overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'linear-gradient(rgba(0,229,160,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,160,0.04) 1px,transparent 1px)',
                backgroundSize: '20px 20px',
              }} />
              {/* Corner brackets */}
              {[
                { top: 10, left: 10, bt: 'borderTop', bl: 'borderLeft' },
                { top: 10, right: 10, bt: 'borderTop', bl: 'borderRight' },
                { bottom: 10, left: 10, bt: 'borderBottom', bl: 'borderLeft' },
                { bottom: 10, right: 10, bt: 'borderBottom', bl: 'borderRight' },
              ].map((pos, i) => (
                <div key={i} style={{
                  position: 'absolute', width: 20, height: 20,
                  ...pos,
                  [pos.bt]: '2px solid var(--accent)',
                  [pos.bl]: '2px solid var(--accent)',
                }} />
              ))}
              {/* Initials */}
              <div style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: '64px', fontWeight: 800,
                color: 'rgba(0,229,160,0.15)',
                letterSpacing: '-4px', zIndex: 1,
                lineHeight: 1,
              }}>NM</div>
              <div style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: '10px', color: 'var(--muted)',
                letterSpacing: '3px', marginTop: '8px', zIndex: 1,
              }}>PHOTO COMING SOON</div>
            </div>

            {/* Name + role */}
            <div style={{
              background: 'var(--bg3)', border: '1px solid rgba(255,255,255,0.07)',
              padding: '16px 18px',
            }}>
              <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '4px' }}>
                Nikita Mandle
              </div>
              <div style={{
                fontFamily: "'Space Mono',monospace", fontSize: '11px',
                color: 'var(--accent)', letterSpacing: '1px',
              }}>
                Full Stack Developer
              </div>
              <div style={{
                height: '1px', background: 'rgba(255,255,255,0.07)',
                margin: '12px 0',
              }} />
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                fontFamily: "'Space Mono',monospace", fontSize: '11px',
                color: 'var(--muted)',
              }}>
                <span style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: '#00e5a0', animation: 'glow 2s infinite',
                  display: 'inline-block', flexShrink: 0,
                }} />
                Available · Nagpur, IN
              </div>
            </div>
          </div>

          {/* Bio + counters */}
          <div style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease 0.1s',
          }}>
            <div style={{
              fontFamily: "'Space Mono',monospace", fontSize: '11px',
              color: 'var(--accent)', letterSpacing: '3px',
              textTransform: 'uppercase', marginBottom: '18px',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--accent)' }} />
              // Who I am
            </div>

            <h3 style={{
              fontSize: 'clamp(22px, 3vw, 34px)',
              fontWeight: 800, lineHeight: 1.2, marginBottom: '20px',
            }}>
              Building digital products that<br />
              <span style={{ color: 'var(--accent)' }}>people actually enjoy using.</span>
            </h3>

            <p style={{
              fontSize: '15px', color: 'var(--text2)',
              lineHeight: 1.9, marginBottom: '14px',
            }}>
              I'm a final-year B.E. Computer Science student and Full Stack Developer
              Intern from Nagpur, Maharashtra. I love building things end-to-end — from
              designing MongoDB schemas to crafting pixel-perfect React UIs.
            </p>
            <p style={{
              fontSize: '14px', color: 'var(--muted)',
              lineHeight: 1.9, marginBottom: '32px',
            }}>
              Outside work, I contribute to open-source, compete in hackathons, and grind
              DSA on LeetCode. I believe great software comes from strong fundamentals,
              clean code, and relentless curiosity.
            </p>

            {/* Counters */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '28px' }}>
              {COUNTERS.map(c => (
                <Counter key={c.label} {...c} run={vis} />
              ))}
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['B.E. CS — 8.7 CGPA', 'Nagpur, Maharashtra', 'Jun 2025 Graduate', 'Open to Relocate'].map(t => (
                <span key={t} style={{
                  fontFamily: "'Space Mono',monospace", fontSize: '11px',
                  color: 'var(--accent)', border: '1px solid var(--border)',
                  padding: '6px 14px', background: 'rgba(0,229,160,0.04)',
                }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── BOTTOM: Trait cards ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '10px',
        }}>
          {TRAITS.map((t, i) => (
            <TraitCard key={t.label} {...t} vis={vis} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TraitCard({ icon, label, desc, color, vis, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? `${color}0a` : 'var(--bg3)',
        border: `1px solid ${hov ? color + '50' : 'rgba(255,255,255,0.07)'}`,
        padding: '20px 16px', textAlign: 'center',
        transition: 'all 0.3s ease',
        transform: vis ? (hov ? 'translateY(-5px)' : 'translateY(0)') : 'translateY(24px)',
        opacity: vis ? 1 : 0,
        transitionDelay: `${delay}s`,
        cursor: 'default', position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
        background: color, transform: hov ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left', transition: 'transform 0.3s ease',
      }} />
      <div style={{ fontSize: '24px', marginBottom: '10px' }}>{icon}</div>
      <div style={{
        fontSize: '12px', fontWeight: 700,
        color: hov ? color : 'var(--text)', marginBottom: '6px',
        transition: 'color 0.3s',
      }}>{label}</div>
      <div style={{
        fontFamily: "'Space Mono',monospace", fontSize: '10px',
        color: 'var(--muted)', lineHeight: 1.6,
      }}>{desc}</div>
    </div>
  );
}

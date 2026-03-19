import { useEffect, useState } from 'react';
import { Link } from 'react-scroll';

const PHRASES = [
  'fast web apps.',
  'clean REST APIs.',
  'full-stack solutions.',
  'things that scale.',
  'the future.',
];

const CODE = [
  { color: '#7c6fff', text: 'const developer = {' },
  { color: '#00e5a0', text: "  name: 'Nikita Mandle'," },
  { color: '#00e5a0', text: "  role: 'Full Stack Dev'," },
  { color: '#a0a0c0', text: '  stack: [' },
  { color: '#ff9090', text: "    'React', 'Node.js'," },
  { color: '#ff9090', text: "    'MongoDB', 'Express'," },
  { color: '#a0a0c0', text: '  ],' },
  { color: '#ffcc80', text: '  available: true,' },
  { color: '#60d0ff', text: "  location: 'Nagpur, IN'" },
  { color: '#7c6fff', text: '};' },
];

const STATS = [
  { num: '12+', label: 'Projects' },
  { num: '8+', label: 'Technologies' },
  { num: '6mo', label: 'Interning' },
  { num: '3', label: 'Hackathons' },
];

export default function Hero() {
  const [typed, setTyped] = useState('');
  const [pi, setPi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  const [visLines, setVisLines] = useState(0);

  // Typing animation
  useEffect(() => {
    const word = PHRASES[pi];
    const t = setTimeout(() => {
      if (!del) {
        if (ci < word.length) { setTyped(word.slice(0, ci + 1)); setCi(c => c + 1); }
        else setTimeout(() => setDel(true), 1800);
      } else {
        if (ci > 0) { setCi(c => c - 1); setTyped(word.slice(0, ci - 1)); }
        else { setDel(false); setPi(p => (p + 1) % PHRASES.length); }
      }
    }, del ? 35 : 75);
    return () => clearTimeout(t);
  }, [ci, del, pi]);

  // Code lines animate in
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      i++; setVisLines(i);
      if (i >= CODE.length) clearInterval(iv);
    }, 180);
    return () => clearInterval(iv);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '120px 72px 60px',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow blobs */}
      <div style={{
        position: 'absolute', top: '-15%', right: '-8%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,111,255,0.07) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', left: '-5%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,229,160,0.05) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Two-column grid */}
      <div
        className="hero-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── LEFT COLUMN ── */}
        <div>
          {/* Available badge */}
          <div
            className="fu"
            style={{
              animationDelay: '0.1s',
              display: 'flex', alignItems: 'center', gap: '10px',
              marginBottom: '28px',
            }}
          >
            <div style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: 'var(--accent)', animation: 'glow 2s ease infinite',
            }} />
            <span style={{
              fontFamily: "'Space Mono', monospace", fontSize: '11px',
              color: 'var(--accent)', letterSpacing: '4px', textTransform: 'uppercase',
            }}>
              Available for opportunities
            </span>
          </div>

          {/* Name */}
          <h1
            className="fu"
            style={{
              animationDelay: '0.25s',
              fontSize: 'clamp(56px, 8vw, 104px)',
              fontWeight: 800, lineHeight: 0.9,
              letterSpacing: '-3px', marginBottom: '24px',
            }}
          >
            NIKITA
            <br />
            <span style={{ WebkitTextStroke: '1.5px var(--accent)', color: 'transparent' }}>
              MANDLE
            </span>
          </h1>

          {/* Typing line */}
          <p
            className="fu"
            style={{
              animationDelay: '0.4s',
              fontFamily: "'Space Mono', monospace",
              fontSize: '16px', color: 'var(--text2)',
              marginBottom: '22px', minHeight: '26px',
            }}
          >
            I build&nbsp;
            <span style={{ color: 'var(--accent2)' }}>{typed}</span>
            <span style={{
              display: 'inline-block', width: '2px', height: '16px',
              background: 'var(--accent)', marginLeft: '2px',
              animation: 'blink 1s infinite', verticalAlign: 'middle',
            }} />
          </p>

          {/* Description */}
          <p
            className="fu"
            style={{
              animationDelay: '0.5s',
              maxWidth: '460px', fontSize: '16px',
              lineHeight: 1.85, color: 'var(--muted)', marginBottom: '44px',
            }}
          >
            Final year CS student crafting seamless digital experiences — from
            MongoDB schemas to React UIs. Currently interning as a Full Stack
            Developer in Nagpur.
          </p>

          {/* CTA Buttons */}
          <div
            className="fu"
            style={{ animationDelay: '0.6s', display: 'flex', gap: '14px', flexWrap: 'wrap' }}
          >
            <Link to="projects" smooth duration={700} offset={-80}>
              <button className="btn btn-p">View Projects →</button>
            </Link>
            <Link to="contact" smooth duration={700} offset={-80}>
              <button className="btn btn-g">Get In Touch</button>
            </Link>
          </div>

          {/* Stats row */}
          <div
            className="fu"
            style={{
              animationDelay: '0.75s',
              display: 'flex', gap: '44px', marginTop: '56px',
              paddingTop: '40px', borderTop: '1px solid var(--border2)',
              flexWrap: 'wrap',
            }}
          >
            {STATS.map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>
                  {s.num}
                </div>
                <div style={{
                  fontFamily: "'Space Mono', monospace", fontSize: '10px',
                  color: 'var(--muted)', letterSpacing: '2px',
                  textTransform: 'uppercase', marginTop: '5px',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN: Code Panel ── */}
        <div
          className="code-panel fu"
          style={{
            animationDelay: '0.6s',
            animation: 'float 5s ease-in-out infinite, fadeup 0.7s ease 0.6s both',
          }}
        >
          {/* Window chrome */}
          <div style={{
            background: 'var(--bg3)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderTop: '2px solid var(--accent2)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
            overflow: 'hidden',
          }}>
            {/* Title bar */}
            <div style={{
              padding: '12px 18px', background: 'var(--bg4)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              {['#ff6b6b', '#ffd93d', '#6bcb77'].map((c, i) => (
                <div key={i} style={{
                  width: '10px', height: '10px',
                  borderRadius: '50%', background: c, opacity: 0.8,
                }} />
              ))}
              <span style={{
                fontFamily: "'Space Mono', monospace", fontSize: '11px',
                color: 'var(--muted)', marginLeft: '10px',
              }}>
                portfolio.js
              </span>
              <span style={{
                marginLeft: 'auto', fontFamily: "'Space Mono', monospace",
                fontSize: '10px', color: 'var(--accent)',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <span style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: 'var(--accent)', animation: 'glow 1.5s infinite',
                  display: 'inline-block',
                }} />
                LIVE
              </span>
            </div>

            {/* Code body */}
            <div style={{ padding: '24px 20px', fontFamily: "'Space Mono', monospace", fontSize: '13px', lineHeight: 2 }}>
              {CODE.map((line, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex', alignItems: 'center',
                    opacity: i < visLines ? 1 : 0,
                    transform: i < visLines ? 'translateX(0)' : 'translateX(-10px)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                  }}
                >
                  <span style={{
                    color: 'var(--muted)', fontSize: '10px',
                    marginRight: '20px', userSelect: 'none',
                    minWidth: '18px', textAlign: 'right',
                  }}>
                    {i + 1}
                  </span>
                  <span style={{ color: line.color }}>{line.text}</span>
                  {i === visLines - 1 && visLines < CODE.length && (
                    <span style={{
                      display: 'inline-block', width: '7px', height: '14px',
                      background: line.color, marginLeft: '2px',
                      animation: 'blink 0.7s infinite', verticalAlign: 'middle',
                    }} />
                  )}
                </div>
              ))}
            </div>

            {/* Status bar */}
            <div style={{
              padding: '8px 20px', background: 'rgba(0,229,160,0.06)',
              borderTop: '1px solid rgba(0,229,160,0.15)',
              display: 'flex', gap: '20px', alignItems: 'center',
            }}>
              {[
                { dot: '#00e5a0', text: 'node server.js :5000' },
                { dot: '#7c6fff', text: 'react app :5173' },
                { dot: '#ffd93d', text: 'mongodb connected' },
              ].map(item => (
                <span key={item.text} style={{
                  fontFamily: "'Space Mono', monospace", fontSize: '10px',
                  color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  <span style={{
                    width: '5px', height: '5px', borderRadius: '50%',
                    background: item.dot, display: 'inline-block',
                  }} />
                  {item.text}
                </span>
              ))}
            </div>
          </div>

          {/* Floating badges below the panel */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
            {['MongoDB', 'Express', 'React', 'Node.js'].map((t, i) => (
              <span key={t} style={{
                fontFamily: "'Space Mono', monospace", fontSize: '10px',
                color: 'var(--accent)', border: '1px solid var(--border)',
                padding: '4px 12px', letterSpacing: '1px',
                animation: `float ${3 + i * 0.4}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
                background: 'rgba(0,229,160,0.04)',
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '32px', left: '72px',
        fontFamily: "'Space Mono', monospace", fontSize: '10px',
        color: 'var(--muted)', letterSpacing: '3px', textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', gap: '12px', zIndex: 1,
      }}>
        Scroll to explore
        <div style={{
          width: '60px', height: '1px', background: 'var(--border2)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, width: '30px', height: '100%',
            background: 'var(--accent)', animation: 'scanline 1.8s linear infinite',
          }} />
        </div>
      </div>
    </section>
  );
}

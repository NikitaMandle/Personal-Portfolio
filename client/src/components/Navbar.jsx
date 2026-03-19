import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

const NAV = ['about', 'skills', 'projects', 'experience', 'contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? '14px 72px' : '22px 72px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: scrolled ? 'rgba(7,7,14,0.94)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      transition: 'all 0.4s ease',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '34px', height: '34px',
          border: '1px solid var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Space Mono',monospace", fontSize: '11px',
          color: 'var(--accent)', fontWeight: 700, letterSpacing: '1px',
        }}>
          NM
        </div>
        <span style={{
          fontFamily: "'Space Mono',monospace", fontSize: '13px',
          color: 'var(--text)', letterSpacing: '0.5px',
        }}>
          NikitaMandle<span style={{ color: 'var(--accent)' }}>.dev</span>
        </span>
      </div>

      {/* Nav links */}
      <ul style={{ display: 'flex', gap: '32px', listStyle: 'none', alignItems: 'center' }}>
        {NAV.map(l => (
          <li key={l}>
            <Link
              to={l} smooth duration={700} offset={-80}
              onSetActive={() => setActive(l)}
              style={{
                fontFamily: "'Space Mono',monospace", fontSize: '11px',
                letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer',
                textDecoration: 'none',
                color: active === l ? 'var(--accent)' : 'var(--muted)',
                transition: 'color 0.3s',
                position: 'relative', paddingBottom: '4px',
              }}
            >
              {active === l && (
                <span style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '1px', background: 'var(--accent)',
                }} />
              )}
              {l}
            </Link>
          </li>
        ))}

        {/* Resume button */}
        <li>
          <a
            href="https://drive.google.com/file/d/1rhiDe964KC6SkQvLFZUVh_uwxdNaTuU7/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Space Mono',monospace", fontSize: '11px',
              letterSpacing: '2px', textTransform: 'uppercase',
              padding: '9px 20px',
              border: '1px solid var(--accent)', color: 'var(--accent)',
              textDecoration: 'none', transition: 'all 0.3s',
              display: 'inline-block',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--accent)';
              e.currentTarget.style.color = '#07070e';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--accent)';
            }}
          >
            Resume ↗
          </a>
        </li>
      </ul>

      <style>{`
        @media(max-width: 768px) {
          nav { padding: 14px 22px !important; }
          nav ul { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

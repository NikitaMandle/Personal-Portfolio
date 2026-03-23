import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

const NAV = ['about', 'skills', 'projects', 'experience', 'contact'];
const RESUME_URL = 'https://drive.google.com/file/d/1rhiDe964KC6SkQvLFZUVh_uwxdNaTuU7/view?usp=drive_link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="site-nav" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? '14px 72px' : '22px 72px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: scrolled ? 'rgba(7,7,14,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}>
        {/* Logo */}
        <div className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="nav-brand-mark" style={{
            width: '34px', height: '34px',
            border: '1px solid var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Space Mono',monospace", fontSize: '11px',
            color: 'var(--accent)', fontWeight: 700, letterSpacing: '1px',
          }}>
            NM
          </div>
          <span className="nav-brand-text" style={{
            fontFamily: "'Space Mono',monospace", fontSize: '13px',
            color: 'var(--text)', letterSpacing: '0.5px',
          }}>
            NikitaMandle<span style={{ color: 'var(--accent)' }}>.dev</span>
          </span>
        </div>

        {/* Desktop nav */}
        <ul className="desktop-nav" style={{ display: 'flex', gap: '32px', listStyle: 'none', alignItems: 'center' }}>
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

          <li>
            <a
              href={RESUME_URL}
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

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
          style={{
            width: '40px', height: '40px',
            display: 'none',
            border: '1px solid rgba(0,229,160,0.45)',
            background: menuOpen ? 'rgba(0,229,160,0.10)' : 'transparent',
            alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
          }}
        >
          <span style={{
            width: '17px', height: '2px', background: 'var(--accent)',
            position: 'relative', display: 'block',
            transform: menuOpen ? 'rotate(45deg)' : 'none',
            transition: 'transform 0.2s ease',
          }}>
            <span style={{
              content: '""', position: 'absolute', left: 0, top: '-6px',
              width: '17px', height: '2px', background: 'var(--accent)',
              opacity: menuOpen ? 0 : 1,
              transition: 'opacity 0.2s ease',
            }} />
            <span style={{
              content: '""', position: 'absolute', left: 0, top: '6px',
              width: '17px', height: '2px', background: 'var(--accent)',
              transform: menuOpen ? 'rotate(90deg) translateX(-6px)' : 'none',
              transition: 'transform 0.2s ease',
            }} />
          </span>
        </button>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={closeMenu}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(3,3,8,0.65)',
            backdropFilter: 'blur(2px)',
            zIndex: 95,
          }}
        />
      )}

      {/* Mobile menu panel */}
      <div
        className="mobile-menu-panel"
        style={{
          position: 'fixed', top: '72px', left: 0, right: 0,
          zIndex: 99,
          padding: '16px 22px 20px',
          background: 'rgba(9,9,18,0.98)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-120%)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'all 0.25s ease',
        }}
      >
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {NAV.map(l => (
            <li key={l}>
              <Link
                to={l} smooth duration={700} offset={-70}
                onSetActive={() => setActive(l)}
                onClick={closeMenu}
                style={{
                  display: 'block',
                  fontFamily: "'Space Mono',monospace", fontSize: '12px',
                  letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer',
                  textDecoration: 'none',
                  color: active === l ? 'var(--accent)' : 'var(--text2)',
                  padding: '12px 10px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: active === l ? 'rgba(0,229,160,0.08)' : 'transparent',
                }}
              >
                {l}
              </Link>
            </li>
          ))}
          <li style={{ marginTop: '8px' }}>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              style={{
                display: 'block',
                fontFamily: "'Space Mono',monospace", fontSize: '12px',
                letterSpacing: '2px', textTransform: 'uppercase',
                padding: '12px 10px',
                border: '1px solid var(--accent)',
                color: 'var(--accent)',
                textDecoration: 'none',
                background: 'rgba(0,229,160,0.06)',
              }}
            >
              Resume ↗
            </a>
          </li>
        </ul>
      </div>

      <style>{`
        @media(max-width: 768px) {
          nav { padding: 14px 22px !important; }
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
}

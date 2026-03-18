import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

const NAV = ['about','skills','projects','experience','contact'];
const RESUME_FILE = '/Nikita-Mandle-Resume.pdf';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:100,
      padding: scrolled ? '14px 72px' : '22px 72px',
      display:'flex', justifyContent:'space-between', alignItems:'center',
      background: scrolled ? 'rgba(7,7,14,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border2)' : '1px solid transparent',
      transition: 'all 0.4s',
    }}>
      {/* Logo */}
      <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
        <div style={{
          width:'32px', height:'32px', border:'1px solid var(--accent)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontFamily:"'Space Mono',monospace", fontSize:'12px', color:'var(--accent)',
          fontWeight:700,
        }}>NM</div>
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'13px', color:'var(--text)', letterSpacing:'1px' }}>
          NikitaMandle<span style={{ color:'var(--accent)' }}>.</span>dev
        </span>
      </div>

      {/* Desktop links */}
      <ul style={{ display:'flex', gap:'36px', listStyle:'none', alignItems:'center' }}
        className="desktop-nav">
        {NAV.map(l => (
          <li key={l}>
            <Link to={l} smooth duration={700} offset={-80}
              onSetActive={() => setActive(l)}
              style={{
                fontFamily:"'Space Mono',monospace", fontSize:'11px',
                color: active === l ? 'var(--accent)' : 'var(--muted)',
                textDecoration:'none', letterSpacing:'2px', textTransform:'uppercase',
                cursor:'pointer', transition:'color 0.3s', position:'relative',
                paddingBottom:'4px',
              }}>
              {active === l && (
                <span style={{ position:'absolute', bottom:0, left:0, right:0, height:'1px', background:'var(--accent)' }} />
              )}
              {l}
            </Link>
          </li>
        ))}
        <li>
          <a href={RESUME_FILE} download="Nikita-Mandle-Resume.pdf" style={{
            fontFamily:"'Space Mono',monospace", fontSize:'11px', letterSpacing:'2px',
            textTransform:'uppercase', padding:'9px 20px',
            border:'1px solid var(--accent)', color:'var(--accent)',
            textDecoration:'none', transition:'all 0.3s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.background='var(--accent)';e.currentTarget.style.color='#07070e';}}
          onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='var(--accent)';}}>
            Resume ↗
          </a>
        </li>
      </ul>

      {/* Mobile hamburger */}
      <button onClick={() => setMenuOpen(o => !o)}
        style={{ display:'none', background:'none', border:'none', cursor:'pointer', padding:'4px' }}
        className="hamburger">
        <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
          {[0,1,2].map(i => (
            <span key={i} style={{ display:'block', width:'24px', height:'1.5px', background:'var(--text)', transition:'all 0.3s',
              transform: menuOpen ? (i===0?'rotate(45deg) translate(5px,5px)': i===1?'scaleX(0)':'rotate(-45deg) translate(5px,-5px)') : 'none'
            }} />
          ))}
        </div>
      </button>

      <style>{`
        @media(max-width:768px){
          nav { padding: 14px 22px !important; }
          .desktop-nav { display:none !important; }
          .hamburger { display:block !important; }
        }
      `}</style>
    </nav>
  );
}

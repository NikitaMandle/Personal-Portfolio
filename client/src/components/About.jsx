import { useEffect, useRef, useState } from 'react';

const FACTS = [
  { icon: '⚡', label: 'Fast Learner', desc: 'Pick up new tech in days, not weeks' },
  { icon: '🔗', label: 'API Architect', desc: 'RESTful, clean, versioned endpoints' },
  { icon: '🧱', label: 'Clean Coder', desc: 'SOLID principles & readable commits' },
  { icon: '🚀', label: 'Ship-First Mindset', desc: 'Build MVPs, iterate with feedback' },
];

export default function About() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" style={{ background:'var(--bg2)', position:'relative', zIndex:1 }}>
      <div className="sw" ref={ref}>
        <div className="sh">
          <span className="sn">00 /</span>
          <h2 className="st">About</h2>
          <div className="sl" />
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'center', maxWidth:'1000px' }}>
          {/* Left: text */}
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(30px)', transition:'all 0.7s ease' }}>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'11px', color:'var(--accent)', letterSpacing:'3px', textTransform:'uppercase', marginBottom:'20px' }}>
              // Who I am
            </div>
            <h3 style={{ fontSize:'28px', fontWeight:800, lineHeight:1.25, marginBottom:'22px' }}>
              Turning coffee & code into<br />
              <span style={{ color:'var(--accent)' }}>production-ready apps</span>
            </h3>
            <p style={{ fontSize:'14px', color:'var(--text2)', lineHeight:1.9, marginBottom:'16px' }}>
              I'm a final-year B.E. Computer Science student and Full Stack Developer Intern from Nagpur, Maharashtra. I love building things that live on the internet — from REST APIs to responsive UIs.
            </p>
            <p style={{ fontSize:'14px', color:'var(--muted)', lineHeight:1.9, marginBottom:'32px' }}>
              When I'm not writing code, I'm contributing to open-source, competing in hackathons, or deep in LeetCode. I believe great software is built on strong fundamentals and relentless curiosity.
            </p>
            <div style={{ display:'flex', gap:'16px', flexWrap:'wrap' }}>
              {['B.E. CS — 8.7 CGPA', 'Nagpur, Maharashtra', 'Available Jun 2025'].map(t => (
                <span key={t} style={{ fontFamily:"'Space Mono',monospace", fontSize:'11px', color:'var(--accent)', border:'1px solid var(--border)', padding:'6px 14px', letterSpacing:'1px' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Right: fact cards */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
            {FACTS.map((f, i) => (
              <div key={f.label}
                style={{
                  background:'var(--bg3)', border:'1px solid var(--border2)',
                  padding:'22px 20px',
                  opacity: vis ? 1 : 0,
                  transform: vis ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s ease ${0.1 + i*0.1}s`,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.transform='translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.transform='translateY(0)'; }}
              >
                <div style={{ fontSize:'22px', marginBottom:'10px' }}>{f.icon}</div>
                <div style={{ fontSize:'14px', fontWeight:700, marginBottom:'6px' }}>{f.label}</div>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'var(--muted)', lineHeight:1.6, letterSpacing:'0.5px' }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

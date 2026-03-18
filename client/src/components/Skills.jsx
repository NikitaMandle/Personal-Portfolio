import { useEffect, useRef, useState } from 'react';

const SKILLS_BARS = [
  { name: 'React / Next.js', pct: 88, color: '#00e5a0' },
  { name: 'Node.js / Express', pct: 85, color: '#00e5a0' },
  { name: 'MongoDB / Mongoose', pct: 82, color: '#7c6fff' },
  { name: 'TypeScript', pct: 74, color: '#7c6fff' },
  { name: 'Docker / CI-CD', pct: 65, color: '#ff9090' },
  { name: 'AWS / Cloud', pct: 58, color: '#ff9090' },
];

const CATS = [
  { title: 'Frontend', tags: [['React.js','g'],['Next.js','g'],['TypeScript',''],['Tailwind',''],['HTML5',''],['CSS3','']] },
  { title: 'Backend', tags: [['Node.js','g'],['Express','g'],['REST APIs',''],['Java',''],['Spring Boot',''],['Python','']] },
  { title: 'Database', tags: [['MongoDB','g'],['PostgreSQL','g'],['MySQL',''],['Redis',''],['Firebase','']] },
  { title: 'DevOps & Tools', tags: [['Git','r'],['Docker','r'],['AWS',''],['CI/CD',''],['Linux',''],['Postman','']] },
  { title: 'Currently Learning', tags: [['Kubernetes','g'],['GraphQL','g'],['Microservices',''],['System Design','']] },
  { title: 'Passionate About', tags: [['Open Source','r'],['Problem Solving','r'],['DSA',''],['Clean Code','']] },
];

function SkillBar({ name, pct, color, animate }) {
  return (
    <div style={{ marginBottom:'18px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px', alignItems:'center' }}>
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'12px', color:'var(--text2)' }}>{name}</span>
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'11px', color, opacity:0.8 }}>{pct}%</span>
      </div>
      <div style={{ height:'3px', background:'var(--bg4)', borderRadius:'2px', overflow:'hidden' }}>
        <div style={{
          height:'100%', borderRadius:'2px', background:color,
          width: animate ? pct+'%' : '0%',
          transition: animate ? 'width 1.2s cubic-bezier(0.4,0,0.2,1)' : 'none',
          boxShadow: animate ? `0 0 8px ${color}60` : 'none',
        }} />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" style={{ position:'relative', zIndex:1 }}>
      <div className="sw" ref={ref}>
        <div className="sh">
          <span className="sn">01 /</span>
          <h2 className="st">Skills</h2>
          <div className="sl" />
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'72px', alignItems:'start' }}>
          {/* Skill bars */}
          <div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'11px', color:'var(--accent)', letterSpacing:'3px', textTransform:'uppercase', marginBottom:'30px' }}>
              // Proficiency
            </div>
            {SKILLS_BARS.map(s => <SkillBar key={s.name} {...s} animate={vis} />)}
          </div>

          {/* Tag grid */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
            {CATS.map((cat, i) => (
              <div key={cat.title}
                style={{
                  background:'var(--bg3)', border:'1px solid var(--border2)',
                  padding:'22px', transition:'all 0.3s',
                  opacity: vis ? 1 : 0,
                  transform: vis ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${i*0.06}s`,
                  position:'relative', overflow:'hidden',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(0,229,160,0.3)'; e.currentTarget.style.transform='translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.transform='translateY(0)'; }}
              >
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg,var(--accent),transparent)', transform: vis ? 'scaleX(1)' : 'scaleX(0)', transformOrigin:'left', transition:`transform 0.5s ease ${0.3+i*0.06}s` }} />
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'var(--accent)', letterSpacing:'3px', textTransform:'uppercase', marginBottom:'14px' }}>{cat.title}</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                  {cat.tags.map(([n,c]) => <span key={n} className={`tag ${c}`}>{n}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

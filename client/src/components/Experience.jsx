import { useRef, useState, useEffect } from 'react';

const TIMELINE = [
  {
    date: '2024 — Present', badge: 'Current',
    role: 'Full Stack Developer Intern',
    company: 'YourCompany', location: 'Nagpur, MH',
    desc: 'Building production features for a SaaS platform used by 50k+ users. Engineered REST APIs, cut MongoDB query times by 40%, and shipped React components in bi-weekly sprints.',
    tech: ['React','Node.js','MongoDB','AWS'],
    accent: '#00e5a0',
  },
  {
    date: 'Summer 2023',
    role: 'Web Development Intern',
    company: 'AnotherCo', location: 'Remote',
    desc: 'Shipped 3 client-facing features end-to-end. Integrated Razorpay and SMS APIs, wrote Jest unit tests with 85% coverage, participated in daily standups.',
    tech: ['Express','MySQL','React','Postman'],
    accent: '#7c6fff',
  },
  {
    date: '2023',
    role: 'Hackathon — 1st Place 🏆',
    company: 'CodeFest NIT Nagpur', location: '36-hr Hackathon',
    desc: 'Built a real-time disaster management dashboard with live maps, SMS alerts, and resource allocation — won first place among 80+ teams.',
    tech: ['Next.js','Socket.io','Twilio','Maps API'],
    accent: '#ffd93d',
  },
  {
    date: '2021 — 2025',
    role: 'B.E. Computer Science',
    company: 'Your University', location: 'Nagpur',
    desc: 'CGPA: 8.7/10. Core coursework in DSA, DBMS, OS, Computer Networks. Led the Coding Club and represented college in inter-university hackathons.',
    tech: ['Java','Python','C++','SQL'],
    accent: '#ff9090',
  },
];

export default function Experience() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" style={{ position:'relative', zIndex:1 }}>
      <div className="sw" ref={ref}>
        <div className="sh">
          <span className="sn">03 /</span>
          <h2 className="st">Experience</h2>
          <div className="sl" />
        </div>

        <div style={{ position:'relative', paddingLeft:'52px', maxWidth:'780px' }}>
          {/* Vertical line */}
          <div style={{
            position:'absolute', left:'7px', top:'8px', bottom:'0', width:'1px',
            background:`linear-gradient(180deg, var(--accent) 0%, transparent 100%)`,
            opacity: vis ? 1 : 0, transition:'opacity 0.6s ease 0.3s',
          }} />

          {TIMELINE.map((item, i) => (
            <div key={i} style={{
              position:'relative', marginBottom:'52px',
              opacity: vis ? 1 : 0,
              transform: vis ? 'translateY(0)' : 'translateY(30px)',
              transition: `all 0.6s ease ${i*0.15}s`,
            }}>
              {/* Dot */}
              <div style={{
                position:'absolute', left:'-48px', top:'6px',
                width:'14px', height:'14px', border:`2px solid ${item.accent}`,
                borderRadius:'50%', background: item.badge ? item.accent : 'var(--bg)',
                boxShadow: `0 0 0 4px ${item.accent}18`,
              }} />

              {/* Card */}
              <div style={{ background:'var(--bg3)', border:'1px solid var(--border2)', padding:'26px 28px', position:'relative', overflow:'hidden', transition:'border-color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = item.accent+'50'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border2)'}>
                <div style={{ position:'absolute', top:0, left:0, bottom:0, width:'3px', background:item.accent, opacity:0.6 }} />

                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'10px', flexWrap:'wrap', gap:'8px' }}>
                  <div>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color: item.accent, letterSpacing:'2px', textTransform:'uppercase', marginBottom:'8px' }}>{item.date}</div>
                    <h3 style={{ fontSize:'19px', fontWeight:800, marginBottom:'4px' }}>{item.role}</h3>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'11px', color:'var(--muted)' }}>
                      {item.company} · {item.location}
                    </div>
                  </div>
                  {item.badge && (
                    <span style={{ background:`${item.accent}18`, border:`1px solid ${item.accent}40`, color:item.accent, padding:'4px 12px', fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', whiteSpace:'nowrap', height:'fit-content' }}>
                      {item.badge}
                    </span>
                  )}
                </div>

                <p style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.8, marginBottom:'18px' }}>{item.desc}</p>

                <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                  {item.tech.map(t => (
                    <span key={t} style={{ background:'var(--bg)', border:'1px solid var(--border2)', padding:'3px 10px', fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'var(--muted)' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

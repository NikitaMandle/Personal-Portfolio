import { useState, useRef, useEffect } from 'react';

const PROJECTS = [
  {
    num:'01', type:'Full Stack', name:'E-Commerce Platform',
    desc:'Scalable shopping platform with real-time inventory, cart, Stripe payments, and admin analytics dashboard. Handles 1000+ concurrent users.',
    stack:['React','Node.js','MongoDB','Stripe','Redis'],
    demo:'#', github:'#', featured:true,
    accent:'#00e5a0',
    tags:['fullstack'],
  },
  {
    num:'02', type:'SaaS Tool', name:'DevCollab Board',
    desc:'Real-time project management with WebSocket live updates, Kanban boards, and team analytics. Built for developer teams.',
    stack:['Next.js','Socket.io','PostgreSQL','Docker'],
    demo:'#', github:'#', featured:false,
    accent:'#7c6fff',
    tags:['fullstack','backend'],
  },
  {
    num:'03', type:'Backend API', name:'Auth Microservice',
    desc:'Production-ready JWT auth service with OAuth2, rate limiting, email verification, and role-based access control. Fully documented.',
    stack:['Express','JWT','Redis','AWS SES'],
    demo:'#', github:'#', featured:false,
    accent:'#ff9090',
    tags:['backend'],
  },
  {
    num:'04', type:'Mobile App', name:'Campus Connect',
    desc:'Student networking app with event listings, club discovery, mess menu, and alumni mentorship portal. Used by 500+ students.',
    stack:['React Native','Firebase','Python','ML'],
    demo:'#', github:'#', featured:false,
    accent:'#ffd93d',
    tags:['fullstack','mobile'],
  },
  {
    num:'05', type:'Frontend', name:'Dev Portfolio v2',
    desc:'This portfolio! Built with MERN stack, animated UI, MongoDB contact form, and deployed on Vercel + Render.',
    stack:['React','Vite','Node.js','MongoDB'],
    demo:'#', github:'#', featured:false,
    accent:'#00e5a0',
    tags:['frontend','fullstack'],
  },
  {
    num:'06', type:'Backend Tool', name:'CLI Task Manager',
    desc:'Terminal-based task manager with MongoDB persistence, priority queues, reminders, and team collaboration via shared workspaces.',
    stack:['Node.js','MongoDB','Commander.js','Chalk'],
    demo:'#', github:'#', featured:false,
    accent:'#7c6fff',
    tags:['backend'],
  },
];

const FILTERS = ['All', 'Full Stack', 'Backend', 'Frontend'];

export default function Projects({ addToast }) {
  const [active, setActive] = useState('All');
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const filtered = active === 'All' ? PROJECTS
    : PROJECTS.filter(p => p.tags.includes(active.toLowerCase().replace(' stack','stack').replace(' ','')) || p.type.toLowerCase().includes(active.toLowerCase()));

  return (
    <section id="projects" style={{ background:'var(--bg2)', position:'relative', zIndex:1 }}>
      <div className="sw" ref={ref}>
        <div className="sh">
          <span className="sn">02 /</span>
          <h2 className="st">Projects</h2>
          <div className="sl" />
        </div>

        {/* Filter tabs */}
        <div style={{ display:'flex', gap:'8px', marginBottom:'48px', flexWrap:'wrap' }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActive(f)}
              style={{
                fontFamily:"'Space Mono',monospace", fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase',
                padding:'8px 20px', border:'none', cursor:'pointer', transition:'all 0.25s',
                background: active===f ? 'var(--accent)' : 'var(--bg3)',
                color: active===f ? '#07070e' : 'var(--muted)',
                borderBottom: active===f ? '2px solid var(--accent)' : '2px solid transparent',
              }}>
              {f}
            </button>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:'20px' }}>
          {filtered.map((p, i) => <ProjectCard key={p.num} p={p} i={i} vis={vis} addToast={addToast} />)}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, i, vis, addToast }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? 'var(--bg4)' : 'var(--bg3)',
        border: `1px solid ${hov ? p.accent+'50' : 'var(--border2)'}`,
        padding:'30px', position:'relative', overflow:'hidden',
        transition:'all 0.35s ease',
        transform: vis ? (hov ? 'translateY(-6px)' : 'translateY(0)') : 'translateY(30px)',
        opacity: vis ? 1 : 0,
        transitionDelay: vis ? `${i*0.07}s` : '0s',
        boxShadow: hov ? `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${p.accent}20` : 'none',
      }}>
      {/* Top accent line */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:`linear-gradient(90deg,${p.accent},transparent)`, opacity: hov ? 1 : 0.3, transition:'opacity 0.3s' }} />

      {/* Featured badge */}
      {p.featured && (
        <div style={{ position:'absolute', top:'16px', right:'16px', background:p.accent, color:'#07070e', fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'2px', padding:'3px 10px', fontWeight:700, textTransform:'uppercase' }}>
          Featured
        </div>
      )}

      {/* Big number */}
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'44px', fontWeight:700, color: hov ? p.accent+'30' : p.accent+'12', lineHeight:1, position:'absolute', bottom:'16px', right:'20px', transition:'color 0.3s', userSelect:'none' }}>{p.num}</div>

      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color: p.accent, letterSpacing:'3px', textTransform:'uppercase', marginBottom:'12px' }}>{p.type}</div>

      <h3 style={{ fontSize:'20px', fontWeight:800, marginBottom:'12px', lineHeight:1.2 }}>{p.name}</h3>
      <p style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.75, marginBottom:'22px' }}>{p.desc}</p>

      <div style={{ display:'flex', flexWrap:'wrap', gap:'6px', marginBottom:'24px' }}>
        {p.stack.map(s => (
          <span key={s} style={{ background:'var(--bg)', border:'1px solid var(--border2)', padding:'3px 10px', fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'var(--muted)' }}>{s}</span>
        ))}
      </div>

      <div style={{ display:'flex', gap:'20px' }}>
        {[['Live Demo', p.demo], ['GitHub', p.github]].map(([label, href]) => (
          <a key={label} href={href}
            style={{ fontFamily:"'Space Mono',monospace", fontSize:'11px', color:'var(--muted)', textDecoration:'none', letterSpacing:'1px', display:'flex', alignItems:'center', gap:'5px', transition:'color 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.color = p.accent}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
            {label} <span style={{ fontSize:'13px' }}>↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}

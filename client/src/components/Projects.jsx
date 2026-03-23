import { useState, useRef, useEffect } from 'react';
import { trackEvent } from '../utils/analytics';

const PROJECTS = [
  {
    id: '01', type: 'Full Stack', name: 'E-Learning Platform', featured: true,
    desc: 'Built a full-stack e-learning platform with course management, user authentication, progress tracking, and interactive dashboards for students and instructors.',
    long: 'Built a complete e-commerce solution from scratch — React storefront, Node.js REST API, MongoDB for product/order data, and Redis for session caching. Stripe integration for payments. Admin dashboard with Chart.js analytics.',
    stack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis', 'Express'],
    github: 'https://github.com/NikitaMandle/e-learning-platform', accent: '#00e5a0',
    tags: ['fullstack'],
    metrics: ['JWT auth', 'Role-based admin', 'Payment flow'],
    outcome: 'Delivered 30+ REST endpoints and reduced key query response times with indexing + Redis cache.',
  },
  {
    id: '02', type: 'Full Stack', name: 'Unicarrer', featured: false,
    desc: 'Built a full-stack placement platform (UniCareer) with student profiles, job listings, application tracking, and role-based dashboards for students and administrators.',
    stack: ['Next.js', 'Socket.io', 'PostgreSQL', 'Docker'],
    demo: '#', github: 'https://github.com/NikitaMandle/unicareer-coderush', accent: '#7c6fff',
    tags: ['fullstack', 'backend'],
    metrics: ['Real-time', 'Multi-user', 'Docker ready'],
    outcome: 'Implemented end-to-end application tracking workflow across student and recruiter dashboards.',
  },
  {
    id: '03', type: 'Full Stack', name: '3D glove', featured: false,
    desc: 'Developed a 3D glove system that tracks hand gestures using sensors and visualizes movements in a real-time interactive interface.',
    stack: ['Express', 'JWT', 'Redis', 'AWS SES'],
    demo: '#', github: 'https://github.com/meshramharsh19/3d-glove', accent: '#ff9090',
    tags: ['backend'],
    metrics: ['OAuth2', 'Rate limited', 'AWS SES'],
    outcome: 'Built live sensor visualization loop for gesture tracking in real-time interactive scenes.',
  },
  {
    id: '04', type: 'Full Stack', name: 'Portfolio', featured: false,
    desc: 'Built a responsive personal portfolio website using React.js to showcase projects, skills, and experience with a clean and modern UI.',
    stack: ['React Native', 'Firebase', 'Python', 'ML'],
    demo: '#', github: 'https://github.com/NikitaMandle/Personal-Portfolio', accent: '#ffd93d',
    tags: ['fullstack', 'mobile'],
    metrics: ['500+ users', 'ML powered', 'Firebase RT'],
    outcome: 'Shipped a responsive portfolio with smooth section navigation and backend contact automation.',
  },
  {
    id: '05', type: 'Full Stack', name: 'DigitalTwin Survey', featured: false,
    desc: 'Built a digital twin survey system to visualize and manage real-world asset data using geospatial mapping and structured datasets.',
    stack: ['React', 'Vite', 'Node.js', 'MongoDB'],
    demo: '#', github: 'https://github.com/meshramharsh19/DigiTwin-survey', accent: '#60d0ff',
    tags: ['frontend', 'fullstack'],
    metrics: ['MERN', 'Animated', 'Open source'],
    outcome: 'Mapped survey-driven asset records into a visual workflow to improve field data traceability.',
  },
  // {
  //   id: '06', type: 'CLI Tool', name: 'CLI Task Manager', featured: false,
  //   desc: 'Terminal task manager with MongoDB persistence, priority queues, reminders, and team workspaces.',
  //   stack: ['Node.js', 'MongoDB', 'Commander.js', 'Chalk'],
  //   demo: '#', github: '#', accent: '#ff6bcb',
  //   tags: ['backend'],
  //   metrics: ['MongoDB', 'Terminal UI', 'Team sync'],
  // },
];

const FILTERS = ['All' ]; //'Full Stack','Backend', 'Frontend'

function FeaturedCard({ p, vis }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="featured-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'grid', gridTemplateColumns: '1fr 380px',
        border: `1px solid ${hov ? p.accent + '60' : 'rgba(255,255,255,0.08)'}`,
        background: 'var(--bg3)', marginBottom: '20px',
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.6s ease, border-color 0.3s',
        overflow: 'hidden', position: 'relative',
      }}
    >
      {/* Left accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: '3px',
        background: p.accent, opacity: hov ? 1 : 0.5, transition: 'opacity 0.3s',
      }} />

      {/* Content */}
      <div className="featured-content" style={{ padding: '40px 44px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span style={{
            fontFamily: "'Space Mono',monospace", fontSize: '10px',
            color: p.accent, letterSpacing: '3px', textTransform: 'uppercase',
          }}>{p.type}</span>
          <span style={{
            background: p.accent, color: '#07070e',
            fontFamily: "'Space Mono',monospace", fontSize: '9px',
            fontWeight: 700, letterSpacing: '2px', padding: '3px 10px',
          }}>★ FEATURED</span>
        </div>

        <h3 style={{
          fontSize: '32px', fontWeight: 800, lineHeight: 1.1,
          marginBottom: '14px', color: 'var(--text)',
        }}>{p.name}</h3>

        <p style={{
          fontSize: '14px', color: 'var(--text2)', lineHeight: 1.8,
          marginBottom: '24px', maxWidth: '480px',
        }}>{p.long || p.desc}</p>

        <p style={{
          fontFamily: "'Space Mono',monospace",
          fontSize: '11px',
          color: p.accent,
          lineHeight: 1.6,
          marginBottom: '20px',
        }}>
          Outcome: {p.outcome}
        </p>

        {/* Metrics */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '28px', flexWrap: 'wrap' }}>
          {p.metrics.map(m => (
            <div key={m} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: p.accent, display: 'block' }} />
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '11px', color: 'var(--text2)' }}>{m}</span>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '28px' }}>
          {p.stack.map(s => (
            <span key={s} style={{
              background: `${p.accent}10`, border: `1px solid ${p.accent}30`,
              color: p.accent, padding: '4px 12px',
              fontFamily: "'Space Mono',monospace", fontSize: '11px',
            }}>{s}</span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {[ ['GitHub', p.github]].map(([label, href]) => (
            <a key={label} href={href}
              style={{
                fontFamily: "'Space Mono',monospace", fontSize: '11px',
                color: 'var(--muted)', textDecoration: 'none',
                letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px',
                transition: 'color 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = p.accent}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
              onClick={() => trackEvent('project_link_click', { projectId: p.id, projectName: p.name, target: label.toLowerCase() })}
            >
              {label} ↗
            </a>
          ))}
        </div>
      </div>

      {/* Right: preview mockup */}
      <div className="featured-preview" style={{
        background: 'var(--bg4)',
        borderLeft: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        minHeight: '320px',
      }}>
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(${p.accent}08 1px,transparent 1px),linear-gradient(90deg,${p.accent}08 1px,transparent 1px)`,
          backgroundSize: '24px 24px',
        }} />
        {/* Big project number */}
        <div className="featured-number" style={{
          fontSize: '120px', fontWeight: 800, lineHeight: 1,
          color: `${p.accent}12`, letterSpacing: '-8px',
          position: 'relative', zIndex: 1,
          fontFamily: "'Syne',sans-serif",
        }}>{p.id}</div>
        {/* Corner brackets */}
        <div style={{ position: 'absolute', top: 20, left: 20, width: 24, height: 24, borderTop: `2px solid ${p.accent}60`, borderLeft: `2px solid ${p.accent}60` }} />
        <div style={{ position: 'absolute', bottom: 20, right: 20, width: 24, height: 24, borderBottom: `2px solid ${p.accent}60`, borderRight: `2px solid ${p.accent}60` }} />
      </div>
    </div>
  );
}

function SmallCard({ p, vis, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? 'var(--bg4)' : 'var(--bg3)',
        border: `1px solid ${hov ? p.accent + '50' : 'rgba(255,255,255,0.07)'}`,
        padding: '28px', position: 'relative', overflow: 'hidden',
        transition: 'all 0.35s ease',
        transform: vis ? (hov ? 'translateY(-3px)' : 'translateY(0)') : 'translateY(30px)',
        opacity: vis ? 1 : 0, transitionDelay: `${delay}s`,
        boxShadow: hov ? `0 14px 34px rgba(0,0,0,0.34)` : 'none',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg,${p.accent},transparent)`,
        opacity: hov ? 1 : 0.3, transition: 'opacity 0.3s',
      }} />
      <div style={{
        position: 'absolute', bottom: '16px', right: '20px',
        fontFamily: "'Syne',sans-serif",
        fontSize: '52px', fontWeight: 800,
        color: `${p.accent}${hov ? '25' : '10'}`,
        lineHeight: 1, userSelect: 'none', transition: 'color 0.3s',
      }}>{p.id}</div>

      <div style={{
        fontFamily: "'Space Mono',monospace", fontSize: '10px',
        color: p.accent, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '10px',
      }}>{p.type}</div>
      <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '10px', lineHeight: 1.2 }}>{p.name}</h3>
      <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '18px' }}>{p.desc}</p>
      <p style={{
        fontFamily: "'Space Mono',monospace",
        fontSize: '10px',
        color: p.accent,
        lineHeight: 1.6,
        marginBottom: '14px',
      }}>
        Outcome: {p.outcome}
      </p>

      {/* Metrics */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {p.metrics.map(m => (
          <span key={m} style={{
            fontFamily: "'Space Mono',monospace", fontSize: '9px',
            color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px',
          }}>
            <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: p.accent, display: 'block' }} />
            {m}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
        {p.stack.map(s => (
          <span key={s} style={{
            background: 'var(--bg)', border: '1px solid rgba(255,255,255,0.07)',
            padding: '3px 9px', fontFamily: "'Space Mono',monospace",
            fontSize: '10px', color: 'var(--muted)',
          }}>{s}</span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        {[['Demo', p.demo], ['GitHub', p.github]].map(([label, href]) => (
          <a key={label} href={href}
            style={{
              fontFamily: "'Space Mono',monospace", fontSize: '11px',
              color: 'var(--muted)', textDecoration: 'none',
              transition: 'color 0.3s', display: 'flex', alignItems: 'center', gap: '4px',
            }}
            onMouseEnter={e => e.currentTarget.style.color = p.accent}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            onClick={() => trackEvent('project_link_click', { projectId: p.id, projectName: p.name, target: label.toLowerCase() })}
          >
            {label} ↗
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Projects({ addToast }) {
  const [filter, setFilter] = useState('All');
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const filterFn = (p) => {
    if (filter === 'All') return true;
    if (filter === 'Full Stack') return p.tags.includes('fullstack');
    if (filter === 'Backend') return p.tags.includes('backend');
    if (filter === 'Frontend') return p.tags.includes('frontend');
    return true;
  };

  const featured = PROJECTS.find(p => p.featured && filterFn(p));
  const rest = PROJECTS.filter(p => !p.featured && filterFn(p));

  return (
    <section id="projects" style={{ background: 'var(--bg2)', position: 'relative', zIndex: 1 }}>
      <div className="sw" ref={ref}>
        <div className="sh">
          {/* <span className="sn">02 /</span> */}
          <h2 className="st">Projects</h2>
          <div className="sl" />
        </div>

        {/* Filter bar */}
        <div className="projects-filter-bar" style={{
          display: 'flex', gap: '0', marginBottom: '36px',
          border: '1px solid rgba(255,255,255,0.07)',
          width: 'fit-content',
        }}>
          {FILTERS.map((f, i) => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                fontFamily: "'Space Mono',monospace", fontSize: '11px',
                letterSpacing: '2px', textTransform: 'uppercase',
                padding: '10px 22px', border: 'none', cursor: 'pointer',
                borderRight: i < FILTERS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                background: filter === f ? 'var(--accent)' : 'transparent',
                color: filter === f ? '#07070e' : 'var(--muted)',
                fontWeight: filter === f ? 700 : 400,
                transition: 'all 0.2s',
              }}
            >{f}</button>
          ))}
        </div>

        {/* Featured */}
        {featured && <FeaturedCard p={featured} vis={vis} />}

        {/* Grid */}
        <div className="projects-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
        }}>
          {rest.map((p, i) => (
            <SmallCard key={p.id} p={p} vis={vis} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

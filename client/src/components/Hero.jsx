import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-scroll';

const PHRASES = ['fast web apps.','clean REST APIs.','full-stack solutions.','things that scale.','the future.'];

const CODE_LINES = [
  { indent: 0, color: '#7c6fff', text: 'const developer = {' },
  { indent: 1, color: '#00e5a0', text: "  name: 'Nikita Mandle'," },
  { indent: 1, color: '#00e5a0', text: "  role: 'Full Stack Dev'," },
  { indent: 1, color: '#a0a0c0', text: '  stack: [' },
  { indent: 2, color: '#ff9090', text: "    'React', 'Node.js'," },
  { indent: 2, color: '#ff9090', text: "    'MongoDB', 'Express'" },
  { indent: 1, color: '#a0a0c0', text: '  ],' },
  { indent: 1, color: '#ffcc80', text: "  available: true" },
  { indent: 0, color: '#7c6fff', text: '};' },
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
  const [visibleLines, setVisibleLines] = useState(0);

  // Typing effect
  useEffect(() => {
    const word = PHRASES[pi];
    let t;
    if (!del) {
      if (ci < word.length) t = setTimeout(() => { setTyped(word.slice(0, ci+1)); setCi(c=>c+1); }, 75);
      else t = setTimeout(() => setDel(true), 2000);
    } else {
      if (ci > 0) t = setTimeout(() => { setCi(c=>c-1); setTyped(word.slice(0,ci-1)); }, 38);
      else { setDel(false); setPi(p=>(p+1)%PHRASES.length); }
    }
    return () => clearTimeout(t);
  }, [ci, del, pi]);

  // Animate code lines
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++; setVisibleLines(i);
      if (i >= CODE_LINES.length) clearInterval(t);
    }, 200);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <section id="hero" style={{ minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', padding:'120px 72px 60px', position:'relative', zIndex:1, overflow:'hidden' }}>
        {/* Ambient blobs */}
        <div style={{ position:'absolute', top:'-10%', right:'-5%', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle, rgba(124,111,255,0.06) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'0', left:'-5%', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle, rgba(0,229,160,0.05) 0%, transparent 70%)', pointerEvents:'none' }} />

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', alignItems:'center', maxWidth:'1200px' }}>
          {/* Left */}
          <div>
            <div className="fu" style={{ animationDelay:'0.1s', display:'flex', alignItems:'center', gap:'10px', marginBottom:'28px' }}>
              <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--accent)', animation:'glow 2s ease infinite' }} />
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'11px', color:'var(--accent)', letterSpacing:'4px', textTransform:'uppercase' }}>
                Available for opportunities
              </span>
            </div>

            <h1 className="fu" style={{ animationDelay:'0.25s', fontSize:'clamp(52px,8vw,96px)', fontWeight:800, lineHeight:0.92, letterSpacing:'-3px', marginBottom:'20px' }}>
              NIKITA<br />
              <span style={{ WebkitTextStroke:'1px var(--accent)', color:'transparent' }}>MANDLE</span>
            </h1>

            <p className="fu" style={{ animationDelay:'0.4s', fontFamily:"'Space Mono',monospace", fontSize:'15px', color:'var(--text2)', marginBottom:'20px', minHeight:'24px' }}>
              I build <span style={{ color:'var(--accent2)' }}>{typed}</span>
              <span style={{ display:'inline-block', width:'2px', height:'15px', background:'var(--accent)', marginLeft:'2px', animation:'blink 1s infinite', verticalAlign:'middle' }} />
            </p>

            <p className="fu" style={{ animationDelay:'0.5s', maxWidth:'460px', fontSize:'15px', lineHeight:1.85, color:'var(--muted)', marginBottom:'44px' }}>
              Final year CS student crafting seamless digital experiences — from MongoDB schemas to React UIs. Currently interning as a Full Stack Developer in Nagpur.
            </p>

            <div className="fu" style={{ animationDelay:'0.6s', display:'flex', gap:'14px', flexWrap:'wrap' }}>
              <Link to="projects" smooth duration={700} offset={-80}>
                <button className="btn btn-p">View Projects <span>→</span></button>
              </Link>
              <Link to="contact" smooth duration={700} offset={-80}>
                <button className="btn btn-g">Get In Touch</button>
              </Link>
            </div>

            {/* Stats */}
            <div className="fu" style={{ animationDelay:'0.75s', display:'flex', gap:'40px', marginTop:'56px', paddingTop:'40px', borderTop:'1px solid var(--border2)', flexWrap:'wrap' }}>
              {STATS.map(s => (
                <div key={s.label}>
                  <div style={{ fontSize:'30px', fontWeight:800, color:'var(--accent)', lineHeight:1 }}>{s.num}</div>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'var(--muted)', letterSpacing:'2px', textTransform:'uppercase', marginTop:'4px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Code panel */}
          <div className="fu" style={{ animationDelay:'0.5s', animation:'float 5s ease-in-out infinite', display:'block' }}>
            <div style={{
              background:'var(--bg3)', border:'1px solid var(--border2)',
              borderTop:'2px solid var(--accent2)', overflow:'hidden',
              boxShadow:'0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
            }}>
              {/* Window chrome */}
              <div style={{ padding:'12px 18px', borderBottom:'1px solid var(--border2)', display:'flex', alignItems:'center', gap:'8px', background:'var(--bg4)' }}>
                {['#ff6b6b','#ffd93d','#6bcb77'].map((c,i) => (
                  <div key={i} style={{ width:'10px', height:'10px', borderRadius:'50%', background:c, opacity:0.8 }} />
                ))}
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'11px', color:'var(--muted)', marginLeft:'8px' }}>portfolio.js</span>
              </div>
              {/* Code */}
              <div style={{ padding:'28px 24px', fontFamily:"'Space Mono',monospace", fontSize:'13px', lineHeight:2 }}>
                {CODE_LINES.map((line, i) => (
                  <div key={i} style={{
                    color: line.color, opacity: i < visibleLines ? 1 : 0,
                    transform: i < visibleLines ? 'translateX(0)' : 'translateX(-8px)',
                    transition:'opacity 0.3s, transform 0.3s',
                    display:'flex', alignItems:'center', gap:'0',
                  }}>
                    <span style={{ color:'var(--muted)', marginRight:'20px', fontSize:'10px', userSelect:'none', minWidth:'16px' }}>{i+1}</span>
                    {line.text}
                    {i === visibleLines - 1 && <span style={{ display:'inline-block', width:'8px', height:'15px', background:line.color, marginLeft:'2px', animation:'blink 0.8s infinite', verticalAlign:'middle', opacity:0.8 }} />}
                  </div>
                ))}
              </div>
            </div>
            {/* Decorative element */}
            <div style={{ display:'flex', justifyContent:'flex-end', marginTop:'16px' }}>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'var(--muted)', letterSpacing:'2px', display:'flex', alignItems:'center', gap:'8px' }}>
                <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--accent)', animation:'glow 2s ease infinite' }} />
                NODE.JS RUNNING ON :5000
              </div>
            </div>
          </div>
        </div>

        <div style={{ position:'absolute', bottom:'36px', left:'72px', fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'var(--muted)', letterSpacing:'3px', display:'flex', alignItems:'center', gap:'12px', textTransform:'uppercase' }}>
          Scroll to explore
          <div style={{ width:'60px', height:'1px', background:'var(--muted)', overflow:'hidden' }}>
            <div style={{ height:'1px', background:'var(--accent)', animation:'scan 2s linear infinite', width:'30px' }} />
          </div>
        </div>
      </section>
    </>
  );
}

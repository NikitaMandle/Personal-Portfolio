import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Toast from './components/Toast';

export default function App() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const mx = useRef(0), my = useRef(0);
  const rx = useRef(0), ry = useRef(0);
  const [scrollPct, setScrollPct] = useState(0);
  const [toasts, setToasts] = useState([]);

  const addToast = (msg, type = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000);
  };

  useEffect(() => {
    const onMove = (e) => {
      mx.current = e.clientX; my.current = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };
    const onScroll = () => {
      const el = document.documentElement;
      setScrollPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    document.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll);

    let raf;
    const loop = () => {
      rx.current += (mx.current - rx.current) * 0.1;
      ry.current += (my.current - ry.current) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = rx.current + 'px';
        ringRef.current.style.top = ry.current + 'px';
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Hover effect on interactive elements
    const els = document.querySelectorAll('a,button,.hov-target');
    const onEnter = () => { cursorRef.current?.classList.add('hov'); ringRef.current?.classList.add('hov'); };
    const onLeave = () => { cursorRef.current?.classList.remove('hov'); ringRef.current?.classList.remove('hov'); };
    els.forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave); });

    return () => {
      document.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />
      <div className="scroll-bar" style={{ width: scrollPct + '%' }} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects addToast={addToast} />
        <Experience />
        <Contact addToast={addToast} />
      </main>
      <footer style={{
        padding: '28px 72px', borderTop: '1px solid var(--border2)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '12px', position: 'relative', zIndex: 1,
      }}>
        {['© 2025 — Nikita Mandle', 'Full Stack Developer · Nagpur, IN', 'Built on MERN ⚡'].map(t => (
          <span key={t} style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'var(--muted)', letterSpacing:'2px', textTransform:'uppercase' }}>{t}</span>
        ))}
      </footer>
      <Toast toasts={toasts} />
    </>
  );
}

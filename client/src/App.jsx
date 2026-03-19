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
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);
  const [scrollPct, setScrollPct] = useState(0);
  const [toasts, setToasts] = useState([]);

  const addToast = (msg, type = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000);
  };

  useEffect(() => {
    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };

    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollPct(pct || 0);
    };

    // Smooth ring follow
    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.1;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px';
        ringRef.current.style.top = ringPos.current.y + 'px';
      }
      rafRef.current = requestAnimationFrame(animateRing);
    };

    document.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll);
    rafRef.current = requestAnimationFrame(animateRing);

    // Cursor grow on hover
    const addHov = () => {
      cursorRef.current?.classList.add('hov');
      ringRef.current?.classList.add('hov');
    };
    const remHov = () => {
      cursorRef.current?.classList.remove('hov');
      ringRef.current?.classList.remove('hov');
    };

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a,button,[data-hover]')) addHov();
      else remHov();
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
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
        {['© 2025 — Nikita Mandle', 'Full Stack Developer · Nagpur, IN', 'MERN Stack ⚡'].map(t => (
          <span key={t} style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'var(--muted)', letterSpacing:'2px', textTransform:'uppercase' }}>{t}</span>
        ))}
      </footer>

      <Toast toasts={toasts} />
    </>
  );
}

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
  const [scrollPct, setScrollPct] = useState(0);
  const [toasts, setToasts] = useState([]);

  const addToast = (msg, type = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000);
  };

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollPct(pct || 0);
    };
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
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

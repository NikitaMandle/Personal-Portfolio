import { lazy, Suspense, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';
import SectionSkeleton from './components/SectionSkeleton';

const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));

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
    <ErrorBoundary>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="scroll-bar" style={{ width: scrollPct + '%' }} />

      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<SectionSkeleton label="Loading hero" />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<SectionSkeleton label="Loading about" />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton label="Loading skills" />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionSkeleton label="Loading projects" />}>
          <Projects addToast={addToast} />
        </Suspense>
        <Suspense fallback={<SectionSkeleton label="Loading experience" />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionSkeleton label="Loading contact" />}>
          <Contact addToast={addToast} />
        </Suspense>
      </main>

      <footer className="site-footer" style={{
        padding: '28px 72px', borderTop: '1px solid var(--border2)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '12px', position: 'relative', zIndex: 1,
      }}>
        {['© 2025 — Nikita Mandle', 'Full Stack Developer · Nagpur, IN', 'MERN Stack ⚡'].map(t => (
          <span key={t} style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'var(--muted)', letterSpacing:'2px', textTransform:'uppercase' }}>{t}</span>
        ))}
      </footer>

      <Toast toasts={toasts} />
    </ErrorBoundary>
  );
}

export default function SectionSkeleton({ label = 'Loading section...' }) {
  return (
    <section style={{ padding: '80px 24px', position: 'relative', zIndex: 1 }} aria-busy="true" aria-live="polite">
      <div style={{
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'var(--bg3)',
        padding: '20px',
      }}>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '11px',
          letterSpacing: '2px',
          color: 'var(--muted)',
          textTransform: 'uppercase',
        }}>
          {label}
        </span>
      </div>
    </section>
  );
}
